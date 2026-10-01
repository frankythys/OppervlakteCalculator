import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Screen } from '@/components/Screen';
import { NumericInput } from '@/components/NumericInput';
import { SelectInput } from '@/components/SelectInput';
import { ResultCard, type ResultRow } from '@/components/ResultCard';
import { TechnicalSketch } from '@/components/technical/TechnicalSketch';
import { useAppState } from '@/state/AppStateProvider';
import { formatScalar, parseNumericInput } from '@/utils/format';
import { colors, radius, spacing } from '@/theme/tokens';
import type { CalcDefinition, Vars } from '@/domain/calculators/definitions';

export function DefinitionScreen({ def }: { def: CalcDefinition }) {
  const navigation = useNavigation();
  const { isFavorite, toggleFavorite, addHistory } = useAppState();

  const emptyInputs = () =>
    Object.fromEntries(def.inputs.map((input) => [input.key, input.defaultValue ?? '']));

  const [rawInputs, setRawInputs] = useState<Record<string, string>>(emptyInputs);
  const [mode, setMode] = useState<string>(def.modes?.[0]?.value ?? '');

  useLayoutEffect(() => {
    navigation.setOptions({ title: def.title });
  }, [def.title, navigation]);

  useEffect(() => {
    setRawInputs(emptyInputs());
    setMode(def.modes?.[0]?.value ?? '');
  }, [def.id]);

  const inMode = (modes?: string[]) => !modes || modes.includes(mode);
  const visibleInputs = def.inputs.filter((input) => inMode(input.modes));
  const visibleOutputs = def.outputs.filter((output) => inMode(output.modes));

  const values = useMemo<Vars | null>(() => {
    const parsed: Vars = {};
    for (const input of visibleInputs) {
      const value = parseNumericInput(rawInputs[input.key] ?? '');
      if (value === null) {
        if (input.optional) {
          parsed[input.key] = 0;
          continue;
        }
        return null;
      }
      parsed[input.key] = value;
    }
    return parsed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def, rawInputs, mode]);

  const outputRows: ResultRow[] = useMemo(() => {
    if (!values) return [];
    return visibleOutputs.map((output) => {
      const result = output.compute(values);
      const formatted = formatScalar(result, 3);
      return {
        label: output.label,
        value: output.unit ? `${formatted} ${output.unit}` : formatted,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def, values, mode]);

  const primaryPos = visibleOutputs.findIndex((output) => output.primary);
  const primaryIndex = primaryPos >= 0 ? primaryPos : outputRows.length - 1;
  const primary = outputRows.length ? outputRows[primaryIndex] : null;
  const secondary = outputRows.filter((_, index) => index !== primaryIndex);

  const reset = () => {
    setRawInputs(emptyInputs());
    setMode(def.modes?.[0]?.value ?? '');
  };

  const save = () => {
    if (!values || !primary) {
      Alert.alert('Nog geen resultaat', 'Vul eerst alle waarden in.');
      return;
    }
    addHistory({
      calculatorId: def.id,
      calculatorTitle: def.title,
      inputs: values,
      primaryResult: `${primary.value} — ${primary.label}`,
    });
    Alert.alert('Opgeslagen', 'De berekening staat nu in Geschiedenis.');
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <Text style={styles.category}>{def.category.toUpperCase()}</Text>
          <Pressable onPress={() => toggleFavorite(def.id)} hitSlop={10}>
            <MaterialCommunityIcons
              name={isFavorite(def.id) ? 'star' : 'star-outline'}
              size={28}
              color={isFavorite(def.id) ? colors.warning : colors.primary}
            />
          </Pressable>
        </View>
        <Text style={styles.title}>{def.title}</Text>
        {def.description ? <Text style={styles.description}>{def.description}</Text> : null}
      </View>

      <TechnicalSketch calculatorId={def.id} mode={mode} />

      {def.modes && def.modes.length > 0 ? (
        <View style={styles.modeWrap}>
          <SelectInput
            label={def.modeLabel ?? 'Type'}
            value={mode}
            options={def.modes}
            onChange={setMode}
          />
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Invoer</Text>
      {visibleInputs.map((input) => {
        if (input.options) {
          return (
            <SelectInput
              key={input.key}
              label={input.label}
              value={rawInputs[input.key] ?? ''}
              options={input.options}
              onChange={(value) => setRawInputs((current) => ({ ...current, [input.key]: value }))}
            />
          );
        }
        return (
          <NumericInput
            key={input.key}
            label={input.label}
            unit={input.unit}
            placeholder={input.placeholder}
            step={input.step}
            value={rawInputs[input.key] ?? ''}
            onChange={(value) => setRawInputs((current) => ({ ...current, [input.key]: value }))}
          />
        );
      })}

      <ResultCard primary={primary} secondary={secondary} />

      {def.resultHint ? <Text style={styles.hint}>{def.resultHint}</Text> : null}

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
  modeWrap: { marginTop: spacing.lg },
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
});
