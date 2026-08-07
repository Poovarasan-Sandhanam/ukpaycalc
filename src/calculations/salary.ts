import { SalaryInput, SalaryResult, CalculationBreakdown, TaxRegion, StudentLoanPlan } from './types';

// Helper to parse tax code
export function getPersonalAllowance(taxCode?: string): number {
  const defaultPA = 12570;
  if (!taxCode) return defaultPA;

  const normalized = taxCode.trim().toUpperCase();
  
  // Standard L code (e.g., 1257L, 12570L)
  const matchL = normalized.match(/^(\d+)L$/);
  if (matchL) {
    const value = parseInt(matchL[1], 10);
    return value * 10;
  }

  // Scotland standard code (e.g., S1257L)
  const matchSL = normalized.match(/^S(\d+)L$/);
  if (matchSL) {
    const value = parseInt(matchSL[1], 10);
    return value * 10;
  }

  // T codes, M codes, N codes (e.g., 1257T, 1257M, 1257N)
  const matchOther = normalized.match(/^(\d+)[TMN]$/);
  if (matchOther) {
    const value = parseInt(matchOther[1], 10);
    return value * 10;
  }

  // Special codes: BR (basic rate), D0 (higher rate), D1 (additional rate), NT (no tax), OT (no allowance)
  if (normalized === 'BR' || normalized === 'SBR') return 0;
  if (normalized === 'D0' || normalized === 'SD0') return 0;
  if (normalized === 'D1' || normalized === 'SD1') return 0;
  if (normalized === 'NT' || normalized === 'SNT') return 0; // NT means no tax is deducted but personal allowance is technically 0
  if (normalized === '0T' || normalized === 'S0T') return 0;

  return defaultPA;
}

// Helper to calculate Income Tax based on region and taxable income
export function calculateIncomeTax(taxableIncome: number, region: TaxRegion, taxCode?: string): number {
  if (taxableIncome <= 0) return 0;

  const normalizedTaxCode = taxCode?.trim().toUpperCase() || '';
  if (normalizedTaxCode === 'NT') return 0;
  if (normalizedTaxCode === 'BR' || normalizedTaxCode === 'SBR') {
    return taxableIncome * 0.20;
  }
  if (normalizedTaxCode === 'D0' || normalizedTaxCode === 'SD0') {
    return taxableIncome * 0.40;
  }
  if (normalizedTaxCode === 'D1' || normalizedTaxCode === 'SD1') {
    return taxableIncome * 0.45;
  }

  if (region === 'Scotland') {
    // 2024/2025 Scotland bands:
    // Band 1 (Starter): Up to £2,306 @ 19%
    // Band 2 (Basic): £2,307 to £13,991 @ 20%
    // Band 3 (Intermediate): £13,992 to £31,092 @ 21%
    // Band 4 (Higher): £31,093 to £62,430 @ 42%
    // Band 5 (Advanced): £62,431 to £112,570 @ 45%
    // Band 6 (Top): Above £112,570 @ 48%
    let tax = 0;
    let remaining = taxableIncome;

    // Starter
    const starterLimit = 2306;
    const starterRate = 0.19;
    const starterTaxable = Math.min(remaining, starterLimit);
    tax += starterTaxable * starterRate;
    remaining -= starterTaxable;

    // Basic
    if (remaining > 0) {
      const basicLimit = 13991 - starterLimit; // 11685
      const basicRate = 0.20;
      const basicTaxable = Math.min(remaining, basicLimit);
      tax += basicTaxable * basicRate;
      remaining -= basicTaxable;
    }

    // Intermediate
    if (remaining > 0) {
      const interLimit = 31092 - 13991; // 17101
      const interRate = 0.21;
      const interTaxable = Math.min(remaining, interLimit);
      tax += interTaxable * interRate;
      remaining -= interTaxable;
    }

    // Higher
    if (remaining > 0) {
      const higherLimit = 62430 - 31092; // 31338
      const higherRate = 0.42;
      const higherTaxable = Math.min(remaining, higherLimit);
      tax += higherTaxable * higherRate;
      remaining -= higherTaxable;
    }

    // Advanced
    if (remaining > 0) {
      const advancedLimit = 112570 - 62430; // 50140
      const advancedRate = 0.45;
      const advancedTaxable = Math.min(remaining, advancedLimit);
      tax += advancedTaxable * advancedRate;
      remaining -= advancedTaxable;
    }

    // Top
    if (remaining > 0) {
      const topRate = 0.48;
      tax += remaining * topRate;
    }

    return tax;
  } else {
    // Rest of UK (England, Wales, NI) bands:
    // Basic Rate: Up to £37,700 @ 20%
    // Higher Rate: £37,701 to £125,140 @ 40%
    // Additional Rate: Above £125,140 @ 45%
    let tax = 0;
    let remaining = taxableIncome;

    // Basic
    const basicLimit = 37700;
    const basicRate = 0.20;
    const basicTaxable = Math.min(remaining, basicLimit);
    tax += basicTaxable * basicRate;
    remaining -= basicTaxable;

    // Higher
    if (remaining > 0) {
      const higherLimit = 125140 - basicLimit; // 87440
      const higherRate = 0.40;
      const higherTaxable = Math.min(remaining, higherLimit);
      tax += higherTaxable * higherRate;
      remaining -= higherTaxable;
    }

    // Additional
    if (remaining > 0) {
      const additionalRate = 0.45;
      tax += remaining * additionalRate;
    }

    return tax;
  }
}

