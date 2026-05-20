import { analyzeDiagnostic } from "@/lib/services/diagnostics";
import { persistDiagnostic } from "@/lib/services/persistence";
import { parseDiagnosticAnswers } from "@/lib/validators/diagnostic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const anonymousId =
    "anonymousId" in body && typeof body.anonymousId === "string" ? body.anonymousId : null;
  const answers = "answers" in body ? parseDiagnosticAnswers(body.answers) : null;

  if (!anonymousId || !answers) {
    return Response.json({ error: "invalid_payload" }, { status: 400 });
  }

  const analysis = analyzeDiagnostic(answers);

  try {
    const persistence = await persistDiagnostic({
      anonymousId,
      answers,
      analysis,
    });

    return Response.json({
      ok: true,
      analysis,
      persistence,
    });
  } catch (error) {
    const details =
      error instanceof Error
        ? { message: error.message, name: error.name }
        : typeof error === "object" && error !== null
          ? error
          : { message: String(error) };

    console.error("Failed to persist diagnostic", details);

    return Response.json(
      {
        ok: true,
        analysis,
        persistence: { persisted: false, reason: "persistence_failed" },
      },
      { status: 202 },
    );
  }
}
