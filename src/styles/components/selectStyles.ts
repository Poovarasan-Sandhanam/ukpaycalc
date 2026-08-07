import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadows } from '../theme';

export const selectStyles = StyleSheet.create({
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
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.darkBg,
    padding: spacing.xs,
    borderRadius: borderRadius.md,
    borderColor: colors.border,
    borderWidth: 1,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  segmentBtnActive: {
    backgroundColor: colors.primaryHover,
    ...shadows.sm,
  },
  segmentText: {
    fontWeight: '600',
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  dropdownBtn: {
    backgroundColor: colors.darkBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnText: {
    color: colors.text,
    fontSize: fontSize.base,
    fontWeight: '500',
  },
  dropdownArrow: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '80%',
    paddingBottom: spacing.xxl,
    ...shadows.lg,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalHandle: {
    width: 48,
    height: 5,
    backgroundColor: colors.textDark,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  modalTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: fontSize.lg,
  },
  optionRow: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionRowSelected: {
    backgroundColor: colors.primaryBg,
  },
  optionText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
  },
  checkmark: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSize.base,
  },
});