// Helper to calculate Employee National Insurance (Class 1)
export function calculateNationalInsurance(grossForNI: number): number {
  if (grossForNI <= 0) return 0;

  // 2024/2025 and 2025/2026 limits:
  // Primary Threshold: £12,570 / year
  // Upper Earnings Limit: £50,270 / year
  // Rates: 8% between PT and UEL, 2% above UEL.
  const pt = 12570;
  const uel = 50270;

  if (grossForNI <= pt) return 0;

  let ni = 0;
  const mainBandEarnings = Math.min(grossForNI, uel) - pt;
  ni += mainBandEarnings * 0.08;

  if (grossForNI > uel) {
    const upperBandEarnings = grossForNI - uel;
    ni += upperBandEarnings * 0.02;
  }

  return ni;
}

// Helper to calculate Student Loan repayment
export function calculateStudentLoan(grossForSL: number, plan: StudentLoanPlan): number {
  if (grossForSL <= 0 || plan === 'none') return 0;

  // 2024/2025 / 2025/2026 Annual Thresholds:
  // Plan 1: £24,990 (9%)
  // Plan 2: £27,295 (9%)
  // Plan 4 (Scotland): £31,395 (9%)
  // Plan 5: £25,000 (9%)
  // Postgrad: £21,000 (6%)
  let threshold = 0;
  let rate = 0.09;

  switch (plan) {
    case 'plan1':
      threshold = 24990;
      break;
    case 'plan2':
      threshold = 27295;
      break;
    case 'plan4':
      threshold = 31395;
      break;
    case 'plan5':
      threshold = 25000;
      break;
    case 'postgrad':
      threshold = 21000;
      rate = 0.06;
      break;
    default:
      return 0;
  }

  if (grossForSL <= threshold) return 0;
  return (grossForSL - threshold) * rate;
}

// Main calculation runner
export function calculateSalary(input: SalaryInput): SalaryResult {
  const {
    grossSalary,
    payFrequency,
    hoursPerWeek = 37.5,
    daysPerWeek = 5,
    taxRegion,
    taxCode = '1257L',
    studentLoan,
    pensionRate,
    isPensionSalarySacrifice = false,
  } = input;

  // Step 1: Convert input gross to annual equivalent
  let annualGross = 0;
  switch (payFrequency) {
    case 'yearly':
      annualGross = grossSalary;
      break;
    case 'monthly':
      annualGross = grossSalary * 12;
      break;
    case 'weekly':
      annualGross = grossSalary * 52;
      break;
    case 'daily':
      annualGross = grossSalary * daysPerWeek * 52;
      break;
    case 'hourly':
      annualGross = grossSalary * hoursPerWeek * 52;
      break;
  }

  // Step 2: Pension Deduction
  // For standard pension calculations, we assume the pension percentage applies to the gross salary.
  const pensionRateDecimal = pensionRate / 100;
  const annualPension = annualGross * pensionRateDecimal;

  // Step 3: Adjusted incomes for Tax, NI, and Student Loans depending on pension type
  const annualGrossForTax = isPensionSalarySacrifice 
    ? Math.max(0, annualGross - annualPension) 
    : Math.max(0, annualGross - annualPension); // Both Net Pay and SalSac reduce taxable income. 

  const annualGrossForNI = isPensionSalarySacrifice
    ? Math.max(0, annualGross - annualPension)
    : annualGross;

  const annualGrossForSL = isPensionSalarySacrifice
    ? Math.max(0, annualGross - annualPension)
    : annualGross;

  // Step 4: Tapered Personal Allowance
  // Personal Allowance tapers by £1 for every £2 of income over £100,000.
  // Note: Adjusted Net Income is used. Net Pay / SalSac pensions reduce this.
  const standardPA = getPersonalAllowance(taxCode);
  let taperedPA = standardPA;
  if (annualGrossForTax > 100000) {
    const overThreshold = annualGrossForTax - 100000;
    const reduction = Math.floor(overThreshold / 2);
    taperedPA = Math.max(0, standardPA - reduction);
  }

  // Step 5: Taxable Income
  const taxableIncome = Math.max(0, annualGrossForTax - taperedPA);

  // Step 6: Perform calculations
  const annualTax = calculateIncomeTax(taxableIncome, taxRegion, taxCode);
  const annualNI = calculateNationalInsurance(annualGrossForNI);
  const annualStudentLoan = calculateStudentLoan(annualGrossForSL, studentLoan);
  
  const annualTakeHome = annualGross - annualTax - annualNI - annualStudentLoan - annualPension;

  // Create Breakdown for a given scale (e.g. 1 for yearly, 12 for monthly, etc.)
  const createBreakdown = (divisor: number): CalculationBreakdown => {
    return {
      gross: Math.round((annualGross / divisor) * 100) / 100,
      taxableIncome: Math.round((taxableIncome / divisor) * 100) / 100,
      personalAllowance: Math.round((taperedPA / divisor) * 100) / 100,
      incomeTax: Math.round((annualTax / divisor) * 100) / 100,
      nationalInsurance: Math.round((annualNI / divisor) * 100) / 100,
      studentLoanDeduction: Math.round((annualStudentLoan / divisor) * 100) / 100,
      pensionContribution: Math.round((annualPension / divisor) * 100) / 100,
      takeHome: Math.round((annualTakeHome / divisor) * 100) / 100,
    };
  };

  // Convert to frequencies
  const yearly = createBreakdown(1);
  const monthly = createBreakdown(12);
  const weekly = createBreakdown(52);
  const daily = createBreakdown(daysPerWeek * 52);
  const hourly = createBreakdown(hoursPerWeek * 52);

  return {
    yearly,
    monthly,
    weekly,
    daily,
    hourly,
    inputs: {
      effectiveTaxCode: taxCode,
      taxRegion,
    },
  };
}
