import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize } from '../theme';

export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: colors.darkBg,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.base,
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceBg,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
    fontWeight: '500',
  },
});
