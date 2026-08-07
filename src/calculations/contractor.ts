import { ContractorInput, ContractorResult } from './types';
import { calculateSalary } from './salary';

export function calculateContractorComparison(input: ContractorInput): ContractorResult {
  const {
    dayRate,
    workingDaysPerYear = 220,
    permGrossSalary,
    taxRegion,
    taxCode,
    studentLoan,
    pensionRate,
  } = input;

  // Contractor gross = day rate * working days
  const contractorGross = dayRate * workingDaysPerYear;

  // Run salary calculation for contractor (gross as annual salary)
  const contractorCalc = calculateSalary({
    grossSalary: contractorGross,
    payFrequency: 'yearly',
    taxRegion,
    taxCode,
    studentLoan,
    pensionRate,
  });

  // Run salary calculation for perm gross salary
  const permCalc = calculateSalary({
    grossSalary: permGrossSalary,
    payFrequency: 'yearly',
    taxRegion,
    taxCode,
    studentLoan,
    pensionRate,
  });

  const contractorNet = contractorCalc.yearly.takeHome;
  const permNet = permCalc.yearly.takeHome;
  const difference = Math.round((contractorNet - permNet) * 100) / 100;

  return {
    contractorGross,
    contractorNet,
    permNet,
    difference,
  };
}
