import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { salaryResolver, SalaryFormValues } from '../schemas/forms';
import { calculateSalary } from '../calculations/salary';
import { useAppStore } from '../store/useAppStore';
import { SalaryResult } from '../calculations/types';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ResultsSummary from '../components/ResultsSummary';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { logEvent } from '../services/firebase';
import { colors } from '../styles/theme';
import { salaryStyles as styles } from '../styles/screens/salaryStyles';

export const SalaryScreen = () => {
  const { preferences, addHistoryItem } = useAppStore();
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SalaryFormValues>({
    resolver: salaryResolver,
    defaultValues: {
      grossSalary: '',
      payFrequency: 'yearly',
      hoursPerWeek: preferences.hoursPerWeek.toString(),
      daysPerWeek: preferences.daysPerWeek.toString(),
      taxRegion: preferences.taxRegion,
      taxCode: preferences.taxCode,
      studentLoan: preferences.studentLoan,
      pensionRate: preferences.pensionRate.toString(),
      isPensionSalarySacrifice: preferences.isPensionSalarySacrifice,
    },
  });

  // Reset form defaults when preferences update in store
  useEffect(() => {
    reset({
      grossSalary: '',
      payFrequency: 'yearly',
      hoursPerWeek: preferences.hoursPerWeek.toString(),
      daysPerWeek: preferences.daysPerWeek.toString(),
      taxRegion: preferences.taxRegion,
      taxCode: preferences.taxCode,
      studentLoan: preferences.studentLoan,
      pensionRate: preferences.pensionRate.toString(),
      isPensionSalarySacrifice: preferences.isPensionSalarySacrifice,
    });
    setResult(null);
  }, [preferences, reset]);

  const payFrequency = watch('payFrequency');

  const onSubmit = (data: SalaryFormValues) => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculation = calculateSalary({
        grossSalary: Number(data.grossSalary),
        payFrequency: data.payFrequency,
        hoursPerWeek: Number(data.hoursPerWeek),
        daysPerWeek: Number(data.daysPerWeek),
        taxRegion: data.taxRegion,
        taxCode: data.taxCode || '1257L',
        studentLoan: data.studentLoan,
        pensionRate: Number(data.pensionRate),
        isPensionSalarySacrifice: data.isPensionSalarySacrifice,
      });

      setResult(calculation);

      // Save to history in Zustand store
      const freqLabel = data.payFrequency.charAt(0).toUpperCase() + data.payFrequency.slice(1);
      const label = `£${Number(data.grossSalary).toLocaleString()} (${freqLabel})`;
      addHistoryItem('salary', label, data, calculation);

      // Log analytics event
      logEvent('calculate_salary', {
        grossSalary: Number(data.grossSalary),
        payFrequency: data.payFrequency,
        taxRegion: data.taxRegion,
      });

      setIsCalculating(false);
    }, 300);
  };

  const frequencyOptions = [
    { label: 'Yearly', value: 'yearly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Daily', value: 'daily' },
    { label: 'Hourly', value: 'hourly' },
  ];

  const regionOptions = [
    { label: 'Rest of UK', value: 'UK' },
    { label: 'Scotland', value: 'Scotland' },
  ];

  const loanOptions = [
    { label: 'No Student Loan', value: 'none' },
    { label: 'Plan 1', value: 'plan1' },
    { label: 'Plan 2', value: 'plan2' },
    { label: 'Plan 4 (Scotland)', value: 'plan4' },
    { label: 'Plan 5', value: 'plan5' },
    { label: 'Postgraduate Loan', value: 'postgrad' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Loader
        overlay
        visible={isCalculating}
        message="Calculating Tax..."
        submessage="Applying HMRC tax bands & NI allowances"
      />
      <ScrollView style={styles.screenContainer} contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.headingTitle}>UK Salary Tax Calculator</Text>

          {/* Gross Salary Input */}
          <Controller
            control={control}
            name="grossSalary"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Gross Income (£)"
                placeholder="e.g. 45000"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.grossSalary?.message}
              />
            )}
          />

          {/* Pay Frequency Select */}
          <Controller
            control={control}
            name="payFrequency"
            render={({ field: { onChange, value } }) => (
              <SelectField
                label="Income Period"
                type="segment"
                options={frequencyOptions}
                selectedValue={value}
                onValueChange={onChange}
              />
            )}
          />

          {/* Advanced Options Collapsible Trigger */}
          <TouchableOpacity
            onPress={() => setShowAdvanced(!showAdvanced)}
            activeOpacity={0.7}
            style={styles.advancedToggleBtn}
          >
            <Text style={styles.advancedToggleText}>
              {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options (Tax Code, Pension, Loan)'}
            </Text>
            <Text style={styles.advancedToggleArrow}>{showAdvanced ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {/* Advanced Controls Section */}
          {showAdvanced && (
            <View style={styles.advancedContainer}>
              {/* Tax Region */}
              <Controller
                control={control}
                name="taxRegion"
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    label="Tax Region"
                    type="segment"
                    options={regionOptions}
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                )}
              />

              {/* Tax Code */}
              <Controller
                control={control}
                name="taxCode"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Tax Code (Default: 1257L)"
                    placeholder="1257L"
                    autoCapitalize="characters"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.taxCode?.message}
                  />
                )}
              />

              {/* Student Loan */}
              <Controller
                control={control}
                name="studentLoan"
                render={({ field: { onChange, value } }) => (
                  <SelectField
                    label="Student Loan Repayment"
                    type="dropdown"
                    options={loanOptions}
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                )}
              />

              {/* Pension Contribution */}
              <Controller
                control={control}
                name="pensionRate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Workplace Pension Contribution (%)"
                    placeholder="e.g. 5"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                    error={errors.pensionRate?.message}
                  />
                )}
              />

              {/* Salary Sacrifice Toggle */}
              <Controller
                control={control}
                name="isPensionSalarySacrifice"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.switchRow}>
                    <View style={styles.switchTextContainer}>
                      <Text style={styles.switchLabel}>Salary Sacrifice Pension</Text>
                      <Text style={styles.switchSub}>
                        Deduct pension before income tax and NI (reduces tax burden).
                      </Text>
                    </View>
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={value ? '#ffffff' : colors.textMuted}
                    />
                  </View>
                )}
              />
            </View>
          )}

          <Button
            title="Calculate Tax"
            loading={isCalculating}
            onPress={handleSubmit(onSubmit)}
            style={styles.submitBtn}
          />
        </Card>

        {/* Render results */}
        {result && <ResultsSummary result={result} />}
      </ScrollView>
    </View>
  );
};

export default SalaryScreen;
