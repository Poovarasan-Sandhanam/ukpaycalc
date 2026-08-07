import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../styles/theme';
import { buttonStyles as styles } from '../styles/components/buttonStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>; // for backward compatibility
}

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  containerStyle,
}: ButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.btnSecondary;
      case 'danger':
        return styles.btnDanger;
      case 'primary':
      default:
        return styles.btnPrimary;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'danger':
      case 'primary':
      default:
        return styles.textPrimary;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        getButtonStyle(),
        isDisabled && styles.disabled,
        containerStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? colors.textMuted : '#ffffff'}
          style={styles.spinner}
        />
      ) : null}
      <Text style={[styles.text, getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
