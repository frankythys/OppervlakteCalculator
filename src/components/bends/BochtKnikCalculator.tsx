import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { NumericInput } from '@/components/NumericInput';
import { SelectInput } from '@/components/SelectInput';
import { ResultCard, type ResultRow } from '@/components/ResultCard';
import { TechnicalImageCard } from '@/components/technical/TechnicalImageCard';
import { technicalImages } from '@/components/technical/technicalImages';
import { useAppState } from '@/state/AppStateProvider';
import { colors, radius, spacing } from '@/theme/tokens';
import type { SelectOption } from '@/domain/calculators/types';

type Mode = 'bocht' | 'knik';

const modeOptions: SelectOption[] = [
  { label: 'Bocht (90°)', value: 'bocht', description: 'Buitenlengte van een bocht op 90° en 45°' },
  { label: 'Knik (vrije hoek)', value: 'knik', description: 'Buitenlengte van een knik op een zelfgekozen hoek' },
];

const toNumber = (value: string) => {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const format = (value: number, decimals = 2) =>
  new Intl.NumberFormat('nl-BE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);

// Buitenlengte van de bocht/knik: (Radius + Diameter/2) × π × hoek / 180.
// Klopt met de Excel-bron: 90° → ×π/2 (1,57), 45° → ×π/4.
const outerLength = (radiusMm: number, diameterMm: number, angleDeg: number) =>
  (radiusMm + diameterMm / 2) * Math.PI * (angleDeg / 180);

type CalcResult = { primary: ResultRow; secondary: ResultRow[] } | null;

export function BochtKnikCalculator() {
  const { addHistory } = useAppState();
  const [mode, setMode] = useState<Mode>('bocht');
  const [radius, setRadius] = useState('');
  const [diameter, setDiameter] = useState('');
  const [angle, setAngle] = useState('45');

  const result = useMemo<CalcResult>(() => {
    const radiusMm = toNumber(radius);
    const diameterMm = toNumber(diameter);
    if (!radiusMm || !diameterMm) return null;

    if (mode === 'bocht') {
      return {
        primary: { label: 'Buitenlengte 90°', value: `${format(outerLength(radiusMm, diameterMm, 90))} mm` },
        secondary: [
          { label: 'Buitenlengte 45°', value: `${format(outerLength(radiusMm, diameterMm, 45))} mm` },
        ],
      };
    }

    const angleDeg = toNumber(angle);
    if (!angleDeg) return null;

    return {
      primary: {
        label: `Buitenlengte ${format(angleDeg, 0)}°`,
        value: `${format(outerLength(radiusMm, diameterMm, angleDeg))} mm`,
      },
      secondary: [],
    };
  }, [mode, radius, diameter, angle]);

  const reset = () => {
    setRadius('');
    setDiameter('');
    setAngle('45');
  };

  const save = () => {
    if (!result) {
      Alert.alert('Nog geen resultaat', 'Vul eerst radius en diameter in.');
      return;
    }

    addHistory({
      calculatorId: 'bocht_lengte',
      calculatorTitle: mode === 'bocht' ? 'Bocht - buitenlengte' : 'Knik - buitenlengte',
      inputs: {
        type: mode,
        radiusMm: toNumber(radius),
        diameterMm: toNumber(diameter),
        ...(mode === 'knik' ? { hoekGraden: toNumber(angle) } : {}),
      },
      primaryResult: `${result.primary.value} — ${result.primary.label}`,
    });

    Alert.alert('Opgeslagen', 'De berekening staat in Geschiedenis.');
  };

  return (
    <Screen contentContainerStyle={styles.screenContent}>
      <View style={styles.header}>
        <Text style={styles.category}>BOCHTEN</Text>
        <Text style={styles.title}>Bocht / knik - buitenlengte</Text>
        <Text style={styles.description}>
          Buitenlengte van de beplating op basis van radius en diameter. Kies een bocht (90°/45°) of
          een knik met een vrije hoek.
        </Text>
      </View>

      <SelectInput
        label="Type"
        value={mode}
        options={modeOptions}
        onChange={(value) => setMode(value as Mode)}
      />

      {mode === 'bocht' ? (
        <TechnicalImageCard
          source={technicalImages.bends.bend90}
          title="Bocht met radius"
          caption="R = hartlijnradius · Ø D = buitendiameter geïsoleerd. Uitkomst is de buitenlengte van de mantel."
        />
      ) : (
        <TechnicalImageCard
          source={technicalImages.bends.kink}
          title="Knik / verstekbocht"
          caption="R = hartlijnradius · Ø D = buitendiameter geïsoleerd · hoek naar keuze (bv. 45°)."
        />
      )}

      <Text style={styles.sectionTitle}>Maten</Text>
      <NumericInput label="Radius" unit="mm" value={radius} onChange={setRadius} placeholder="600" step={10} />
      <NumericInput
        label="Diameter"
        unit="mm"
        value={diameter}
        onChange={setDiameter}
        placeholder="300"
        step={10}
      />
      {mode === 'knik' ? (
        <NumericInput label="Hoek" unit="°" value={angle} onChange={setAngle} placeholder="45" step={5} />
      ) : null}

      <ResultCard primary={result?.primary ?? null} secondary={result?.secondary ?? []} />

      <Text style={styles.note}>
        Buitenlengte = (radius + diameter / 2) × π × hoek / 180. Zonder overlap of snijverlies.
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={reset}>
          <MaterialCommunityIcons name="refresh" size={20} color={colors.primary} />
          <Text style={styles.secondaryButtonText}>Reset</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={save}>
          <MaterialCommunityIcons name="content-save-outline" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>Opslaan</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: { paddingTop: spacing.sm },
  header: { marginBottom: spacing.md },
  category: { color: colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 28, fontWeight: '900', marginTop: 4 },
  description: { color: colors.textMuted, fontSize: 14, lineHeight: 20, marginTop: 5 },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  note: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  primaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: { color: colors.white, fontWeight: '900' },
  secondaryButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: { color: colors.primary, fontWeight: '900' },
});
