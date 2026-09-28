import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { NumericInput } from '@/components/NumericInput';
import { SelectInput } from '@/components/SelectInput';
import { ResultCard, type ResultRow } from '@/components/ResultCard';
import { InsulationSketch, PipeSketch, PlateSketch } from '@/components/technical/CalculatorSketches';
import {
  customMaterial,
  insulationMaterials,
  insulationThicknessesMm,
  metalMaterials,
  plateThicknessesMm,
  type MaterialDefinition,
} from '@/domain/materials/catalog';
import { useAppState } from '@/state/AppStateProvider';
import { colors, radius, spacing } from '@/theme/tokens';
import type { SelectOption } from '@/domain/calculators/types';

type Geometry = 'plate' | 'insulation-pipe' | 'insulation-flat' | 'cladding-pipe';

const geometryOptions: SelectOption[] = [
  { label: 'Metaalplaat', value: 'plate', description: 'Vlakke plaat: lengte × breedte × dikte' },
  { label: 'Isolatie rond leiding', value: 'insulation-pipe', description: 'Exact ringvolume rond een leiding' },
  { label: 'Vlakke isolatie', value: 'insulation-flat', description: 'Plaat/deken: lengte × breedte × dikte' },
  { label: 'Beplating rond leiding', value: 'cladding-pipe', description: 'Mantel rond geïsoleerde leiding' },
];

const toOptions = (materials: MaterialDefinition[]): SelectOption[] =>
  [...materials, customMaterial].map((material) => ({
    label: material.label,
    value: material.id,
    description: material.description,
  }));

const metalOptions = toOptions(metalMaterials);
const insulationOptions = toOptions(insulationMaterials);
const plateThicknessOptions: SelectOption[] = plateThicknessesMm.map((value) => ({
  label: `${String(value).replace('.', ',')} mm`,
  value: String(value),
}));
const insulationThicknessOptions: SelectOption[] = insulationThicknessesMm.map((value) => ({
  label: `${value} mm`,
  value: String(value),
}));

const toNumber = (value: string) => {
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
};

