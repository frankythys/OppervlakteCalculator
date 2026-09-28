import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppStateProvider } from '@/state/AppStateProvider';
import { colors } from '@/theme/tokens';

export default function RootLayout() {
  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerShadowVisible: false,
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: '800' },
          headerTitleAlign: 'left',
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="category/[category]" options={{ title: 'Categorie' }} />
        <Stack.Screen name="calculator/materiaal_gewicht" options={{ title: 'Materiaalgewicht' }} />
        <Stack.Screen name="calculator/[id]" options={{ title: 'Calculator' }} />
      </Stack>
    </AppStateProvider>
  );
}
