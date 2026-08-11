import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { holidayResolver, HolidayFormValues } from '../schemas/forms';
import { calculateHoliday } from '../calculations/holiday';
import { useAppStore } from '../store/useAppStore';
import { HolidayResult } from '../calculations/types';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { logEvent } from '../services/firebase';
import { holidayStyles as styles } from '../styles/screens/holidayStyles';

export const HolidayScreen = () => {
  const { preferences, addHistoryItem } = useAppStore();
  const [result, setResult] = useState<HolidayResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HolidayFormValues>({
    resolver: holidayResolver,
    defaultValues: {
      hourlyRate: '',
      hoursPerWeek: preferences.hoursPerWeek.toString(),
      daysPerWeek: preferences.daysPerWeek.toString(),
    },
  });

  const onSubmit = (data: HolidayFormValues) => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculation = calculateHoliday({
        hourlyRate: Number(data.hourlyRate),
        hoursPerWeek: Number(data.hoursPerWeek),
        daysPerWeek: Number(data.daysPerWeek),
      });

      setResult(calculation);

      // Save to history
      const label = `Holiday: £${Number(data.hourlyRate)}/hr (${data.hoursPerWeek} hrs/wk)`;
      addHistoryItem('holiday', label, data, calculation);

      // Log analytics event
      logEvent('calculate_holiday', {
        hourlyRate: Number(data.hourlyRate),
        hoursPerWeek: Number(data.hoursPerWeek),
        daysPerWeek: Number(data.daysPerWeek),
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

  return (
    <View style={{ flex: 1 }}>
      <Loader
        overlay
        visible={isCalculating}
        message="Calculating Entitlement..."
        submessage="Calculating UK statutory holiday pay & hours"
      />
      <ScrollView style={styles.screenContainer} contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.headingTitle}>Holiday Pay Calculator</Text>

          {/* Hourly Rate */}
          <Controller
            control={control}
            name="hourlyRate"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Hourly Pay Rate (£)"
                placeholder="e.g. 15.50"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.hourlyRate?.message}
              />
            )}
          />

          {/* Hours per week */}
          <Controller
            control={control}
            name="hoursPerWeek"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Contracted Hours Per Week"
                placeholder="e.g. 37.5"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.hoursPerWeek?.message}
              />
            )}
          />

          {/* Days per week */}
          <Controller
            control={control}
            name="daysPerWeek"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="Days Worked Per Week"
                placeholder="e.g. 5"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                error={errors.daysPerWeek?.message}
              />
            )}
          />

          <Button
            title="Calculate Holiday Entitlement"
            loading={isCalculating}
            onPress={handleSubmit(onSubmit)}
            style={styles.submitBtn}
          />
        </Card>

        {/* Render calculation results */}
        {result && (
          <Card style={styles.resultsCard}>
            <Text style={styles.resultTitle}>Annual Holiday Entitlement</Text>

            {/* Stat Badges Grid */}
            <View style={styles.statGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Annual Entitlement</Text>
                <Text style={styles.statValue}>{result.statutoryDays.toFixed(1)} days</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Holiday Hours</Text>
                <Text style={styles.statValue}>{result.holidayHoursAccrued.toFixed(1)} hrs</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Statutory Weeks</Text>
                <Text style={styles.statValue}>{result.statutoryWeeks} wks</Text>
              </View>
            </View>

            {/* Hero Result Banner */}
            <View style={styles.heroResultCard}>
              <Text style={styles.heroLabel}>Total Annual Holiday Pay Value</Text>
              <Text style={styles.heroValue}>{formatCurrency(result.totalHolidayValue)}</Text>
              <Text style={styles.heroSub}>Based on 5.6 weeks statutory UK entitlement</Text>
            </View>

            {/* Additional details */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Daily Pay Rate (Est)</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(result.totalHolidayValue / (result.statutoryDays || 1))}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weekly Pay Rate (Est)</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(result.totalHolidayValue / result.statutoryWeeks)}
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

export default HolidayScreen;
