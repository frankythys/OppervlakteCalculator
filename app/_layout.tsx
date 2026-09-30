import React from 'react';
import { View } from 'react-native';
import { Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PersistentBottomNav } from '@/components/navigation/PersistentBottomNav';
import { AppStateProvider } from '@/state/AppStateProvider';
import { colors } from '@/theme/tokens';

export default function RootLayout() {
  const segments = useSegments();
  const showPersistentBottomNav = segments.length > 0 && segments[0] !== '(tabs)';

  return (
    <AppStateProvider>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
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
          <Stack.Screen name="calculator/bocht_lengte" options={{ title: 'Bocht / knik' }} />
          <Stack.Screen name="calculator/[id]" options={{ title: 'Calculator' }} />
        </Stack>

        {showPersistentBottomNav ? <PersistentBottomNav /> : null}
      </View>
    </AppStateProvider>
  );
}
