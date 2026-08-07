import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppStore, HistoryItem } from '../store/useAppStore';
import { TrashIcon, HistoryIcon, ChevronRightIcon } from '../components/Icons';
import Card from '../components/Card';
import Button from '../components/Button';
import { colors } from '../styles/theme';
import { historyStyles as styles } from '../styles/screens/historyStyles';

export const HistoryScreen = () => {
  const { history, deleteHistoryItem, clearHistory } = useAppStore();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return '£' + amount.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'salary':
        return { container: styles.badgeSalary, text: styles.badgeSalaryText };
      case 'holiday':
        return { container: styles.badgeHoliday, text: styles.badgeHolidayText };
      case 'contractor':
        return { container: styles.badgeContractor, text: styles.badgeContractorText };
      default:
        return { container: styles.badgeDefault, text: styles.badgeDefaultText };
    }
  };

  const getTakeHomeLabel = (item: HistoryItem) => {
    if (item.type === 'salary') {
      return `Monthly Net: ${formatCurrency(item.results.monthly.takeHome)}`;
    }
    if (item.type === 'holiday') {
      return `Holiday Value: ${formatCurrency(item.results.totalHolidayValue)}`;
    }
    if (item.type === 'contractor') {
      return `Contractor Net: ${formatCurrency(item.results.contractorNet)}`;
    }
    return '';
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const badge = getBadgeStyle(item.type);
    return (
      <Card style={styles.cardItem}>
        <TouchableOpacity
          onPress={() => setSelectedItem(item)}
          activeOpacity={0.7}
          style={styles.cardTouch}
        >
          <View style={styles.cardMainInfo}>
            <View style={styles.badgeRow}>
              <View style={[styles.badgeContainer, badge.container]}>
                <Text style={[styles.badgeText, badge.text]}>
                  {item.type}
                </Text>
              </View>
              <Text style={styles.timestampText}>
                {formatTime(item.timestamp)}
              </Text>
            </View>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.itemSubLabel}>{getTakeHomeLabel(item)}</Text>
          </View>
          <ChevronRightIcon color={colors.textDark} size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteHistoryItem(item.id)}
          activeOpacity={0.7}
          style={styles.trashBtn}
        >
          <TrashIcon color={colors.danger} size={20} />
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {history.length > 0 ? (
        <>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={renderHistoryItem}
            contentContainerStyle={styles.listPadding}
          />
          <Button
            title="Clear All History"
            variant="secondary"
            onPress={clearHistory}
            style={styles.clearBtn}
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBg}>
            <HistoryIcon color={colors.textMuted} size={36} />
          </View>
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptySubtitle}>
            Calculations you run across Salary, Holiday, or Contractor screens will appear here automatically for quick reference.
          </Text>
        </View>
      )}

      {/* History Item Details Modal */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={Boolean(selectedItem)}
          onRequestClose={() => setSelectedItem(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Calculation Details</Text>
                <TouchableOpacity onPress={() => setSelectedItem(null)}>
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailHeading}>Summary</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Type</Text>
                    <Text style={styles.detailValue}>{selectedItem.type.toUpperCase()}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Label</Text>
                    <Text style={styles.detailValue}>{selectedItem.label}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{formatTime(selectedItem.timestamp)}</Text>
                  </View>
                </View>

                {/* Salary specific details */}
                {selectedItem.type === 'salary' && selectedItem.results && (
                  <View style={styles.detailGroup}>
                    <Text style={styles.detailHeading}>Monthly Breakdown</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Gross Pay</Text>
                      <Text style={styles.detailValue}>
                        {formatCurrency(selectedItem.results.monthly.gross)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Income Tax</Text>
                      <Text style={styles.detailValue}>
                        {formatCurrency(selectedItem.results.monthly.incomeTax)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>National Insurance</Text>
                      <Text style={styles.detailValue}>
                        {formatCurrency(selectedItem.results.monthly.nationalInsurance)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Take Home Net</Text>
                      <Text style={[styles.detailValue, { color: colors.primary }]}>
                        {formatCurrency(selectedItem.results.monthly.takeHome)}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Contractor specific details */}
                {selectedItem.type === 'contractor' && selectedItem.results && (
                  <View style={styles.detailGroup}>
                    <Text style={styles.detailHeading}>Contractor Breakdown</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Contractor Annual Net</Text>
                      <Text style={[styles.detailValue, { color: colors.primary }]}>
                        {formatCurrency(selectedItem.results.contractorNet)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Perm Annual Net</Text>
                      <Text style={styles.detailValue}>
                        {formatCurrency(selectedItem.results.permNet)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Net Advantage</Text>
                      <Text style={styles.detailValue}>
                        {formatCurrency(selectedItem.results.difference)}
                      </Text>
                    </View>
                  </View>
                )}

                {/* Holiday specific details */}
                {selectedItem.type === 'holiday' && selectedItem.results && (
                  <View style={styles.detailGroup}>
                    <Text style={styles.detailHeading}>Holiday Breakdown</Text>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Holiday Days</Text>
                      <Text style={styles.detailValue}>
                        {selectedItem.results.statutoryDays?.toFixed(1)} days
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Total Holiday Pay</Text>
                      <Text style={[styles.detailValue, { color: colors.primary }]}>
                        {formatCurrency(selectedItem.results.totalHolidayValue)}
                      </Text>
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HistoryScreen;
