import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadows } from '../theme';

export const historyStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  listPadding: {
    paddingBottom: 40,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: spacing.md,
  },
  cardMainInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  badgeSalary: {
    backgroundColor: colors.primaryBg,
  },
  badgeSalaryText: {
    color: colors.primary,
  },
  badgeHoliday: {
    backgroundColor: colors.accentBlueBg,
  },
  badgeHolidayText: {
    color: colors.accentBlue,
  },
  badgeContractor: {
    backgroundColor: colors.accentPurpleBg,
  },
  badgeContractorText: {
    color: colors.accentPurple,
  },
  badgeDefault: {
    backgroundColor: colors.surfaceBg,
  },
  badgeDefaultText: {
    color: colors.textMuted,
  },
  timestampText: {
    color: colors.textDark,
    fontSize: fontSize.xs,
  },
  itemLabel: {
    color: colors.text,
    fontSize: fontSize.base,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemSubLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  trashBtn: {
    padding: spacing.sm,
    backgroundColor: colors.darkBg,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  clearBtn: {
    marginVertical: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIconBg: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderColor: colors.border,
    borderWidth: 1,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: spacing.md,
  },
  modalTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: '800',
  },
  closeBtnText: {
    color: colors.textMuted,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  modalBody: {
    marginBottom: spacing.xl,
  },
  detailGroup: {
    marginBottom: spacing.lg,
  },
  detailHeading: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
  },
  detailValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
