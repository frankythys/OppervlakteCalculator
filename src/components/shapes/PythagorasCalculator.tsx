import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { NumericInput } from '@/components/NumericInput';
import { ResultCard, type ResultRow } from '@/components/ResultCard';
import { TechnicalImageCard } from '@/components/technical/TechnicalImageCard';
import { technicalImages } from '@/components/technical/technicalImages';
import { useAppState } from '@/state/AppStateProvider';
import { colors, radius, spacing } from '@/theme/tokens';

const toNumberOrNull = (value: string) => {
  const trimmed = value.replace(',', '.').trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
};

const format = (value: number, decimals = 2) =>
  new Intl.NumberFormat('nl-BE', { maximumFractionDigits: decimals }).format(value);

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

type Solved = { a: number; b: number; c: number; alpha: number; beta: number };

// a, b = rechthoekszijden · c = schuine zijde (hypotenusa)
// alpha = hoek tegenover a (tussen b en c) · beta = 90 - alpha
function solveTriangle(
  a: number | null,
  b: number | null,
  c: number | null,
  alpha: number | null
): Solved | null {
  let A = a;
  let B = b;
  let C = c;
  let AL = alpha;

  const angleOk = AL == null || (AL > 0 && AL < 90);

  if (A != null && B != null) {
    C = Math.hypot(A, B);
    AL = toDeg(Math.atan2(A, B));
  } else if (A != null && C != null) {
    if (C <= A) return null;
    B = Math.sqrt(C * C - A * A);
    AL = toDeg(Math.asin(A / C));
  } else if (B != null && C != null) {
    if (C <= B) return null;
    A = Math.sqrt(C * C - B * B);
    AL = toDeg(Math.atan2(A, B));
  } else if (A != null && AL != null && angleOk) {
    B = A / Math.tan(toRad(AL));
    C = A / Math.sin(toRad(AL));
  } else if (B != null && AL != null && angleOk) {
    A = B * Math.tan(toRad(AL));
    C = B / Math.cos(toRad(AL));
  } else if (C != null && AL != null && angleOk) {
    A = C * Math.sin(toRad(AL));
    B = C * Math.cos(toRad(AL));
  } else {
    return null;
  }

  if (A == null || B == null || C == null || AL == null) return null;
  return { a: A, b: B, c: C, alpha: AL, beta: 90 - AL };
}

export function PythagorasCalculator() {
  const { addHistory } = useAppState();
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [alpha, setAlpha] = useState('');

  const solved = useMemo(
    () => solveTriangle(toNumberOrNull(a), toNumberOrNull(b), toNumberOrNull(c), toNumberOrNull(alpha)),
    [a, b, c, alpha]
  );

  const primary: ResultRow | null = solved
    ? { label: 'Schuine zijde c', value: `${format(solved.c)} mm` }
    : null;

  const secondary: ResultRow[] = solved
    ? [
        { label: 'Rechthoekszijde a', value: `${format(solved.a)} mm` },
        { label: 'Rechthoekszijde b', value: `${format(solved.b)} mm` },
        { label: 'Hoek α (tegenover a)', value: `${format(solved.alpha, 1)} °` },
        { label: 'Hoek β (tegenover b)', value: `${format(solved.beta, 1)} °` },
      ]
    : [];

  const reset = () => {
    setA('');
    setB('');
    setC('');
    setAlpha('');
  };

  const save = () => {
    if (!solved) {
      Alert.alert('Nog geen resultaat', 'Vul twee waarden in (bv. twee zijden, of een zijde en een hoek).');
      return;
    }
    addHistory({
      calculatorId: 'pythagoras',
      calculatorTitle: 'Stelling van Pythagoras',
      inputs: { a: solved.a, b: solved.b, c: solved.c, alpha: solved.alpha, beta: solved.beta },
      primaryResult: `c = ${format(solved.c)} mm`,
    });
    Alert.alert('Opgeslagen', 'De berekening staat in Geschiedenis.');
  };

  return (
    <Screen contentContainerStyle={styles.screenContent}>
      <View style={styles.header}>
        <Text style={styles.category}>VORMEN</Text>
        <Text style={styles.title}>Stelling van Pythagoras</Text>
        <Text style={styles.description}>
          Rechthoekige driehoek: vul twee waarden in (twee zijden, of een zijde en een hoek) en de
          rest wordt berekend.
        </Text>
      </View>

      <TechnicalImageCard
        source={technicalImages.shapes.pythagoras}
        title="Rechthoekige driehoek"
        caption="a en b = rechthoekszijden · c = schuine zijde · c² = a² + b². Hoek α ligt tegenover a."
      />

      <Text style={styles.sectionTitle}>Invoer — vul 2 waarden in</Text>
      <NumericInput label="Rechthoekszijde a" unit="mm" value={a} onChange={setA} />
      <NumericInput label="Rechthoekszijde b" unit="mm" value={b} onChange={setB} />
      <NumericInput label="Schuine zijde c" unit="mm" value={c} onChange={setC} />
      <NumericInput label="Hoek α (tegenover a)" unit="°" value={alpha} onChange={setAlpha} />

      <ResultCard primary={primary} secondary={secondary} />

      <Text style={styles.note}>
        c² = a² + b². Geef precies twee waarden; combinaties als a+b, zijde+schuine zijde of
        zijde+hoek worden ondersteund.
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
