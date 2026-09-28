import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';

const icon =
  (name: keyof typeof MaterialCommunityIcons.glyphMap) =>
  ({ color, size }: { color: string; size: number }) =>
    <MaterialCommunityIcons name={name} color={color} size={size} />;

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 12);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60 + bottomInset,
          paddingTop: 8,
          paddingBottom: bottomInset,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 11,
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: icon('home-variant-outline') }}
      />
      <Tabs.Screen
        name="calculators"
        options={{ title: 'Calculators', tabBarIcon: icon('calculator-variant-outline') }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: 'Geschiedenis', tabBarIcon: icon('history') }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Favorieten', tabBarIcon: icon('star-outline') }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: 'Instellingen', tabBarIcon: icon('cog-outline') }}
      />
    </Tabs>
  );
}
