import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import SalaryScreen from '../screens/SalaryScreen';
import HolidayScreen from '../screens/HolidayScreen';
import ContractorScreen from '../screens/ContractorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

import {
  CalculatorIcon,
  CalendarIcon,
  BriefcaseIcon,
  HistoryIcon,
  SettingsIcon,
} from '../components/Icons';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bg,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: colors.text,
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: colors.bg,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '700',
            marginTop: 2,
          },
        }}
      >
        <Tab.Screen
          name="Salary"
          component={SalaryScreen}
          options={{
            title: 'Salary Calc',
            tabBarIcon: ({ color, size }) => <CalculatorIcon color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Holiday"
          component={HolidayScreen}
          options={{
            title: 'Holiday Pay',
            tabBarIcon: ({ color, size }) => <CalendarIcon color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Contractor"
          component={ContractorScreen}
          options={{
            title: 'Contractor',
            tabBarIcon: ({ color, size }) => <BriefcaseIcon color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: 'History',
            tabBarIcon: ({ color, size }) => <HistoryIcon color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
