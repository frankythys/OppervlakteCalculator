import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Screen } from '@/components/Screen';
import { NumericInput } from '@/components/NumericInput';
import { ResultCard, type ResultRow } from '@/components/ResultCard';
import { calculateCalculator } from '@/domain/calculators/engine';
import { getCalculatorById } from '@/domain/calculators/repository';
import {
  getCalculatorMeta,
  getOutputPresentation,
  getSafeInputLabel,
} from '@/domain/calculators/uiMeta';
import { useAppState } from '@/state/AppStateProvider';
import { formatScalar, parseNumericInput } from '@/utils/format';
import { colors, radius, spacing } from '@/theme/tokens';
import type { Values } from '@/domain/calculators/types';

export default function CalculatorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const calculator = getCalculatorById(id ?? '');
  const meta = getCalculatorMeta(id ?? '');
  const { isFavorite, toggleFavorite, addHistory } = useAppState();

  const [rawInputs, setRawInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Values | null>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({ title: calculator?.title ?? 'Calculator' });
  }, [calculator?.title, navigation]);

  useEffect(() => {
    if (!calculator) return;
    setRawInputs(Object.fromEntries(calculator.inputs.map((input) => [input.id, ''])));
    setResults(null);
    setError(null);
  }, [calculator]);

  const parsedInputs = useMemo(() => {
    if (!calculator) return null;

    const values: Record<string, number> = {};
    for (const input of calculator.inputs) {
      const parsed = parseNumericInput(rawInputs[input.id] ?? '');
      if (parsed === null) return null;
      values[input.id] = parsed;
    }
    return values;
  }, [calculator, rawInputs]);

  useEffect(() => {
    if (!calculator || !parsedInputs || calculator.state !== 'ready') {
      setResults(null);
      return;
    }

    try {
      const next = calculateCalculator(calculator, parsedInputs);
      setResults(next);
      setError(null);
    } catch (e) {
      setResults(null);
      setError(e instanceof Error ? e.message : 'Berekening mislukt.');
    }
  }, [calculator, parsedInputs]);

  if (!calculator) {
    return (
      <Screen>
        <Text style={styles.title}>Calculator niet gevonden</Text>
      </Screen>
    );
  }

  const outputRows: ResultRow[] = results
    ? calculator.outputs
        .filter((output) => output.formula_id in results)
        .map((output) => {
          const presentation = getOutputPresentation(
            calculator.id,
            output.formula_id,
            output.label
          );
          const formatted = formatScalar(results[output.formula_id], 3);

          return {
            label: presentation.label,
            value: presentation.unit ? `${formatted} ${presentation.unit}` : formatted,
          };
        })
    : [];

  const primary = outputRows.at(-1) ?? null;
  const secondary = outputRows.slice(0, -1);

  const saveCalculation = () => {
    if (!parsedInputs || !primary) {
      Alert.alert('Nog geen resultaat', 'Vul eerst alle verplichte waarden in.');
      return;
    }

    addHistory({
      calculatorId: calculator.id,
      calculatorTitle: calculator.title,
      inputs: parsedInputs,
      primaryResult: `${primary.value} — ${primary.label}`,
    });

    Alert.alert('Opgeslagen', 'De berekening staat nu in Geschiedenis.');
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <Text style={styles.category}>{calculator.category.toUpperCase()}</Text>
          <Pressable onPress={() => toggleFavorite(calculator.id)} hitSlop={10}>
            <MaterialCommunityIcons
              name={isFavorite(calculator.id) ? 'star' : 'star-outline'}
              size={28}
              color={isFavorite(calculator.id) ? colors.warning : colors.primary}
            />
          </Pressable>
        </View>

        <Text style={styles.title}>{calculator.title}</Text>
        <Text style={styles.description}>{meta.description}</Text>
      </View>

      {calculator.state !== 'ready' ? (
        <View style={styles.warning}>
          <MaterialCommunityIcons name="alert-outline" size={22} color={colors.warning} />
          <Text style={styles.warningText}>
            Deze calculator vereist nog aanvullende tabelgegevens en is daarom nog niet actief.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Invoer</Text>

          {calculator.inputs.map((input, index) => {
            const inputMeta = meta.inputs?.[input.id];
            return (
              <NumericInput
                key={input.id}
                label={getSafeInputLabel(calculator.id, input.id, index)}
                unit={inputMeta?.unit ?? (input.unit === 'auto' ? undefined : input.unit)}
                placeholder={inputMeta?.placeholder}
                step={inputMeta?.step}
                value={rawInputs[input.id] ?? ''}
                onChange={(value) =>
                  setRawInputs((current) => ({
                    ...current,
                    [input.id]: value,
                  }))
                }
              />
            );
          })}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <ResultCard primary={primary} secondary={secondary} />

          {meta.resultHint ? <Text style={styles.hint}>{meta.resultHint}</Text> : null}

          <View style={styles.actions}>
            <Pressable
              style={styles.secondaryButton}
              onPress={() => {
                setRawInputs(Object.fromEntries(calculator.inputs.map((input) => [input.id, ''])));
                setResults(null);
                setError(null);
              }}
            >
              <MaterialCommunityIcons name="refresh" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Reset</Text>
            </Pressable>

            <Pressable style={styles.primaryButton} onPress={saveCalculation}>
              <MaterialCommunityIcons name="content-save-outline" size={20} color={colors.white} />
              <Text style={styles.primaryButtonText}>Opslaan</Text>
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Hoe wordt dit berekend?</Text>
            <Text style={styles.infoText}>
              De technische bronformules worden intern gebruikt. Excel-celreferenties zijn nooit
              zichtbaar als invoerveld of resultaatlabel.
            </Text>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 27, fontWeight: '900', marginTop: spacing.sm },
  description: { color: colors.textMuted, fontSize: 15, lineHeight: 21, marginTop: spacing.sm },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  warning: {
    marginTop: spacing.lg,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: '#FFF7E8',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  warningText: { flex: 1, color: colors.text, lineHeight: 20 },
  error: { color: colors.danger, marginTop: -4, marginBottom: spacing.sm },
  hint: { color: colors.textMuted, fontSize: 12, lineHeight: 18, marginTop: spacing.sm },
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
  infoCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  infoTitle: { color: colors.primary, fontWeight: '900' },
  infoText: { color: colors.textMuted, lineHeight: 20, marginTop: 5 },
});
