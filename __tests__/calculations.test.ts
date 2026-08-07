import { getPersonalAllowance, calculateIncomeTax, calculateNationalInsurance, calculateStudentLoan, calculateSalary } from '../src/calculations/salary';
import { calculateHoliday } from '../src/calculations/holiday';
import { calculateContractorComparison } from '../src/calculations/contractor';

describe('UK Tax and Allowance Calculations', () => {
  describe('getPersonalAllowance', () => {
    test('returns default personal allowance (£12,570) for empty/undefined tax codes', () => {
      expect(getPersonalAllowance()).toBe(12570);
      expect(getPersonalAllowance('')).toBe(12570);
    });

    test('parses standard L tax codes correctly', () => {
      expect(getPersonalAllowance('1257L')).toBe(12570);
      expect(getPersonalAllowance('1300L')).toBe(13000);
      expect(getPersonalAllowance('S1257L')).toBe(12570);
    });

    test('parses other letter codes like T, M, N correctly', () => {
      expect(getPersonalAllowance('1257T')).toBe(12570);
      expect(getPersonalAllowance('1257M')).toBe(12570);
      expect(getPersonalAllowance('1257N')).toBe(12570);
    });

    test('returns zero allowance for special codes like BR, D0, D1, NT, OT', () => {
      expect(getPersonalAllowance('BR')).toBe(0);
      expect(getPersonalAllowance('D0')).toBe(0);
      expect(getPersonalAllowance('D1')).toBe(0);
      expect(getPersonalAllowance('NT')).toBe(0);
      expect(getPersonalAllowance('0T')).toBe(0);
    });
  });

  describe('calculateIncomeTax - Rest of UK', () => {
    test('calculates zero tax for zero taxable income', () => {
      expect(calculateIncomeTax(0, 'UK')).toBe(0);
      expect(calculateIncomeTax(-100, 'UK')).toBe(0);
    });

    test('calculates basic rate (20%) tax up to basic rate limit (£37,700)', () => {
      expect(calculateIncomeTax(10000, 'UK')).toBe(2000);
      expect(calculateIncomeTax(37700, 'UK')).toBe(7540);
    });

    test('calculates higher rate (40%) tax above basic limit', () => {
      // £37,700 @ 20% + £10,000 @ 40% = 7540 + 4000 = 11540
      expect(calculateIncomeTax(47700, 'UK')).toBe(11540);
    });

    test('calculates additional rate (45%) tax above £125,140 limit', () => {
      // Basic rate band: £37,700 @ 20% = £7,540
      // Higher rate band: (£125,140 - £37,700) = £87,440 @ 40% = £34,976
      // Additional rate portion: £10,000 @ 45% = £4,500
      // Total = 7540 + 34976 + 4500 = 47016
      expect(calculateIncomeTax(135140, 'UK')).toBe(47016);
    });
  });

  describe('calculateIncomeTax - Scotland', () => {
    test('calculates correct progressive tax for Scotland bands', () => {
      // Starter Rate: up to £2,306 @ 19%
      expect(calculateIncomeTax(2000, 'Scotland')).toBeCloseTo(380);

      // Basic Rate: next £11,685 (£2,306 to £13,991) @ 20%
      // 2306 * 0.19 = 438.14
      // 5000 * 0.20 = 1000.00
      // Total for 7306 = 1438.14
      expect(calculateIncomeTax(7306, 'Scotland')).toBeCloseTo(1438.14);
    });
  });

  describe('calculateNationalInsurance', () => {
    test('calculates zero NI for earnings below primary threshold (£12,570)', () => {
      expect(calculateNationalInsurance(10000)).toBe(0);
      expect(calculateNationalInsurance(12570)).toBe(0);
    });

    test('calculates 8% NI between primary threshold and upper limit (£50,270)', () => {
      // (£22,570 - £12,570) = £10,000 @ 8% = £800
      expect(calculateNationalInsurance(22570)).toBe(800);
    });

    test('calculates 2% NI above upper earnings limit (£50,270)', () => {
      // Main band: (£50,270 - £12,570) = £37,700 @ 8% = £3,016
      // Upper band: £10,000 @ 2% = £200
      // Total = £3,216
      expect(calculateNationalInsurance(60270)).toBe(3216);
    });
  });

  describe('calculateStudentLoan', () => {
    test('calculates Plan 1 (9% above £24,990)', () => {
      expect(calculateStudentLoan(20000, 'plan1')).toBe(0);
      expect(calculateStudentLoan(34990, 'plan1')).toBe(900); // 10000 * 0.09
    });

    test('calculates Plan 2 (9% above £27,295)', () => {
      expect(calculateStudentLoan(25000, 'plan2')).toBe(0);
      expect(calculateStudentLoan(37295, 'plan2')).toBe(900); // 10000 * 0.09
    });

    test('calculates Postgraduate (6% above £21,000)', () => {
      expect(calculateStudentLoan(20000, 'postgrad')).toBe(0);
      expect(calculateStudentLoan(31000, 'postgrad')).toBe(600); // 10000 * 0.06
    });
  });

  describe('calculateSalary (Full Runner)', () => {
    test('calculates standard UK salary take-home correctly', () => {
      const result = calculateSalary({
        grossSalary: 50000,
        payFrequency: 'yearly',
        taxRegion: 'UK',
        taxCode: '1257L',
        studentLoan: 'none',
        pensionRate: 5,
        isPensionSalarySacrifice: false,
      });

      // Gross: 50000
      // Pension (5% pre-tax): 2500. Taxable gross = 47500.
      // Allowance: 12570. Taxable income: 34930.
      // Income tax: 34930 * 20% = 6986.
      // NI (Class 1 on 50000): (50000 - 12570) * 8% = 2994.4
      // Total Net: 50000 - 2500 (pension) - 6986 (tax) - 2994.4 (NI) = 37519.6
      expect(result.yearly.gross).toBe(50000);
      expect(result.yearly.pensionContribution).toBe(2500);
      expect(result.yearly.incomeTax).toBe(6986);
      expect(result.yearly.nationalInsurance).toBe(2994.4);
      expect(result.yearly.takeHome).toBe(37519.6);
    });

    test('applies personal allowance taper correctly for income above £100,000', () => {
      const result = calculateSalary({
        grossSalary: 120000,
        payFrequency: 'yearly',
        taxRegion: 'UK',
        taxCode: '1257L',
        studentLoan: 'none',
        pensionRate: 0,
      });

      // Excess over £100k = 20000. Reduction = 10000.
      // Allowance = 12570 - 10000 = 2570.
      expect(result.yearly.personalAllowance).toBe(2570);
    });
  });
});

describe('Holiday and Contractor Calculations', () => {
  test('calculateHoliday calculates statutory weeks, days, hours, and values', () => {
    const result = calculateHoliday({
      hourlyRate: 15,
      hoursPerWeek: 37.5,
      daysPerWeek: 5,
    });

    expect(result.statutoryWeeks).toBe(5.6);
    expect(result.statutoryDays).toBe(28); // 5 * 5.6
    expect(result.holidayHoursAccrued).toBe(210); // 37.5 * 5.6
    expect(result.totalHolidayValue).toBe(3150); // 210 * 15
  });

  test('calculateContractorComparison calculates correct income diffs', () => {
    const result = calculateContractorComparison({
      dayRate: 500,
      workingDaysPerYear: 220,
      permGrossSalary: 70000,
      taxRegion: 'UK',
      taxCode: '1257L',
      studentLoan: 'none',
      pensionRate: 5,
    });

    // Contractor gross: 500 * 220 = 110,000
    expect(result.contractorGross).toBe(110000);
    expect(result.contractorNet).toBeGreaterThan(result.permNet);
    expect(result.difference).toBeCloseTo(result.contractorNet - result.permNet, 2);
  });
});
