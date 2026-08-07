import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { contractorResolver, ContractorFormValues } from '../schemas/forms';
import { calculateContractorComparison } from '../calculations/contractor';
import { useAppStore } from '../store/useAppStore';
import { ContractorResult } from '../calculations/types';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { logEvent } from '../services/firebase';
import { contractorStyles as styles } from '../styles/screens/contractorStyles';

export const ContractorScreen = () => {
  const { preferences, addHistoryItem } = useAppStore();
  const [result, setResult] = useState<ContractorResult | null>(null);
  const [showTaxSettings, setShowTaxSettings] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContractorFormValues>({
    resolver: contractorResolver,
    defaultValues: {
      dayRate: '',
      workingDaysPerYear: '220',
      permGrossSalary: '',
      taxRegion: preferences.taxRegion,
      taxCode: preferences.taxCode,
      studentLoan: preferences.studentLoan,
      pensionRate: preferences.pensionRate.toString(),
    },
  });

  const permGrossSalary = watch('permGrossSalary');

  // Reset defaults when preferences change
  useEffect(() => {
    reset({
      dayRate: '',
      workingDaysPerYear: '220',
      permGrossSalary: '',
      taxRegion: preferences.taxRegion,
      taxCode: preferences.taxCode,
      studentLoan: preferences.studentLoan,
      pensionRate: preferences.pensionRate.toString(),
    });
    setResult(null);
  }, [preferences, reset]);

  const onSubmit = (data: ContractorFormValues) => {
    setIsCalculating(true);

    setTimeout(() => {
      const comparison = calculateContractorComparison({
        dayRate: Number(data.dayRate),
        workingDaysPerYear: Number(data.workingDaysPerYear),
        permGrossSalary: Number(data.permGrossSalary),
        taxRegion: data.taxRegion,
        taxCode: data.taxCode,
        studentLoan: data.studentLoan,
        pensionRate: Number(data.pensionRate),
      });

      setResult(comparison);

      // Save to history
      const label = `Contractor: £${data.dayRate}/day vs £${Number(data.permGrossSalary).toLocaleString()} Perm`;
      addHistoryItem('contractor', label, data, comparison);

      // Log analytics event
      logEvent('calculate_contractor', {
        dayRate: Number(data.dayRate),
        workingDays: Number(data.workingDaysPerYear),
        permSalary: Number(data.permGrossSalary),
      });

      setIsCalculating(false);
    }, 300);
  };

  const formatCurrency = (amount: number) => {
    return '£' + amount.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

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
        message="Comparing Take-Home..."
        submessage="Calculating contractor vs permanent net earnings"
      />
      <ScrollView style={styles.screenContainer} contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.headingTitle}>Contractor vs Permanent Pay</Text>

          {/* Day Rate */}
          <Controller
            control={control}
            name="dayRate"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Contractor Day Rate (£)"
                placeholder="e.g. 500"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.dayRate?.message}
              />
            )}
          />

          {/* Working Days per year */}
          <Controller
            control={control}
            name="workingDaysPerYear"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Working Days Per Year (Avg 220-230)"
                placeholder="e.g. 220"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.workingDaysPerYear?.message}
              />
            )}
          />

          {/* Permanent Salary Comparison */}
          <Controller
            control={control}
            name="permGrossSalary"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Equivalent Permanent Salary (£)"
                placeholder="e.g. 85000"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.permGrossSalary?.message}
              />
            )}
          />

          {/* Tax Settings Toggle */}
          <TouchableOpacity
            onPress={() => setShowTaxSettings(!showTaxSettings)}
            activeOpacity={0.7}
            style={styles.taxToggleBtn}
          >
            <Text style={styles.taxToggleText}>
              {showTaxSettings ? 'Hide Tax Preferences' : 'Adjust Tax Preferences & Student Loan'}
            </Text>
            <Text style={styles.taxToggleArrow}>{showTaxSettings ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {/* Advanced Tax Preferences */}
          {showTaxSettings && (
            <View style={styles.taxContainer}>
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
            </View>
          )}

          <Button
            title="Compare Earnings"
            loading={isCalculating}
            onPress={handleSubmit(onSubmit)}
            style={styles.submitBtn}
          />
        </Card>

        {/* Results View */}
        {result && (
          <Card style={styles.resultsCard}>
            <Text style={styles.sectionTitle}>Comparison Results</Text>

            {/* Comparison Cards */}
            <View style={styles.comparisonGrid}>
              <View style={[styles.compBox, styles.compBoxHighlight]}>
                <Text style={styles.compTitle}>Contractor</Text>
                <Text style={styles.compSub}>Gross: {formatCurrency(result.contractorGross)}</Text>
                <Text style={[styles.compValue, styles.compValuePrimary]}>
                  {formatCurrency(result.contractorNet)}
                </Text>
                <Text style={styles.compSub}>Net Annual Take-Home</Text>
              </View>

              <View style={styles.compBox}>
                <Text style={styles.compTitle}>Permanent</Text>
                <Text style={styles.compSub}>Gross: {formatCurrency(Number(permGrossSalary) || 0)}</Text>
                <Text style={styles.compValue}>
                  {formatCurrency(result.permNet)}
                </Text>
                <Text style={styles.compSub}>Net Annual Take-Home</Text>
              </View>
            </View>

            {/* Difference Summary */}
            <View
              style={[
                styles.diffCard,
                result.difference >= 0 ? styles.diffCardPositive : styles.diffCardNegative,
              ]}
            >
              <Text
                style={[
                  styles.diffLabel,
                  result.difference >= 0 ? styles.diffLabelPositive : styles.diffLabelNegative,
                ]}
              >
                {result.difference >= 0 ? 'Contractor Net Advantage' : 'Permanent Net Advantage'}
              </Text>
              <Text
                style={[
                  styles.diffValue,
                  result.difference >= 0 ? styles.diffValuePositive : styles.diffValueNegative,
                ]}
              >
                {result.difference >= 0 ? '+' : ''}
                {formatCurrency(result.difference)} / year
              </Text>
              <Text style={styles.diffSub}>
                ({result.difference >= 0 ? '+' : ''}
                {formatCurrency(result.difference / 12)} / month)
              </Text>
            </View>

            {/* Detailed breakdown list */}
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Contractor Monthly Net Take-Home</Text>
              <Text style={styles.rowValue}>{formatCurrency(result.contractorNet / 12)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Permanent Monthly Net Take-Home</Text>
              <Text style={styles.rowValue}>{formatCurrency(result.permNet / 12)}</Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

export default ContractorScreen;
