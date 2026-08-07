import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadows } from '../theme';

export const resultsStyles = StyleSheet.create({
  cardMargin: {
    marginTop: spacing.sm,
  },
  title: {
    color: colors.text,
    fontWeight: '800',
    fontSize: fontSize.xl,
    marginBottom: spacing.md,
    letterSpacing: 0.3,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.darkBg,
    padding: spacing.xs,
    borderRadius: borderRadius.md,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: colors.surfaceBg,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  tabText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  rowLabel: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  rowLabelSub: {
    paddingLeft: spacing.lg,
    color: colors.textMuted,
    fontWeight: '400',
  },
  rowValue: {
    fontSize: fontSize.base,
    color: colors.text,
    fontWeight: '600',
  },
  rowValueNegative: {
    color: colors.danger,
  },
  rowValueBold: {
    fontWeight: '700',
    color: colors.primary,
  },
  takeHomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginTop: spacing.lg,
    backgroundColor: colors.darkBg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    borderColor: colors.primary,
    borderWidth: 1,
    ...shadows.sm,
  },
  takeHomeLabel: {
    color: colors.primaryLight,
    fontSize: fontSize.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  takeHomeSub: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  takeHomeValue: {
    fontSize: fontSize.hero,
    fontWeight: '900',
    color: colors.primary,
  },
});
