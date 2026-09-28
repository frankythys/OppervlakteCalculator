import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/theme/tokens';
import type { SelectOption } from '@/domain/calculators/types';

type Props = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export function SelectInput({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => options.find((option) => option.value === value), [options, value]);

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <View style={styles.fieldTextWrap}>
          <Text style={[styles.value, !selected && styles.placeholder]} numberOfLines={1}>
            {selected?.label ?? 'Selecteer...'}
          </Text>
          {selected?.description ? (
            <Text style={styles.description} numberOfLines={1}>{selected.description}</Text>
          ) : null}
        </View>
        <MaterialCommunityIcons name="chevron-down" size={24} color={colors.primary} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => undefined}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <Pressable onPress={() => setOpen(false)} hitSlop={10}>
                <MaterialCommunityIcons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.options}>
              {options.map((option) => {
                const active = option.value === value;
                return (
                  <Pressable
                    key={`${option.value}-${option.label}`}
                    style={[styles.option, active && styles.optionActive]}
                    onPress={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <View style={styles.optionTextWrap}>
                      <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                        {option.label}
                      </Text>
                      {option.description ? (
                        <Text style={styles.optionDescription}>{option.description}</Text>
                      ) : null}
                    </View>
                    {active ? (
                      <MaterialCommunityIcons name="check-circle" size={22} color={colors.accent} />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: spacing.md },
  label: { color: colors.text, fontSize: 14, fontWeight: '700', marginBottom: spacing.xs },
  field: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldTextWrap: { flex: 1, paddingRight: spacing.sm },
  value: { color: colors.text, fontSize: 16, fontWeight: '800' },
  placeholder: { color: colors.textMuted, fontWeight: '600' },
  description: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10,24,39,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '70%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingBottom: spacing.lg,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sheetTitle: { color: colors.text, fontSize: 18, fontWeight: '900' },
  options: { padding: spacing.sm },
  option: {
    minHeight: 58,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
    backgroundColor: colors.surfaceMuted,
  },
  optionActive: { borderWidth: 1, borderColor: colors.accent, backgroundColor: '#F2F7FF' },
  optionTextWrap: { flex: 1, paddingRight: spacing.sm },
  optionLabel: { color: colors.text, fontSize: 15, fontWeight: '800' },
  optionLabelActive: { color: colors.accent },
  optionDescription: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
});
