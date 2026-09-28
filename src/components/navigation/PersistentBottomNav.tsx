import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

type NavItem = {
  label: string;
  icon: IconName;
  href: '/' | '/calculators' | '/history' | '/favorites' | '/settings';
  active?: boolean;
};

const items: NavItem[] = [
  { label: 'Home', icon: 'home-variant-outline', href: '/' },
  { label: 'Calculators', icon: 'calculator-variant-outline', href: '/calculators', active: true },
  { label: 'Geschiedenis', icon: 'history', href: '/history' },
  { label: 'Favorieten', icon: 'star-outline', href: '/favorites' },
  { label: 'Instellingen', icon: 'cog-outline', href: '/settings' },
];

export function PersistentBottomNav() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <View style={styles.bar}>
        {items.map((item) => {
          const tint = item.active ? colors.primary : colors.textMuted;
          return (
            <Pressable
              key={item.label}
              style={styles.item}
              onPress={() => router.navigate(item.href)}
              hitSlop={4}
            >
              <MaterialCommunityIcons name={item.icon} size={23} color={tint} />
              <Text style={[styles.label, { color: tint }]} numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  bar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.surface,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingHorizontal: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
  },
});
