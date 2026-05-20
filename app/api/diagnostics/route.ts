import { analyzeDiagnostic } from "@/lib/services/diagnostics";
import { persistDiagnostic } from "@/lib/services/persistence";
import { parseDiagnosticAnswers } from "@/lib/validators/diagnostic";
import { enforceSameOrigin, rateLimit, rejectLargeRequest, sanitizeText, secureJson } from "@/lib/security/request";

export async function POST(request: Request) {
  const blockedOrigin = enforceSameOrigin(request);
  if (blockedOrigin) return blockedOrigin;

  const tooLarge = rejectLargeRequest(request, 20_000);
  if (tooLarge) return tooLarge;

  const limited = rateLimit(request, { key: "diagnostics", limit: 40, windowMs: 60 * 1000 });
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

  try {
    const persistence = await persistDiagnostic({
      anonymousId,
      answers,
      analysis,
    });

    return secureJson({
      ok: true,
      analysis,
      persistence,
    });
  } catch (error) {
    const details = error instanceof Error ? { message: error.message, name: error.name } : { message: String(error) };
    console.error("Failed to persist diagnostic", details);

    return secureJson(
      {
        ok: true,
        analysis,
        persistence: { persisted: false, reason: "persistence_failed" },
      },
      { status: 202 },
    );
  }
}

function isSafeAnonymousId(value: string) {
  return /^[a-zA-Z0-9._:-]{8,120}$/.test(value);
}
