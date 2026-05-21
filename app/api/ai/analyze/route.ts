import { analyzeUserExpenses } from "@/lib/ai/mistral";
import { analyzeDiagnostic } from "@/lib/services/diagnostics";
import { enforceSameOrigin, rateLimit, rejectLargeRequest, sanitizeText, secureJson } from "@/lib/security/request";
import { parseDiagnosticAnswers } from "@/lib/validators/diagnostic";

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 20_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "ai-analysis", limit: 20, windowMs: 60 * 1000 });
  if (limited) return limited;

  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  const anonymousId = "anonymousId" in body && typeof body.anonymousId === "string" ? sanitizeText(body.anonymousId, 120) : null;
  const answers = "answers" in body ? parseDiagnosticAnswers(body.answers) : null;

  if (!anonymousId || !isSafeAnonymousId(anonymousId) || !answers) {
    return secureJson({ error: "invalid_payload" }, { status: 400 });
  }

  const analysis = analyzeDiagnostic(answers);
  const ai = await analyzeUserExpenses(answers, analysis);

  return secureJson({
    ok: true,
    analysis,
    ai,
  });
}

function isSafeAnonymousId(value: string) {
  return /^[a-zA-Z0-9._:-]{8,120}$/.test(value);
}
