import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { NumericInput } from '@/components/NumericInput';
import { SelectInput } from '@/components/SelectInput';
import { ResultCard, type ResultRow } from '@/components/ResultCard';
import { MaterialLibraryModal } from '@/components/materials/MaterialLibraryModal';
import { PlateSketch } from '@/components/technical/CalculatorSketches';
import { TechnicalImageCard } from '@/components/technical/TechnicalImageCard';
import {
  insulationMaterials,
  insulationThicknessesMm,
  metalMaterials,
  plateThicknessesMm,
  type MaterialDefinition,
} from '@/domain/materials/catalog';
import { useAppState } from '@/state/AppStateProvider';
import {
  materialStorage,
  type MaterialKind,
  type StoredMaterial,
} from '@/storage/materialStorage';
import { colors, radius, spacing } from '@/theme/tokens';
import type { SelectOption } from '@/domain/calculators/types';

type Geometry = 'plate' | 'insulation-pipe' | 'insulation-flat' | 'cladding-pipe';

type MaterialCalculation = {
  areaM2: number;
  volumeM3: number;
  weightKg: number;
  outsideDiameterMm?: number;
};

const RAW_BASE = 'https://raw.githubusercontent.com/frankythys/OppervlakteCalculator/main/assets/technical';
const INSULATED_PIPE_IMAGE = { uri: `${RAW_BASE}/insulated-pipe.jpg` };
const CLAD_PIPE_IMAGE = { uri: `${RAW_BASE}/clad-insulated-pipe.jpg` };
const MANAGE_MATERIALS_ID = '__manage_materials__';

const geometryOptions: SelectOption[] = [
  { label: 'Metaalplaat', value: 'plate', description: 'Vlakke plaat: lengte × breedte × dikte' },
  { label: 'Isolatie rond leiding', value: 'insulation-pipe', description: 'Exact ringvolume rond een ronde leiding' },
  { label: 'Vlakke isolatie', value: 'insulation-flat', description: 'Plaat/deken: lengte × breedte × dikte' },
  { label: 'Beplating rond leiding', value: 'cladding-pipe', description: 'Mantel rond de buitendiameter over isolatie' },
];

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

const builtinOptions = (materials: MaterialDefinition[]): SelectOption[] =>
  materials.map((material) => ({
    label: material.label,
    value: material.id,
    description: material.description,
  }));

