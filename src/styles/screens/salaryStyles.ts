import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize } from '../theme';

export const salaryStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headingTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: fontSize.xxl,
    marginBottom: spacing.lg,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  advancedToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    marginVertical: spacing.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.borderLight,
    borderBottomColor: colors.borderLight,
  },
  advancedToggleText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
  advancedToggleArrow: {
    color: colors.primary,
    fontSize: fontSize.xs,
  },
  advancedContainer: {
    marginTop: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.darkBg,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderColor: colors.borderLight,
    borderWidth: 1,
    marginTop: spacing.sm,
  },
  switchTextContainer: {
    flex: 1,
    paddingRight: spacing.lg,
  },
  switchLabel: {
    color: colors.text,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  switchSub: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  submitBtn: {
    marginTop: spacing.lg,
  },
});