const format = (value: number, decimals = 3) =>
  new Intl.NumberFormat('nl-BE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);

export function MaterialWeightCalculator() {
  const { addHistory } = useAppState();
  const [geometry, setGeometry] = useState<Geometry>('plate');
  const [materialId, setMaterialId] = useState('aluminium');
  const [customDensity, setCustomDensity] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [thickness, setThickness] = useState('1');

  const usesInsulation = geometry === 'insulation-pipe' || geometry === 'insulation-flat';
  const materialList = usesInsulation ? insulationMaterials : metalMaterials;
  const materialOptions = usesInsulation ? insulationOptions : metalOptions;
  const thicknessOptions = usesInsulation ? insulationThicknessOptions : plateThicknessOptions;

  const selectedMaterial = materialList.find((item) => item.id === materialId);
  const densityKgM3 = materialId === 'custom' ? toNumber(customDensity) : selectedMaterial?.densityKgM3 ?? 0;

  const calculation = useMemo(() => {
    const lengthMm = toNumber(length);
    const widthMm = toNumber(width);
    const diameterMm = toNumber(diameter);
    const thicknessMm = toNumber(thickness);

    if (!lengthMm || !thicknessMm || !densityKgM3) return null;

    if (geometry === 'plate' || geometry === 'insulation-flat') {
      if (!widthMm) return null;
      const areaM2 = (lengthMm * widthMm) / 1_000_000;
      const volumeM3 = areaM2 * (thicknessMm / 1000);
      return {
        areaM2,
        volumeM3,
        weightKg: volumeM3 * densityKgM3,
      };
    }

    if (!diameterMm) return null;

    if (geometry === 'cladding-pipe') {
      const areaM2 = Math.PI * (diameterMm / 1000) * (lengthMm / 1000);
      const volumeM3 = areaM2 * (thicknessMm / 1000);
      return {
        areaM2,
        volumeM3,
        weightKg: volumeM3 * densityKgM3,
      };
    }

    const innerRadiusM = diameterMm / 2000;
    const outerRadiusM = innerRadiusM + thicknessMm / 1000;
    const lengthM = lengthMm / 1000;
    const outerAreaM2 = 2 * Math.PI * outerRadiusM * lengthM;
    const volumeM3 = Math.PI * (outerRadiusM ** 2 - innerRadiusM ** 2) * lengthM;

    return {
      areaM2: outerAreaM2,
      volumeM3,
      weightKg: volumeM3 * densityKgM3,
      outsideDiameterMm: diameterMm + 2 * thicknessMm,
    };
  }, [densityKgM3, diameter, geometry, length, thickness, width]);

  const resultRows: ResultRow[] = calculation
    ? [
        ...(calculation.outsideDiameterMm
          ? [{ label: 'Buitendiameter', value: `${format(calculation.outsideDiameterMm, 1)} mm` }]
          : []),
        { label: 'Oppervlakte', value: `${format(calculation.areaM2)} m²` },
        { label: 'Volume', value: `${format(calculation.volumeM3, 5)} m³` },
      ]
    : [];

  const primary = calculation
    ? { label: 'Theoretisch gewicht', value: `${format(calculation.weightKg, 2)} kg` }
    : null;

  const resetForGeometry = (next: string) => {
    const typed = next as Geometry;
    setGeometry(typed);
    const nextUsesInsulation = typed === 'insulation-pipe' || typed === 'insulation-flat';
    setMaterialId(nextUsesInsulation ? 'prorox-ps960' : 'aluminium');
    setCustomDensity('');
    setLength('');
    setWidth('');
    setDiameter('');
    setThickness(nextUsesInsulation ? '50' : '1');
  };

  const save = () => {
    if (!calculation || !primary) {
      Alert.alert('Nog geen resultaat', 'Vul eerst alle benodigde maten in.');
      return;
    }

    addHistory({
      calculatorId: 'materiaal_gewicht',
      calculatorTitle: 'Materiaalgewicht',
      inputs: {
        geometry,
        material: materialId,
        densityKgM3,
        lengthMm: toNumber(length),
        widthMm: toNumber(width),
        diameterMm: toNumber(diameter),
        thicknessMm: toNumber(thickness),
      },
      primaryResult: `${primary.value} — ${primary.label}`,
    });

    Alert.alert('Opgeslagen', 'De berekening staat in Geschiedenis.');
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.category}>MATERIAAL</Text>
        <Text style={styles.title}>Materiaalgewicht</Text>
        <Text style={styles.description}>
          Eén calculator voor metaalplaat, isolatie en beplating. Materiaalkeuze vult de densiteit automatisch in.
        </Text>
      </View>

      <SelectInput label="Toepassing" value={geometry} options={geometryOptions} onChange={resetForGeometry} />

      {geometry === 'plate' || geometry === 'insulation-flat' ? <PlateSketch /> : null}
      {geometry === 'insulation-pipe' ? <InsulationSketch /> : null}
      {geometry === 'cladding-pipe' ? <PipeSketch insulated /> : null}

      <Text style={styles.sectionTitle}>Materiaal</Text>
      <SelectInput
        label={usesInsulation ? 'Isolatiemateriaal' : 'Materiaal'}
        value={materialId}
        options={materialOptions}
        onChange={setMaterialId}
      />

      {materialId === 'custom' ? (
        <NumericInput
          label="Densiteit"
          unit="kg/m³"
          value={customDensity}
          onChange={setCustomDensity}
          placeholder="bijv. 120"
          step={1}
        />
      ) : (
        <View style={styles.densityCard}>
          <Text style={styles.densityLabel}>Densiteit</Text>
          <Text style={styles.densityValue}>{format(densityKgM3, 1)} kg/m³</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Maten</Text>
      <NumericInput label="Lengte" unit="mm" value={length} onChange={setLength} placeholder="1000" step={100} />

      {geometry === 'plate' || geometry === 'insulation-flat' ? (
        <NumericInput label="Breedte" unit="mm" value={width} onChange={setWidth} placeholder="1000" step={100} />
      ) : (
        <NumericInput
          label={geometry === 'insulation-pipe' ? 'Buitendiameter leiding kaal' : 'Buitendiameter over isolatie'}
          unit="mm"
          value={diameter}
          onChange={setDiameter}
          placeholder="300"
          step={10}
        />
      )}

      <SelectInput
        label={usesInsulation ? 'Isolatiedikte' : 'Plaatdikte'}
        value={thickness}
        options={thicknessOptions}
        onChange={setThickness}
      />

      <ResultCard primary={primary} secondary={resultRows} />

      <Text style={styles.note}>
        Theoretisch gewicht zonder overlap, snijverlies, bevestigingsmiddelen of vochttoeslag. Voor isolatie rond een leiding wordt het exacte ringvolume gebruikt.
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={() => resetForGeometry(geometry)}>
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
    marginBottom: spacing.lg,
  },
  category: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 1.1 },
  title: { color: colors.text, fontSize: 27, fontWeight: '900', marginTop: spacing.sm },
  description: { color: colors.textMuted, fontSize: 15, lineHeight: 21, marginTop: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 19, fontWeight: '900', marginTop: spacing.md, marginBottom: spacing.md },
  densityCard: {
    minHeight: 64,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  densityLabel: { color: colors.textMuted, fontWeight: '700' },
  densityValue: { color: colors.primary, fontSize: 18, fontWeight: '900' },
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
