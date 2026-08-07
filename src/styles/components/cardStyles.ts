import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../theme';

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
});
