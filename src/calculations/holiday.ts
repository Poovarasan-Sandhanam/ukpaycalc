import { HolidayInput, HolidayResult } from './types';

export function calculateHoliday(input: HolidayInput): HolidayResult {
  const {
    hourlyRate,
    hoursPerWeek,
    daysPerWeek,
  } = input;

  // UK standard statutory holiday entitlement is 5.6 weeks per year.
  const statutoryWeeks = 5.6;

  // For a 5-day week, this is 28 days (capped at 28 days statutory limit).
  const rawDays = daysPerWeek * statutoryWeeks;
  const statutoryDays = Math.min(28, Math.round(rawDays * 100) / 100);

  // Holiday hours accrued per year
  const holidayHoursAccrued = Math.round((hoursPerWeek * statutoryWeeks) * 100) / 100;

  // Estimated monetary value of the holiday hours
  const totalHolidayValue = Math.round((holidayHoursAccrued * hourlyRate) * 100) / 100;

  return {
    statutoryWeeks,
    statutoryDays,
    holidayHoursAccrued,
    totalHolidayValue,
  };
}
