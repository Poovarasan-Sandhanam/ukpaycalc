import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaxRegion, StudentLoanPlan } from '../calculations/types';

export interface Preferences {
  taxRegion: TaxRegion;
  taxCode: string;
  studentLoan: StudentLoanPlan;
  pensionRate: number;
  isPensionSalarySacrifice: boolean;
  hoursPerWeek: number;
  daysPerWeek: number;
}

export interface HistoryItem {
  id: string;
  type: 'salary' | 'holiday' | 'contractor';
  timestamp: number;
  label: string;
  inputs: any;
  results: any;
}

interface AppState {
  preferences: Preferences;
  history: HistoryItem[];
  setPreferences: (prefs: Partial<Preferences>) => void;
  addHistoryItem: (type: 'salary' | 'holiday' | 'contractor', label: string, inputs: any, results: any) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
}

const DEFAULT_PREFERENCES: Preferences = {
  taxRegion: 'UK',
  taxCode: '1257L',
  studentLoan: 'none',
  pensionRate: 5,
  isPensionSalarySacrifice: false,
  hoursPerWeek: 37.5,
  daysPerWeek: 5,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      preferences: DEFAULT_PREFERENCES,
      history: [],
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
      addHistoryItem: (type, label, inputs, results) =>
        set((state) => {
          const newItem: HistoryItem = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            timestamp: Date.now(),
            label,
            inputs,
            results,
          };
          // Prepend to history, limit to top 50 items
          return {
            history: [newItem, ...state.history].slice(0, 50),
          };
        }),
      deleteHistoryItem: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () =>
        set({
          history: [],
        }),
    }),
    {
      name: 'uk-paycalc-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
