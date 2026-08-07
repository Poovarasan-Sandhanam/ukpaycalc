import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadows } from '../theme';

export const contractorStyles = StyleSheet.create({
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
  taxToggleBtn: {
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
  taxToggleText: {
    color: colors.accentBlue,
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
  taxToggleArrow: {
    color: colors.accentBlue,
    fontSize: fontSize.xs,
  },
  taxContainer: {
    marginTop: spacing.sm,
  },
  submitBtn: {
    marginTop: spacing.lg,
  },
  resultsCard: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: fontSize.xl,
    marginBottom: spacing.lg,
  },
  comparisonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  compBox: {
    flex: 1,
    backgroundColor: colors.darkBg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  compBoxHighlight: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceBg,
  },
  compTitle: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  compSub: {
    color: colors.textDark,
    fontSize: fontSize.xs,
    marginBottom: spacing.sm,
  },
  compValue: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  compValuePrimary: {
    color: colors.primary,
    fontWeight: '800',
  },
  diffCard: {
    backgroundColor: colors.darkBg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  diffCardPositive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBg,
  },
  diffCardNegative: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerBg,
  },
  diffLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  diffLabelPositive: {
    color: colors.primary,
  },
  diffLabelNegative: {
    color: colors.danger,
  },
  diffValue: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  diffValuePositive: {
    color: colors.primary,
  },
  diffValueNegative: {
    color: colors.danger,
  },
  diffSub: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  rowValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
