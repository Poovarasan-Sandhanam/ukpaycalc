import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../styles/theme';
import { inputStyles as styles } from '../styles/components/inputStyles';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const InputField = React.forwardRef<TextInput, InputFieldProps>(
  ({ label, error, containerStyle, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            Boolean(error) && styles.inputError,
          ]}
          placeholderTextColor={colors.textDark}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;