export function MaterialWeightCalculator() {
  const { addHistory } = useAppState();
  const [geometry, setGeometry] = useState<Geometry>('plate');
  const [materialId, setMaterialId] = useState('aluminium');
  const [customMaterials, setCustomMaterials] = useState<StoredMaterial[]>([]);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [thickness, setThickness] = useState('1');

  useEffect(() => {
    void materialStorage.load().then(setCustomMaterials);
  }, []);

  const usesInsulation = geometry === 'insulation-pipe' || geometry === 'insulation-flat';
  const materialKind: MaterialKind = usesInsulation ? 'insulation' : 'metal';
  const builtinMaterials = usesInsulation ? insulationMaterials : metalMaterials;
  const customForKind = customMaterials.filter((material) => material.kind === materialKind);
  const thicknessOptions = usesInsulation ? insulationThicknessOptions : plateThicknessOptions;

  const materialOptions = useMemo<SelectOption[]>(
    () => [
      ...builtinOptions(builtinMaterials),
      ...customForKind.map((material) => ({
        label: material.name,
        value: material.id,
        description: `${format(material.densityKgM3, 1)} kg/m³ · eigen materiaal`,
      })),
      {
        label: 'Eigen materiaal toevoegen / beheren',
        value: MANAGE_MATERIALS_ID,
        description: 'Permanent bewaren op dit toestel',
      },
    ],
    [builtinMaterials, customForKind]
  );

  const selectedBuiltin = builtinMaterials.find((item) => item.id === materialId);
  const selectedCustom = customMaterials.find((item) => item.id === materialId);
  const selectedName = selectedBuiltin?.label ?? selectedCustom?.name ?? '';
  const densityKgM3 = selectedBuiltin?.densityKgM3 ?? selectedCustom?.densityKgM3 ?? 0;

  const calculation = useMemo<MaterialCalculation | null>(() => {
    const lengthMm = toNumber(length);
    const widthMm = toNumber(width);
    const diameterMm = toNumber(diameter);
    const thicknessMm = toNumber(thickness);

    if (!lengthMm || !thicknessMm || !densityKgM3) return null;

    if (geometry === 'plate' || geometry === 'insulation-flat') {
      if (!widthMm) return null;
      const areaM2 = (lengthMm * widthMm) / 1_000_000;
      const volumeM3 = areaM2 * (thicknessMm / 1000);
      return { areaM2, volumeM3, weightKg: volumeM3 * densityKgM3 };
    }

    if (!diameterMm) return null;

    if (geometry === 'cladding-pipe') {
      const areaM2 = Math.PI * (diameterMm / 1000) * (lengthMm / 1000);
      const volumeM3 = areaM2 * (thicknessMm / 1000);
      return { areaM2, volumeM3, weightKg: volumeM3 * densityKgM3 };
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
        ...(calculation.outsideDiameterMm !== undefined
          ? [{ label: 'Buitendiameter over isolatie', value: `${format(calculation.outsideDiameterMm, 1)} mm` }]
          : []),
        { label: 'Oppervlakte', value: `${format(calculation.areaM2)} m²` },
        { label: 'Volume', value: `${format(calculation.volumeM3, 5)} m³` },
      ]
    : [];

  const primary: ResultRow | null = calculation
    ? { label: 'Theoretisch gewicht', value: `${format(calculation.weightKg, 2)} kg` }
    : null;

  const defaultMaterialFor = (kind: MaterialKind) =>
    kind === 'insulation' ? 'prorox-ps960' : 'aluminium';

  const resetForGeometry = (next: string) => {
    const typed = next as Geometry;
    const nextKind: MaterialKind =
      typed === 'insulation-pipe' || typed === 'insulation-flat' ? 'insulation' : 'metal';

    setGeometry(typed);
    setMaterialId(defaultMaterialFor(nextKind));
    setLength('');
    setWidth('');
    setDiameter('');
    setThickness(nextKind === 'insulation' ? '50' : '1');
  };

  const selectMaterial = (value: string) => {
    if (value === MANAGE_MATERIALS_ID) {
      setLibraryOpen(true);
      return;
    }
    setMaterialId(value);
  };

  const saveCustomMaterial = (material: StoredMaterial) => {
    setCustomMaterials((current) => {
      const exists = current.some((item) => item.id === material.id);
      const next = exists
        ? current.map((item) => (item.id === material.id ? material : item))
        : [...current, material];
      void materialStorage.save(next);
      return next;
    });

    if (material.kind === materialKind) setMaterialId(material.id);
    setLibraryOpen(false);
  };

  const deleteCustomMaterial = (id: string) => {
    setCustomMaterials((current) => {
      const next = current.filter((item) => item.id !== id);
      void materialStorage.save(next);
      return next;
    });
    if (materialId === id) setMaterialId(defaultMaterialFor(materialKind));
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
        toepassing: geometry,
        materiaal: selectedName || materialId,
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
    <>
      <Screen contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <Text style={styles.category}>MATERIAAL</Text>
          <Text style={styles.title}>Materiaalgewicht</Text>
          <Text style={styles.description}>
            Gewicht van plaat, isolatie en beplating op basis van materiaal, densiteit en maatvoering.
          </Text>
        </View>

        <SelectInput label="Toepassing" value={geometry} options={geometryOptions} onChange={resetForGeometry} />

        {geometry === 'plate' ? <PlateSketch /> : null}
        {geometry === 'insulation-flat' ? <PlateSketch title="Vlakke isolatie" /> : null}
        {geometry === 'insulation-pipe' ? (
          <TechnicalImageCard
            source={INSULATED_PIPE_IMAGE}
            title="Isolatie rond ronde leiding"
            caption="Ø d = leiding kaal · t = isolatiedikte · Ø D = buitendiameter geïsoleerd · L = lengte"
          />
        ) : null}
        {geometry === 'cladding-pipe' ? (
          <TechnicalImageCard
            source={CLAD_PIPE_IMAGE}
            title="Beplating rond ronde leiding"
            caption="Ø D = buitendiameter over isolatie · t plaat = plaatdikte · L = lengte"
          />
        ) : null}

        <Text style={styles.sectionTitle}>Materiaal</Text>
        <SelectInput
          label={usesInsulation ? 'Isolatiemateriaal' : 'Materiaal'}
          value={materialId}
          options={materialOptions}
          onChange={selectMaterial}
        />

        {densityKgM3 > 0 ? (
          <View style={styles.materialInfoRow}>
            <View style={styles.materialInfoText}>
              <Text style={styles.materialInfoLabel}>Densiteit</Text>
              <Text style={styles.materialInfoValue}>{format(densityKgM3, 1)} kg/m³</Text>
            </View>
            <Pressable style={styles.manageButton} onPress={() => setLibraryOpen(true)}>
              <MaterialCommunityIcons name="database-edit-outline" size={18} color={colors.primary} />
              <Text style={styles.manageButtonText}>Eigen materialen</Text>
            </Pressable>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Maten</Text>
        <NumericInput
          label="Lengte"
          unit="mm"
          value={length}
          onChange={setLength}
          placeholder="1000"
          step={100}
        />

        {geometry === 'plate' || geometry === 'insulation-flat' ? (
          <NumericInput
            label="Breedte"
            unit="mm"
            value={width}
            onChange={setWidth}
            placeholder="1000"
            step={100}
          />
        ) : (
          <NumericInput
            label={geometry === 'insulation-pipe' ? 'Diameter leiding kaal' : 'Buitendiameter over isolatie'}
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
          Theoretisch gewicht zonder overlap, snijverlies, bevestigingsmiddelen of vochttoeslag.
          Isolatie rond een leiding gebruikt het exacte ringvolume.
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

      <MaterialLibraryModal
        visible={libraryOpen}
        initialKind={materialKind}
        materials={customMaterials}
        onClose={() => setLibraryOpen(false)}
        onSave={saveCustomMaterial}
        onDelete={deleteCustomMaterial}
      />
    </>
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
  materialInfoRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginTop: -4,
    marginBottom: spacing.sm,
  },
  materialInfoText: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  materialInfoLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  materialInfoValue: { color: colors.primary, fontSize: 15, fontWeight: '900' },
  manageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 38,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  manageButtonText: { color: colors.primary, fontSize: 12, fontWeight: '800' },
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