import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme/tokens';

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.wrap}>
      <MaterialCommunityIcons name="calculator-variant-outline" size={48} color={colors.textMuted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 64, paddingHorizontal: spacing.xl },
  title: { color: colors.text, fontSize: 19, fontWeight: '800', marginTop: spacing.md },
  text: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xs, lineHeight: 21 },
});
