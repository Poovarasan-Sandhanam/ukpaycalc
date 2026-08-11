import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize } from '../theme';

export const settingsStyles = StyleSheet.create({
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
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successBg,
    borderColor: colors.success,
    borderWidth: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  successText: {
    color: colors.success,
    fontWeight: '600',
    fontSize: fontSize.sm,
    marginLeft: spacing.sm,
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
    marginBottom: spacing.lg,
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
  actionRow: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
