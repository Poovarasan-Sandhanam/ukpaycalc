import React from 'react';
import { View, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../styles/theme';
import { loaderStyles as styles } from '../styles/components/loaderStyles';

export interface LoaderProps {
  /** Whether the loader is active / visible */
  visible?: boolean;
  /** Primary message displayed under the spinner */
  message?: string;
  /** Sub-message or context detail */
  submessage?: string;
  /** Render as a full-screen semi-transparent overlay block */
  overlay?: boolean;
  /** Size of the ActivityIndicator */
  size?: 'small' | 'large' | number;
  /** Color of the spinner indicator */
  color?: string;
  /** Additional container styles */
  style?: StyleProp<ViewStyle>;
}

export const Loader: React.FC<LoaderProps> = ({
  visible = true,
  message,
  submessage,
  overlay = false,
  size = 'large',
  color = colors.primary,
  style,
}) => {
  if (!visible) return null;

  const content = (
    <View style={[overlay ? styles.modalContent : styles.inlineContainer, style]}>
      <ActivityIndicator size={size} color={color} style={styles.spinner} />
      {message ? <Text style={styles.messageText}>{message}</Text> : null}
      {submessage ? <Text style={styles.submessageText}>{submessage}</Text> : null}
    </View>
  );

  if (overlay) {
    return (
      <View style={styles.overlayContainer}>
        {content}
      </View>
    );
  }

  return content;
};

export default Loader;
