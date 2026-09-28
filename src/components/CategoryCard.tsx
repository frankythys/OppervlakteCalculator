import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, shadow, spacing } from '@/theme/tokens';

const ICONS: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Leidingen: 'pipe',
  Bochten: 'pipe-disconnected',
  Flenskappen: 'circle-outline',
  Afsluiters: 'valve',
  'Kappen en kasten': 'cube-outline',
  Vormen: 'shape-outline',
  'Tanks en bollen': 'sphere',
  Materiaal: 'layers-outline',
  'PU-schuim': 'spray',
  'Tijd en prijs': 'clock-outline',
  Algemeen: 'calculator-variant-outline',
  Tabellen: 'table',
};

export function CategoryCard({
  title,
  count,
  onPress,
}: {
  title: string;
  count: number;
  onPress: () => void;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={ICONS[title] ?? 'calculator-variant-outline'}
          size={26}
          color={colors.primary}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{count} calculators</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 140,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  pressed: { opacity: 0.75, transform: [{ scale: 0.99 }] },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: { color: colors.text, fontSize: 16, fontWeight: '800' },
  subtitle: { color: colors.textMuted, marginTop: 4, fontSize: 13 },
});
