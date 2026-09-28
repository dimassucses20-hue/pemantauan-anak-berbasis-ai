// WHO Growth Calculator & Assessment Utilities

/**
 * Calculate age in months and remaining days from birth date to target date
 */
export function calculateAgeInMonths(birthDateStr, targetDateStr = new Date().toISOString()) {
  const birth = new Date(birthDateStr);
  const target = new Date(targetDateStr);

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    // get days in previous month
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  return {
    totalMonths: Math.max(0, totalMonths),
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    formatted: `${years > 0 ? `${years} thn ` : ''}${months} bln ${days} hr`
  };
}

/**
 * Calculate WHO Z-Score approximation for Weight-for-Age (BB/U)
 */
export function calculateWeightForAgeZScore(gender, ageMonths, weightKg) {
  // Approximate standard parameters for demo/MVP based on WHO Child Growth Tables
  // Median weights for boys: ~3.3 at birth, 9.6 at 12mo, 12.2 at 24mo
  // Median weights for girls: ~3.2 at birth, 8.9 at 12mo, 11.5 at 24mo
  let median = 0;
  let sd = 0;

  if (gender === 'male') {
    median = 3.3 + ageMonths * 0.55 - Math.max(0, ageMonths - 12) * 0.18;
    sd = 0.5 + ageMonths * 0.05;
  } else {
    median = 3.2 + ageMonths * 0.50 - Math.max(0, ageMonths - 12) * 0.16;
    sd = 0.48 + ageMonths * 0.048;
  }

  const zScore = (weightKg - median) / sd;
  const roundedZ = Math.round(zScore * 100) / 100;

  let status = "Gizi Baik (Normal)";
  let statusColor = "emerald";
  let statusBadge = "Normal";

  if (roundedZ < -3) {
    status = "Gizi Buruk (Severely Underweight)";
    statusColor = "rose";
    statusBadge = "Kritis";
  } else if (roundedZ < -2) {
    status = "Gizi Kurang (Underweight)";
    statusColor = "amber";
    statusBadge = "Perlu Perhatian";
  } else if (roundedZ > 2) {
    status = "Risiko Gizi Lebih / Overweight";
    statusColor = "amber";
    statusBadge = "Pantau Porsi";
  }

  return {
    zScore: roundedZ,
    median: Math.round(median * 10) / 10,
    status,
    statusColor,
    statusBadge
  };
}

/**
 * Calculate WHO Z-Score approximation for Height/Length-for-Age (TB/U atau PB/U) -> Stunting Indicator
 */
export function calculateHeightForAgeZScore(gender, ageMonths, heightCm) {
  let median = 0;
  let sd = 0;

  if (gender === 'male') {
    median = 50.0 + ageMonths * 2.1 - Math.max(0, ageMonths - 12) * 0.8;
    sd = 1.9 + ageMonths * 0.1;
  } else {
    median = 49.1 + ageMonths * 2.05 - Math.max(0, ageMonths - 12) * 0.78;
    sd = 1.85 + ageMonths * 0.095;
  }

  const zScore = (heightCm - median) / sd;
  const roundedZ = Math.round(zScore * 100) / 100;

  let status = "Tinggi Normal";
  let statusColor = "emerald";
  let isStunted = false;
  let stuntingType = "Normal";

  if (roundedZ < -3) {
    status = "Sangat Pendek (Severely Stunted)";
    statusColor = "rose";
    isStunted = true;
    stuntingType = "Severely Stunted";
  } else if (roundedZ < -2) {
    status = "Pendek (Stunted / Terindikasi Stunting)";
    statusColor = "amber";
    isStunted = true;
    stuntingType = "Stunted";
  } else if (roundedZ > 3) {
    status = "Tinggi Badan Lebih (Tall)";
    statusColor = "sky";
    stuntingType = "Tinggi";
  }

  return {
    zScore: roundedZ,
    median: Math.round(median * 10) / 10,
    status,
    statusColor,
    isStunted,
    stuntingType
  };
}

/**
 * Calculate Body Mass Index (BMI) & Status
 */
export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  if (heightM <= 0) return { bmi: 0, status: "N/A" };
  const bmi = weightKg / (heightM * heightM);
  const roundedBmi = Math.round(bmi * 10) / 10;

  let status = "Gizi Seimbang";
  if (bmi < 13.5) status = "Gizi Kurang (Wasting)";
  else if (bmi > 18.5) status = "Gizi Berlebih";

  return {
    bmi: roundedBmi,
    status
  };
}
