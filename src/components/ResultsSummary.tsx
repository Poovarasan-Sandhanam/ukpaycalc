import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SalaryResult, CalculationBreakdown } from '../calculations/types';
import Card from './Card';
import { resultsStyles as styles } from '../styles/components/resultsStyles';

interface ResultsSummaryProps {
  result: SalaryResult;
}

export const ResultsSummary = ({ result }: ResultsSummaryProps) => {
  const [activeFrequency, setActiveFrequency] = useState<'yearly' | 'monthly' | 'weekly' | 'daily' | 'hourly'>('monthly');

  const frequencies: { label: string; value: typeof activeFrequency }[] = [
    { label: 'Yearly', value: 'yearly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Daily', value: 'daily' },
    { label: 'Hourly', value: 'hourly' },
  ];

  const breakdown: CalculationBreakdown = result[activeFrequency];

  const formatCurrency = (amount: number) => {
    return '£' + amount.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const Row = ({ label, value, isSub = false, isNegative = false, isBold = false }: {
    label: string;
    value: number;
    isSub?: boolean;
    isNegative?: boolean;
    isBold?: boolean;
  }) => (
    <View style={styles.rowContainer}>
      <Text style={[styles.rowLabel, isSub && styles.rowLabelSub]}>
        {label}
      </Text>
      <Text
        style={[
          styles.rowValue,
          isNegative && value > 0 && styles.rowValueNegative,
          isBold && styles.rowValueBold,
        ]}
      >
        {isNegative && value > 0 ? '-' : ''}
        {formatCurrency(value)}
      </Text>
    </View>
  );

  return (
    <Card style={styles.cardMargin}>
      <Text style={styles.title}>Calculation Breakdown</Text>
      
      {/* Frequency Toggle Tabs */}
      <View style={styles.tabContainer}>
        {frequencies.map((freq) => {
          const isActive = freq.value === activeFrequency;
          return (
            <TouchableOpacity
              key={freq.value}
              onPress={() => setActiveFrequency(freq.value)}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {freq.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Income Breakdown List */}
      <View>
        <Row label="Gross Salary" value={breakdown.gross} />
        
        {breakdown.pensionContribution > 0 && (
          <Row label="Pension Contribution" value={breakdown.pensionContribution} isNegative />
        )}
        
        <Row label="Tax-Free Personal Allowance" value={breakdown.personalAllowance} />
        <Row label="Taxable Income" value={breakdown.taxableIncome} isSub />
        
        {breakdown.incomeTax > 0 && (
          <Row label="Income Tax" value={breakdown.incomeTax} isNegative />
        )}
        
        {breakdown.nationalInsurance > 0 && (
          <Row label="National Insurance" value={breakdown.nationalInsurance} isNegative />
        )}
        
        {breakdown.studentLoanDeduction > 0 && (
          <Row label="Student Loan" value={breakdown.studentLoanDeduction} isNegative />
        )}

        {/* Take Home Pay */}
        <View style={styles.takeHomeContainer}>
          <View>
            <Text style={styles.takeHomeLabel}>Take Home Pay</Text>
            <Text style={styles.takeHomeSub}>Estimated {activeFrequency} earnings</Text>
          </View>
          <Text style={styles.takeHomeValue}>
            {formatCurrency(breakdown.takeHome)}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default ResultsSummary;
