import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleProp, ViewStyle } from 'react-native';
import { selectStyles as styles } from '../styles/components/selectStyles';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  selectedValue: string;
  onValueChange: (value: any) => void;
  containerStyle?: StyleProp<ViewStyle>;
  type?: 'segment' | 'dropdown';
}

export const SelectField = ({
  label,
  options,
  selectedValue,
  onValueChange,
  containerStyle,
  type = 'dropdown',
}: SelectFieldProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentOption = options.find((o) => o.value === selectedValue) || options[0];

  if (type === 'segment' && options.length <= 4) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.segmentContainer}>
          {options.map((opt) => {
            const isSelected = opt.value === selectedValue;
            return (
              <TouchableOpacity
                key={opt.value}
                onPress={() => onValueChange(opt.value)}
                activeOpacity={0.8}
                style={[
                  styles.segmentBtn,
                  isSelected && styles.segmentBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    isSelected && styles.segmentTextActive,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  // Dropdown type with Custom Modal
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        style={styles.dropdownBtn}
      >
        <Text style={styles.dropdownBtnText}>
          {currentOption ? currentOption.label : 'Select an option'}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>{label}</Text>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === selectedValue;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onValueChange(item.value);
                      setModalVisible(false);
                    }}
                    activeOpacity={0.7}
                    style={[
                      styles.optionRow,
                      isSelected && styles.optionRowSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SelectField;
