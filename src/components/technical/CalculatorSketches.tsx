import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/theme/tokens';
import { DimensionArrow, SketchCard, SketchLabel, SketchLine } from './SketchPrimitives';

export function PipeSketch({ insulated = false }: { insulated?: boolean }) {
  return (
    <SketchCard title={insulated ? 'Leiding met isolatie' : 'Leiding'}>
      <View style={styles.pipeBody} />
      <View style={styles.pipeEnd} />
      {insulated ? <View style={styles.pipeInsulation} /> : null}
      <DimensionArrow left={68} top={176} width={190} label="L = lengte" />
      <DimensionArrow left={258} top={61} width={96} label="Ø D" vertical />
      {insulated ? <SketchLabel text="t = isolatiedikte" left={166} top={34} emphasis /> : null}
      <SketchLine left={205} top={53} width={54} angle={24} />
    </SketchCard>
  );
}

export function ConeSketch() {
  return (
    <SketchCard title="Conus / verloop">
      <SketchLine left={82} top={55} width={158} />
      <SketchLine left={52} top={156} width={218} />
      <SketchLine left={82} top={56} width={106} angle={106} />
      <SketchLine left={240} top={56} width={106} angle={74} />
      <DimensionArrow left={88} top={24} width={144} label="Ø D1 = klein" />
      <DimensionArrow left={58} top={174} width={206} label="Ø D2 = groot" />
      <DimensionArrow left={278} top={55} width={102} label="H" vertical />
    </SketchCard>
  );
}

export function RoundValveSketch() {
  return (
    <SketchCard title="Ronde afsluiter / flenskap">
      <View style={styles.roundFlangeOuter} />
      <View style={styles.roundFlangeInner} />
      <View style={styles.valveStem} />
      <DimensionArrow left={74} top={166} width={178} label="B = totale maat" />
      <DimensionArrow left={258} top={55} width={104} label="Ø D" vertical />
      <SketchLabel text="flenskap" left={116} top={102} emphasis />
    </SketchCard>
  );
}

export function OvalSketch() {
  return (
    <SketchCard title="Ovale flenskap / afsluiter">
      <View style={styles.ovalOuter} />
      <View style={styles.ovalInner} />
      <DimensionArrow left={65} top={170} width={205} label="A = totale maat" />
      <DimensionArrow left={278} top={67} width={86} label="C / Ø" vertical />
      <SketchLabel text="rechte middenzone" left={109} top={103} />
    </SketchCard>
  );
}

export function RectangularHoodSketch() {
  return (
    <SketchCard title="Rechthoekige kap">
      <View style={styles.boxFront} />
      <SketchLine left={82} top={72} width={58} angle={-30} />
      <SketchLine left={222} top={72} width={58} angle={-30} />
      <SketchLine left={222} top={154} width={58} angle={-30} />
      <SketchLine left={280} top={43} width={82} angle={90} />
      <SketchLine left={140} top={43} width={140} />
      <SketchLine left={280} top={43} width={140} angle={90} />
      <DimensionArrow left={86} top={174} width={132} label="A = breedte" />
      <DimensionArrow left={290} top={66} width={86} label="H = hoogte" vertical />
      <SketchLabel text="B = diepte" left={225} top={24} emphasis />
    </SketchCard>
  );
}

export function PlateSketch() {
  return (
    <SketchCard title="Plaatmateriaal">
      <View style={styles.plate} />
      <SketchLine left={74} top={74} width={60} angle={-28} />
      <SketchLine left={242} top={74} width={60} angle={-28} />
      <SketchLine left={74} top={146} width={60} angle={-28} />
      <DimensionArrow left={78} top={169} width={164} label="L = lengte" />
      <DimensionArrow left={252} top={73} width={74} label="B = breedte" vertical />
      <SketchLabel text="t = plaatdikte" left={204} top={38} emphasis />
    </SketchCard>
  );
}

export function InsulationSketch() {
  return (
    <SketchCard title="Isolatie rond leiding">
      <View style={styles.isoOuter} />
      <View style={styles.isoInner} />
      <DimensionArrow left={91} top={169} width={150} label="L = lengte" />
      <DimensionArrow left={255} top={51} width={112} label="Ø / R" vertical />
      <SketchLabel text="t = isolatiedikte" left={165} top={44} emphasis />
      <SketchLine left={202} top={65} width={53} angle={22} />
      <SketchLabel text="ρ = densiteit" left={110} top={113} />
    </SketchCard>
  );
}

export function CladdingSketch() {
  return (
    <SketchCard title="Beplating rond geïsoleerde leiding">
      <View style={styles.claddingOuter} />
      <View style={styles.claddingInner} />
      <DimensionArrow left={72} top={174} width={190} label="L = lengte" />
      <DimensionArrow left={270} top={55} width={108} label="Ø leiding" vertical />
      <SketchLabel text="t iso" left={181} top={42} emphasis />
      <SketchLabel text="plaat rond buitenzijde" left={94} top={112} />
    </SketchCard>
  );
}

export function BendSketch() {
  return (
    <SketchCard title="Bocht">
      <View style={styles.bendOuter} />
      <View style={styles.bendInnerMask} />
      <SketchLine left={95} top={153} width={95} dashed />
      <SketchLine left={188} top={62} width={92} angle={90} dashed />
      <SketchLabel text="R = radius" left={105} top={128} emphasis />
      <SketchLabel text="Ø D" left={226} top={76} emphasis />
    </SketchCard>
  );
}

