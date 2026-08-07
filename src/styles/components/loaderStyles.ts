import { StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, fontSize, shadows } from '../theme';

export const loaderStyles = StyleSheet.create({
  inlineContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 13, 22, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.cardBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 220,
    ...shadows.lg,
  },
  spinner: {
    marginBottom: spacing.md,
  },
  messageText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: fontSize.base,
    textAlign: 'center',
    marginTop: spacing.sm,
    letterSpacing: 0.3,
  },
  submessageText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
