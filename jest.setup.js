const mockStorage = new Map();

const mockAsyncStorage = {
  setItem: jest.fn((key, value) => {
    mockStorage.set(key, String(value));
    return Promise.resolve(null);
  }),
  getItem: jest.fn((key) => {
    const val = mockStorage.get(key);
    return Promise.resolve(val !== undefined ? val : null);
  }),
  removeItem: jest.fn((key) => {
    mockStorage.delete(key);
    return Promise.resolve(null);
  }),
  clear: jest.fn(() => {
    mockStorage.clear();
    return Promise.resolve(null);
  }),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-firebase/app', () => ({
  apps: [],
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logEvent: jest.fn(() => Promise.resolve()),
    setUserId: jest.fn(() => Promise.resolve()),
  });
});

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    recordError: jest.fn(() => Promise.resolve()),
    setAttribute: jest.fn(() => Promise.resolve()),
    setUserId: jest.fn(() => Promise.resolve()),
  });
});
export {};
