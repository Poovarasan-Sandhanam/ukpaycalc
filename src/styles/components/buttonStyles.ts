import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadows } from '../theme';

export const buttonStyles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...shadows.sm,
  },
  btnPrimary: {
    backgroundColor: colors.primaryHover,
    borderColor: colors.primary,
  },
  btnSecondary: {
    backgroundColor: colors.surfaceBg,
    borderColor: colors.border,
  },
  btnDanger: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  disabled: {
    opacity: 0.45,
  },
  spinner: {
    marginRight: spacing.sm,
  },
  text: {
    fontWeight: '700',
    fontSize: fontSize.base,
    letterSpacing: 0.3,
  },
  textPrimary: {
    color: '#ffffff',
  },
  textSecondary: {
    color: colors.textMuted,
  },
});
