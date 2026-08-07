export type TaxRegion = 'UK' | 'Scotland';

export type PayFrequency = 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly';

export type StudentLoanPlan = 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad';

export interface SalaryInput {
  grossSalary: number;
  payFrequency: PayFrequency;
  hoursPerWeek?: number; // Needed if hourly/daily calculations are converted
  daysPerWeek?: number;  // Needed if hourly/daily calculations are converted
  taxRegion: TaxRegion;
  taxCode?: string;      // E.g., '1257L'
  studentLoan: StudentLoanPlan;
  pensionRate: number;   // E.g., 5 for 5%
  isPensionSalarySacrifice?: boolean; // Whether pension is pre-tax/pre-NI
}

export interface CalculationBreakdown {
  gross: number;
  taxableIncome: number;
  personalAllowance: number;
  incomeTax: number;
  nationalInsurance: number;
  studentLoanDeduction: number;
  pensionContribution: number;
  takeHome: number;
}

export interface SalaryResult {
  yearly: CalculationBreakdown;
  monthly: CalculationBreakdown;
  weekly: CalculationBreakdown;
  daily: CalculationBreakdown;
  hourly: CalculationBreakdown;
  inputs: {
    effectiveTaxCode: string;
    taxRegion: TaxRegion;
  };
}

export interface HolidayInput {
  hourlyRate: number;
  hoursPerWeek: number;
  daysPerWeek: number;
  weeksPerYearWorked?: number; // Defaults to 46.4 (52 - 5.6 statutory weeks)
}

export interface HolidayResult {
  statutoryWeeks: number;
  statutoryDays: number;
  holidayHoursAccrued: number;
  totalHolidayValue: number;
}

export interface ContractorInput {
  dayRate: number;
  workingDaysPerYear?: number; // Defaults to 220
  permGrossSalary: number;
  taxRegion: TaxRegion;
  taxCode?: string;
  studentLoan: StudentLoanPlan;
  pensionRate: number;
}

export interface ContractorResult {
  contractorGross: number;
  contractorNet: number;
  permNet: number;
  difference: number;
}
