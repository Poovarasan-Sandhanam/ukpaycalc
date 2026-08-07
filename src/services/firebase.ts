import { getApp, getApps } from '@react-native-firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent, setUserId as firebaseSetUserId } from '@react-native-firebase/analytics';
import { getCrashlytics, recordError as firebaseRecordError, setAttribute as firebaseSetAttribute, setUserId as firebaseCrashlyticsSetUserId } from '@react-native-firebase/crashlytics';

let isFirebaseAvailable = false;
let analyticsInstance: any = null;
let crashlyticsInstance: any = null;

try {
  const apps = getApps();
  if (apps.length > 0) {
    const app = getApp();
    analyticsInstance = getAnalytics(app);
    crashlyticsInstance = getCrashlytics(app);
    isFirebaseAvailable = true;
  }
} catch (error) {
  console.warn('Firebase configuration files missing. Firebase SDK will run in dry-run mode.', error);
  isFirebaseAvailable = false;
}

export const logEvent = async (eventName: string, params?: Record<string, any>) => {
  if (isFirebaseAvailable && analyticsInstance) {
    try {
      firebaseLogEvent(analyticsInstance, eventName, params);
      console.log(`[Firebase Analytics] Event: ${eventName}`, params);
    } catch (err) {
      console.error('[Firebase Analytics] Failed to log event', err);
    }
  } else {
    console.log(`[Firebase Analytics Dry-run] Event: ${eventName}`, params);
  }
};

export const recordError = async (error: Error, customContext?: string) => {
  if (isFirebaseAvailable && crashlyticsInstance) {
    try {
      if (customContext) {
        await firebaseSetAttribute(crashlyticsInstance, 'context', customContext);
      }
      firebaseRecordError(crashlyticsInstance, error);
      console.error(`[Firebase Crashlytics] Recorded error: ${error.message}`);
    } catch (err) {
      console.error('[Firebase Crashlytics] Failed to record error', err);
    }
  } else {
    console.error(`[Firebase Crashlytics Dry-run] Error: ${error.message}`, { customContext });
  }
};

export const setUserId = async (userId: string) => {
  if (isFirebaseAvailable) {
    try {
      if (analyticsInstance) {
        await firebaseSetUserId(analyticsInstance, userId);
      }
      if (crashlyticsInstance) {
        await firebaseCrashlyticsSetUserId(crashlyticsInstance, userId);
      }
    } catch (err) {
      console.error('[Firebase] Failed to set user ID', err);
    }
  }
};

export default {
  logEvent,
  recordError,
  setUserId,
};
