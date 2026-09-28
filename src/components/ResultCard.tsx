import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/tokens';

export type ResultRow = {
  label: string;
  value: string;
};

export function ResultCard({
  primary,
  secondary,
}: {
  primary: ResultRow | null;
  secondary: ResultRow[];
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>RESULTAAT</Text>

      {primary ? (
        <>
          <Text style={styles.primaryValue}>{primary.value}</Text>
          <Text style={styles.primaryLabel}>{primary.label}</Text>
        </>
      ) : (
        <Text style={styles.empty}>Vul de waarden in om het resultaat te zien.</Text>
      )}

      {secondary.length > 0 ? (
        <View style={styles.secondary}>
          {secondary.map((row) => (
            <View style={styles.secondaryRow} key={`${row.label}-${row.value}`}>
              <Text style={styles.secondaryLabel}>{row.label}</Text>
              <Text style={styles.secondaryValue}>{row.value}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  eyebrow: {
    color: '#AAC2D8',
    letterSpacing: 1.2,
    fontSize: 12,
    fontWeight: '800',
  },
  primaryValue: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  primaryLabel: { color: '#DCE8F3', fontSize: 15, marginTop: 2 },
  empty: { color: '#DCE8F3', fontSize: 16, marginTop: spacing.md },
  secondary: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#4D657D',
    marginTop: spacing.lg,
    paddingTop: spacing.sm,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: 7,
  },
  secondaryLabel: { color: '#C8D7E5', flex: 1 },
  secondaryValue: { color: colors.white, fontWeight: '800' },
});