export function CircleSketch() {
  return (
    <SketchCard title="Cirkel">
      <View style={styles.circle} />
      <DimensionArrow left={86} top={173} width={160} label="Ø D = diameter" />
      <SketchLine left={86} top={128} width={160} dashed />
    </SketchCard>
  );
}

export function SphereSketch({ half = false }: { half?: boolean }) {
  return (
    <SketchCard title={half ? 'Bolkop' : 'Bol'}>
      <View style={half ? styles.halfSphere : styles.sphere} />
      <SketchLine left={165} top={50} width={76} angle={90} dashed />
      <SketchLabel text="R = straal" left={174} top={98} emphasis />
      <SketchLabel text="t = isolatiedikte" left={93} top={44} />
    </SketchCard>
  );
}

export function TrapeziumSketch() {
  return (
    <SketchCard title="Trapezium">
      <SketchLine left={105} top={62} width={120} />
      <SketchLine left={66} top={156} width={200} />
      <SketchLine left={105} top={62} width={102} angle={112} />
      <SketchLine left={225} top={62} width={102} angle={68} />
      <DimensionArrow left={107} top={29} width={116} label="A" />
      <DimensionArrow left={69} top={173} width={194} label="B" />
      <DimensionArrow left={275} top={62} width={94} label="H" vertical />
    </SketchCard>
  );
}

const styles = StyleSheet.create({
  pipeBody: {
    position: 'absolute', left: 72, top: 78, width: 180, height: 70,
    borderWidth: 2, borderColor: colors.primary, backgroundColor: '#DCE6F0',
  },
  pipeEnd: {
    position: 'absolute', left: 225, top: 78, width: 54, height: 70,
    borderRadius: 35, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#EDF2F7',
  },
  pipeInsulation: {
    position: 'absolute', left: 57, top: 63, width: 220, height: 100,
    borderRadius: 50, borderWidth: 2, borderColor: colors.accent, backgroundColor: 'transparent',
  },
  roundFlangeOuter: {
    position: 'absolute', left: 91, top: 48, width: 148, height: 110,
    borderRadius: 60, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#DFE8F1',
  },
  roundFlangeInner: {
    position: 'absolute', left: 119, top: 68, width: 92, height: 70,
    borderRadius: 40, borderWidth: 2, borderColor: colors.accent, backgroundColor: colors.surfaceMuted,
  },
  valveStem: {
    position: 'absolute', left: 156, top: 22, width: 18, height: 42,
    borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CBD8E5',
  },
  ovalOuter: {
    position: 'absolute', left: 65, top: 64, width: 205, height: 92,
    borderRadius: 46, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#DFE8F1',
  },
  ovalInner: {
    position: 'absolute', left: 98, top: 82, width: 139, height: 56,
    borderRadius: 28, borderWidth: 2, borderColor: colors.accent, backgroundColor: colors.surfaceMuted,
  },
  boxFront: {
    position: 'absolute', left: 82, top: 72, width: 140, height: 82,
    borderWidth: 2, borderColor: colors.primary, backgroundColor: '#DCE6F0',
  },
  plate: {
    position: 'absolute', left: 74, top: 74, width: 168, height: 72,
    borderWidth: 2, borderColor: colors.primary, backgroundColor: '#D8E2EC',
  },
  isoOuter: {
    position: 'absolute', left: 90, top: 57, width: 150, height: 105,
    borderRadius: 55, borderWidth: 3, borderColor: colors.accent, backgroundColor: '#EAF2FC',
  },
  isoInner: {
    position: 'absolute', left: 116, top: 76, width: 98, height: 67,
    borderRadius: 36, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CFDBE7',
  },
  claddingOuter: {
    position: 'absolute', left: 75, top: 61, width: 185, height: 103,
    borderRadius: 52, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#E1E8EF',
  },
  claddingInner: {
    position: 'absolute', left: 104, top: 80, width: 127, height: 65,
    borderRadius: 34, borderWidth: 3, borderColor: colors.accent, backgroundColor: colors.surfaceMuted,
  },
  bendOuter: {
    position: 'absolute', left: 90, top: 54, width: 160, height: 108,
    borderTopWidth: 28, borderRightWidth: 28, borderColor: colors.primary,
    borderTopRightRadius: 100, backgroundColor: 'transparent',
  },
  bendInnerMask: {
    position: 'absolute', left: 118, top: 82, width: 103, height: 80,
    borderTopWidth: 2, borderRightWidth: 2, borderColor: colors.accent,
    borderTopRightRadius: 68, backgroundColor: colors.surfaceMuted,
  },
  circle: {
    position: 'absolute', left: 86, top: 48, width: 160, height: 160,
    borderRadius: 80, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#E3EBF3',
  },
  sphere: {
    position: 'absolute', left: 91, top: 38, width: 150, height: 150,
    borderRadius: 75, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#E3EBF3',
  },
  halfSphere: {
    position: 'absolute', left: 91, top: 74, width: 150, height: 76,
    borderTopLeftRadius: 75, borderTopRightRadius: 75,
    borderWidth: 3, borderBottomWidth: 2, borderColor: colors.primary, backgroundColor: '#E3EBF3',
  },
});
