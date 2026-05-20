import type { DiagnosticAnswers } from "@/lib/diagnostic";

export function parseDiagnosticAnswers(input: unknown): DiagnosticAnswers | null {
  if (!isRecord(input)) return null;

  const {
    isCrossBorderWorker,
    monthlyIncome,
    incomeCurrency,
    monthlyFxVolumeChf,
    healthInsurance,
    monthlyElectricityCost,
    monthlyGasCost,
    mobilePlanCost,
    monthlyAutoInsuranceCost,
    monthlyMotoInsuranceCost,
    monthlyBikeInsuranceCost,
    monthlyScooterInsuranceCost,
    monthlyPetInsuranceCost,
    monthlyHomeInsuranceCost,
    monthlyMutuelleCost,
    monthlySubscriptionsCost,
    goal,
  } = input;

  if (
    typeof isCrossBorderWorker !== "boolean" ||
    !isFiniteNumber(monthlyIncome) ||
    !["EUR", "CHF", "BOTH"].includes(String(incomeCurrency)) ||
    !isFiniteNumber(monthlyFxVolumeChf) ||
    !["LAMAL", "CMU", "UNKNOWN", "NONE"].includes(String(healthInsurance)) ||
    !isFiniteNumber(monthlyElectricityCost) ||
    !isFiniteNumber(monthlyGasCost) ||
    !isFiniteNumber(mobilePlanCost) ||
    !isFiniteNumber(monthlyAutoInsuranceCost) ||
    !isFiniteNumber(monthlyMotoInsuranceCost) ||
    !isFiniteNumber(monthlyBikeInsuranceCost) ||
    !isFiniteNumber(monthlyScooterInsuranceCost) ||
    !isFiniteNumber(monthlyPetInsuranceCost) ||
    !isFiniteNumber(monthlyHomeInsuranceCost) ||
    !isFiniteNumber(monthlyMutuelleCost) ||
    !isFiniteNumber(monthlySubscriptionsCost) ||
    typeof goal !== "string"
  ) {
    return null;
  }

  return {
    isCrossBorderWorker,
    monthlyIncome,
    incomeCurrency: incomeCurrency as DiagnosticAnswers["incomeCurrency"],
    monthlyFxVolumeChf,
    healthInsurance: healthInsurance as DiagnosticAnswers["healthInsurance"],
    monthlyElectricityCost,
    monthlyGasCost,
    mobilePlanCost,
    monthlyAutoInsuranceCost,
    monthlyMotoInsuranceCost,
    monthlyBikeInsuranceCost,
    monthlyScooterInsuranceCost,
    monthlyPetInsuranceCost,
    monthlyHomeInsuranceCost,
    monthlyMutuelleCost,
    monthlySubscriptionsCost,
    goal,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}
