import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useScrollToInput } from '@/components/Screen';
import { colors, radius, spacing } from '@/theme/tokens';

type Props = {
  label: string;
  unit?: string;
  value: string;
  placeholder?: string;
  step?: number;
  onChange: (value: string) => void;
};

export function NumericInput({
  label,
  unit,
  value,
  placeholder,
  step = 1,
  onChange,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const scrollToInput = useScrollToInput();

  const nudge = (direction: 1 | -1) => {
    const numeric = Number(value.replace(',', '.')) || 0;
    const next = Math.max(0, numeric + step * direction);
    onChange(String(next));
  };

  const handleFocus = () => {
    if (inputRef.current) scrollToInput(inputRef.current);
  };

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Pressable style={styles.stepButton} onPress={() => nudge(-1)}>
          <MaterialCommunityIcons name="minus" size={20} color={colors.primary} />
        </Pressable>

        <View style={styles.inputWrap}>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChange}
            onFocus={handleFocus}
            placeholder={placeholder ?? '0'}
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
            style={styles.input}
            selectTextOnFocus
          />
          {unit ? <Text style={styles.unit}>{unit}</Text> : null}
        </View>

        <Pressable style={styles.stepButton} onPress={() => nudge(1)}>
          <MaterialCommunityIcons name="plus" size={20} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: spacing.md },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  row: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  stepButton: {
    width: 46,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  input: { flex: 1, color: colors.text, fontSize: 18, fontWeight: '700' },
  unit: { color: colors.textMuted, fontWeight: '700', marginLeft: spacing.sm },
});
