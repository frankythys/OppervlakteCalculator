import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '@/theme/tokens';
import type { MaterialKind, StoredMaterial } from '@/storage/materialStorage';

type Props = {
  visible: boolean;
  initialKind: MaterialKind;
  materials: StoredMaterial[];
  onClose: () => void;
  onSave: (material: StoredMaterial) => void;
  onDelete: (id: string) => void;
};

export function MaterialLibraryModal({
  visible,
  initialKind,
  materials,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const insets = useSafeAreaInsets();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [kind, setKind] = useState<MaterialKind>(initialKind);
  const [density, setDensity] = useState('');

  useEffect(() => {
    if (!visible) return;
    setKind(initialKind);
  }, [initialKind, visible]);

  const sorted = useMemo(
    () => [...materials].sort((a, b) => a.name.localeCompare(b.name, 'nl-BE')),
    [materials]
  );

  const resetEditor = (nextKind: MaterialKind = initialKind) => {
    setEditingId(null);
    setName('');
    setKind(nextKind);
    setDensity('');
  };

  const startEdit = (material: StoredMaterial) => {
    setEditingId(material.id);
    setName(material.name);
    setKind(material.kind);
    setDensity(String(material.densityKgM3).replace('.', ','));
  };

  const save = () => {
    const densityKgM3 = Number(density.replace(',', '.'));
    const trimmedName = name.trim();

    if (!trimmedName) {
      Alert.alert('Naam ontbreekt', 'Geef het materiaal een naam.');
      return;
    }
    if (!Number.isFinite(densityKgM3) || densityKgM3 <= 0) {
      Alert.alert('Densiteit ongeldig', 'Geef een densiteit groter dan 0 kg/m³ in.');
      return;
    }

    onSave({
      id: editingId ?? `custom-${Date.now()}`,
      name: trimmedName,
      kind,
      densityKgM3,
    });
    resetEditor(kind);
  };

  const confirmDelete = (material: StoredMaterial) => {
    Alert.alert(
      'Materiaal verwijderen',
      `Wil je “${material.name}” verwijderen?`,
      [
        { text: 'Annuleren', style: 'cancel' },
        {
          text: 'Verwijderen',
          style: 'destructive',
          onPress: () => {
            onDelete(material.id);
            if (editingId === material.id) resetEditor(material.kind);
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>MATERIAALBIBLIOTHEEK</Text>
              <Text style={styles.title}>Eigen materialen</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10}>
              <MaterialCommunityIcons name="close" size={26} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
            {sorted.length > 0 ? (
              <View style={styles.savedList}>
                {sorted.map((material) => (
                  <View key={material.id} style={styles.savedRow}>
                    <View style={styles.savedText}>
                      <Text style={styles.savedName}>{material.name}</Text>
                      <Text style={styles.savedMeta}>
                        {material.kind === 'metal' ? 'Metaal' : 'Isolatie'} ·{' '}
                        {new Intl.NumberFormat('nl-BE', { maximumFractionDigits: 1 }).format(
                          material.densityKgM3
                        )}{' '}
                        kg/m³
                      </Text>
                    </View>
                    <Pressable style={styles.iconButton} onPress={() => startEdit(material)}>
                      <MaterialCommunityIcons name="pencil-outline" size={20} color={colors.primary} />
                    </Pressable>
                    <Pressable style={styles.iconButton} onPress={() => confirmDelete(material)}>
                      <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.danger} />
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.empty}>Nog geen eigen materialen opgeslagen.</Text>
            )}

            <View style={styles.editorCard}>
              <Text style={styles.editorTitle}>{editingId ? 'Materiaal bewerken' : 'Materiaal toevoegen'}</Text>

              <Text style={styles.label}>Type</Text>
              <View style={styles.segmentRow}>
                {(['metal', 'insulation'] as MaterialKind[]).map((option) => {
                  const active = kind === option;
                  return (
                    <Pressable
                      key={option}
                      style={[styles.segment, active && styles.segmentActive]}
                      onPress={() => setKind(option)}
                    >
                      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
                        {option === 'metal' ? 'Metaal' : 'Isolatie'}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.label}>Naam</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Bijv. PIR 35 kg/m³"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
              />

              <Text style={styles.label}>Densiteit</Text>
              <View style={styles.densityInputWrap}>
                <TextInput
                  value={density}
                  onChangeText={setDensity}
                  placeholder="35"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="decimal-pad"
                  style={styles.densityInput}
                />
                <Text style={styles.unit}>kg/m³</Text>
              </View>

              <View style={styles.editorActions}>
                {editingId ? (
                  <Pressable style={styles.secondaryButton} onPress={() => resetEditor(kind)}>
                    <Text style={styles.secondaryButtonText}>Annuleren</Text>
                  </Pressable>
                ) : null}
                <Pressable style={styles.primaryButton} onPress={save}>
                  <MaterialCommunityIcons name="content-save-outline" size={19} color={colors.white} />
                  <Text style={styles.primaryButtonText}>{editingId ? 'Wijzigen' : 'Opslaan'}</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(10,24,39,0.42)' },
  sheet: {
    maxHeight: '88%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 22, fontWeight: '900', marginTop: 3 },
  content: { padding: spacing.md },
  savedList: { gap: spacing.xs },
  savedRow: {
    minHeight: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedText: { flex: 1, paddingVertical: spacing.sm },
  savedName: { color: colors.text, fontSize: 15, fontWeight: '800' },
  savedMeta: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  iconButton: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  empty: { color: colors.textMuted, marginBottom: spacing.md },
  editorCard: {
    marginTop: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    backgroundColor: colors.bg,
  },
  editorTitle: { color: colors.text, fontSize: 18, fontWeight: '900', marginBottom: spacing.md },
  label: { color: colors.text, fontSize: 13, fontWeight: '800', marginBottom: spacing.xs, marginTop: spacing.sm },
  segmentRow: { flexDirection: 'row', gap: spacing.sm },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  segmentActive: { borderColor: colors.accent, backgroundColor: '#F2F7FF' },
  segmentText: { color: colors.textMuted, fontWeight: '800' },
  segmentTextActive: { color: colors.accent },
  input: {
    minHeight: 50,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  densityInputWrap: {
    minHeight: 50,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  densityInput: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '800' },
  unit: { color: colors.textMuted, fontWeight: '700' },
  editorActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  primaryButton: {
    flex: 1,
    minHeight: 48,
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
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  secondaryButtonText: { color: colors.primary, fontWeight: '900' },
});
