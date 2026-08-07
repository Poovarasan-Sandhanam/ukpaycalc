import React, { useState } from 'react';
import { ScrollView, View, Text, Switch, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAppStore } from '../store/useAppStore';
import { settingsResolver, SettingsFormValues } from '../schemas/forms';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Card from '../components/Card';
import { CheckIcon } from '../components/Icons';
import { colors } from '../styles/theme';
import { settingsStyles as styles } from '../styles/screens/settingsStyles';

export const SettingsScreen = () => {
  const { preferences, setPreferences } = useAppStore();
  const [isSaved, setIsSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: settingsResolver,
    defaultValues: {
      taxRegion: preferences.taxRegion,
      taxCode: preferences.taxCode,
      studentLoan: preferences.studentLoan,
      pensionRate: preferences.pensionRate.toString(),
      isPensionSalarySacrifice: preferences.isPensionSalarySacrifice,
      hoursPerWeek: preferences.hoursPerWeek.toString(),
      daysPerWeek: preferences.daysPerWeek.toString(),
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    setPreferences({
      taxRegion: data.taxRegion,
      taxCode: data.taxCode,
      studentLoan: data.studentLoan,
      pensionRate: Number(data.pensionRate),
      isPensionSalarySacrifice: data.isPensionSalarySacrifice,
      hoursPerWeek: Number(data.hoursPerWeek),
      daysPerWeek: Number(data.daysPerWeek),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    const formDefaults: SettingsFormValues = {
      taxRegion: 'UK',
      taxCode: '1257L',
      studentLoan: 'none',
      pensionRate: '5',
      isPensionSalarySacrifice: false,
      hoursPerWeek: '37.5',
      daysPerWeek: '5',
    };
    reset(formDefaults);
    setPreferences({
      taxRegion: 'UK',
      taxCode: '1257L',
      studentLoan: 'none',
      pensionRate: 5,
      isPensionSalarySacrifice: false,
      hoursPerWeek: 37.5,
      daysPerWeek: 5,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    Alert.alert('Reset Complete', 'Default tax preferences have been restored.');
  };

  const regionOptions = [
    { label: 'Rest of UK (England, Wales, NI)', value: 'UK' },
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
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.scrollContent}>
      <Card>
        <Text style={styles.headingTitle}>Calculator Preferences</Text>

        {isSaved && (
          <View style={styles.successBadge}>
            <CheckIcon color={colors.primary} size={18} />
            <Text style={styles.successText}>Preferences saved successfully!</Text>
          </View>
        )}

        {/* Region */}
        <Controller
          control={control}
          name="taxRegion"
          render={({ field: { onChange, value } }) => (
            <SelectField
              label="Default Tax Region"
              type="dropdown"
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
              label="Default Tax Code"
              placeholder="e.g. 1257L"
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
              label="Default Student Loan"
              type="dropdown"
              options={loanOptions}
              selectedValue={value}
              onValueChange={onChange}
            />
          )}
        />

        {/* Pension Rate */}
        <Controller
          control={control}
          name="pensionRate"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Default Pension Contribution (%)"
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
                  Default to pre-tax pension deduction.
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

        {/* Contracted Hours */}
        <Controller
          control={control}
          name="hoursPerWeek"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Default Weekly Hours"
              placeholder="e.g. 37.5"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              error={errors.hoursPerWeek?.message}
            />
          )}
        />

        {/* Contracted Days */}
        <Controller
          control={control}
          name="daysPerWeek"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="Default Days Worked Per Week"
              placeholder="e.g. 5"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value.toString()}
              error={errors.daysPerWeek?.message}
            />
          )}
        />

        <View style={styles.actionRow}>
          <Button title="Save Preferences" onPress={handleSubmit(onSubmit)} />
          <Button title="Reset to Defaults" variant="secondary" onPress={handleReset} />
        </View>
      </Card>
    </ScrollView>
  );
};

export default SettingsScreen;
