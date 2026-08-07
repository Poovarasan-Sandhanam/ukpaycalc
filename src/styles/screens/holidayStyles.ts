import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize } from '../theme';

export const holidayStyles = StyleSheet.create({
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
  submitBtn: {
    marginTop: spacing.lg,
  },
  resultsCard: {
    marginTop: spacing.sm,
  },
  resultTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: fontSize.xl,
    marginBottom: spacing.lg,
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.darkBg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  statValue: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: '800',
  },
  heroResultCard: {
    backgroundColor: colors.darkBg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heroLabel: {
    color: colors.primaryLight,
    fontSize: fontSize.xs,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroValue: {
    color: colors.primary,
    fontSize: fontSize.hero,
    fontWeight: '900',
    marginTop: spacing.xs,
  },
  heroSub: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  infoValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
