const TAX_CODE_REGEX = /^(?:S)?(?:\d{1,5}[LTMN]|BR|D[0-2]|NT|0T)$/i;

export interface SalaryFormValues {
  grossSalary: string;
  payFrequency: 'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly';
  hoursPerWeek: string;
  daysPerWeek: string;
  taxRegion: 'UK' | 'Scotland';
  taxCode: string;
  studentLoan: 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad';
  pensionRate: string;
  isPensionSalarySacrifice: boolean;
}

export interface HolidayFormValues {
  hourlyRate: string;
  hoursPerWeek: string;
  daysPerWeek: string;
}

export interface ContractorFormValues {
  dayRate: string;
  workingDaysPerYear: string;
  permGrossSalary: string;
  taxRegion: 'UK' | 'Scotland';
  taxCode: string;
  studentLoan: 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad';
  pensionRate: string;
}

export interface SettingsFormValues {
  taxRegion: 'UK' | 'Scotland';
  taxCode: string;
  studentLoan: 'none' | 'plan1' | 'plan2' | 'plan4' | 'plan5' | 'postgrad';
  pensionRate: string;
  isPensionSalarySacrifice: boolean;
  hoursPerWeek: string;
  daysPerWeek: string;
}

export const salaryResolver = (values: SalaryFormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.grossSalary || values.grossSalary.trim() === '') {
    errors.grossSalary = { type: 'required', message: 'Gross income is required' };
  } else {
    const num = parseFloat(values.grossSalary);
    if (isNaN(num) || num <= 0) {
      errors.grossSalary = { type: 'validate', message: 'Gross income must be a number greater than 0' };
    }
  }

  if (values.hoursPerWeek !== undefined && values.hoursPerWeek !== '') {
    const num = parseFloat(values.hoursPerWeek);
    if (isNaN(num) || num < 0 || num > 168) {
      errors.hoursPerWeek = { type: 'validate', message: 'Hours per week must be between 0 and 168' };
    }
  }

  if (values.daysPerWeek !== undefined && values.daysPerWeek !== '') {
    const num = parseFloat(values.daysPerWeek);
    if (isNaN(num) || num < 0 || num > 7) {
      errors.daysPerWeek = { type: 'validate', message: 'Days per week must be between 0 and 7' };
    }
  }

  if (values.taxCode !== undefined && values.taxCode !== '' && !TAX_CODE_REGEX.test(values.taxCode)) {
    errors.taxCode = { type: 'validate', message: 'Invalid UK Tax Code (e.g., 1257L, BR, D0, NT)' };
  }

  if (values.pensionRate !== undefined && values.pensionRate !== '') {
    const num = parseFloat(values.pensionRate);
    if (isNaN(num) || num < 0 || num > 100) {
      errors.pensionRate = { type: 'validate', message: 'Pension rate must be between 0% and 100%' };
    }
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export const holidayResolver = (values: HolidayFormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.hourlyRate || values.hourlyRate.trim() === '') {
    errors.hourlyRate = { type: 'required', message: 'Hourly rate is required' };
  } else {
    const num = parseFloat(values.hourlyRate);
    if (isNaN(num) || num <= 0) {
      errors.hourlyRate = { type: 'validate', message: 'Hourly rate must be greater than 0' };
    }
  }

  if (!values.hoursPerWeek || values.hoursPerWeek.trim() === '') {
    errors.hoursPerWeek = { type: 'required', message: 'Hours per week is required' };
  } else {
    const num = parseFloat(values.hoursPerWeek);
    if (isNaN(num) || num < 0 || num > 168) {
      errors.hoursPerWeek = { type: 'validate', message: 'Hours per week must be between 0 and 168' };
    }
  }

  if (!values.daysPerWeek || values.daysPerWeek.trim() === '') {
    errors.daysPerWeek = { type: 'required', message: 'Days per week is required' };
  } else {
    const num = parseFloat(values.daysPerWeek);
    if (isNaN(num) || num < 0 || num > 7) {
      errors.daysPerWeek = { type: 'validate', message: 'Days per week must be between 0 and 7' };
    }
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export const contractorResolver = (values: ContractorFormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.dayRate || values.dayRate.trim() === '') {
    errors.dayRate = { type: 'required', message: 'Day rate is required' };
  } else {
    const num = parseFloat(values.dayRate);
    if (isNaN(num) || num <= 0) {
      errors.dayRate = { type: 'validate', message: 'Day rate must be greater than 0' };
    }
  }

  if (values.workingDaysPerYear !== undefined && values.workingDaysPerYear !== '') {
    const num = parseFloat(values.workingDaysPerYear);
    if (isNaN(num) || num < 1 || num > 365) {
      errors.workingDaysPerYear = { type: 'validate', message: 'Working days per year must be between 1 and 365' };
    }
  }

  if (!values.permGrossSalary || values.permGrossSalary.trim() === '') {
    errors.permGrossSalary = { type: 'required', message: 'Permanent gross salary is required' };
  } else {
    const num = parseFloat(values.permGrossSalary);
    if (isNaN(num) || num <= 0) {
      errors.permGrossSalary = { type: 'validate', message: 'Permanent gross salary must be greater than 0' };
    }
  }

  if (values.taxCode !== undefined && values.taxCode !== '' && !TAX_CODE_REGEX.test(values.taxCode)) {
    errors.taxCode = { type: 'validate', message: 'Invalid UK Tax Code (e.g., 1257L, BR, D0, NT)' };
  }

  if (values.pensionRate !== undefined && values.pensionRate !== '') {
    const num = parseFloat(values.pensionRate);
    if (isNaN(num) || num < 0 || num > 100) {
      errors.pensionRate = { type: 'validate', message: 'Pension rate must be between 0% and 100%' };
    }
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export const settingsResolver = (values: SettingsFormValues) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (values.hoursPerWeek !== undefined && values.hoursPerWeek !== '') {
    const num = parseFloat(values.hoursPerWeek);
    if (isNaN(num) || num < 0 || num > 168) {
      errors.hoursPerWeek = { type: 'validate', message: 'Hours per week must be between 0 and 168' };
    }
  }

  if (values.daysPerWeek !== undefined && values.daysPerWeek !== '') {
    const num = parseFloat(values.daysPerWeek);
    if (isNaN(num) || num < 0 || num > 7) {
      errors.daysPerWeek = { type: 'validate', message: 'Days per week must be between 0 and 7' };
    }
  }

  if (values.taxCode !== undefined && values.taxCode !== '' && !TAX_CODE_REGEX.test(values.taxCode)) {
    errors.taxCode = { type: 'validate', message: 'Invalid UK Tax Code (e.g., 1257L, BR, D0, NT)' };
  }

  if (values.pensionRate !== undefined && values.pensionRate !== '') {
    const num = parseFloat(values.pensionRate);
    if (isNaN(num) || num < 0 || num > 100) {
      errors.pensionRate = { type: 'validate', message: 'Pension rate must be between 0% and 100%' };
    }
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
