import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Screen } from '@/components/Screen';
import { colors, radius, spacing } from '@/theme/tokens';

export default function SettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Instellingen</Text>
      <Text style={styles.subtitle}>Basisvoorkeuren voor de calculator.</Text>

      <View style={styles.card}>
        <SettingRow label="Live berekenen" value="Aan" toggle />
        <SettingRow label="Aantal decimalen" value="2" />
        <SettingRow label="Standaardeenheid" value="mm / m²" />
        <SettingRow label="Thema" value="Systeem" last />
      </View>

      <Text style={styles.section}>Over de app</Text>
      <View style={styles.card}>
        <SettingRow label="Versie" value="0.1.0" />
        <SettingRow label="Calculators" value="39" last />
      </View>
    </Screen>
  );
}

function SettingRow({
  label,
  value,
  toggle,
  last,
}: {
  label: string;
  value: string;
  toggle?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.row, !last && styles.rowBorder]}>
      <Text style={styles.label}>{label}</Text>
      {toggle ? <Switch value trackColor={{ true: colors.primarySoft }} /> : <Text style={styles.value}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.textMuted, marginTop: 5, marginBottom: spacing.lg },
  section: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: spacing.lg, marginBottom: spacing.sm },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    minHeight: 58,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  label: { color: colors.text, fontWeight: '700' },
  value: { color: colors.textMuted },
});
