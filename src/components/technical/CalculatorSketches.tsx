import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/theme/tokens';
import { DimensionArrow, SketchCard, SketchLabel, SketchLine } from './SketchPrimitives';

export function PipeSketch({ insulated = false }: { insulated?: boolean }) {
  return (
    <SketchCard title={insulated ? 'Leiding met isolatie' : 'Leiding'}>
      <View style={[styles.pipeCrossOuter, insulated && styles.pipeCrossInsulation]} />
      {insulated ? <View style={styles.pipeCrossInner} /> : null}
      <SketchLine left={66} top={86} width={104} dashed />
      <SketchLabel text={insulated ? 'Ø leiding kaal' : 'Ø leiding'} left={65} top={100} />
      {insulated ? (
        <>
          <SketchLine left={118} top={86} width={45} angle={-42} />
          <SketchLabel text="t = isolatiedikte" left={145} top={42} emphasis />
        </>
      ) : null}

      <View style={[styles.pipeSide, insulated && styles.pipeSideInsulated]} />
      {insulated ? <View style={styles.pipeSideInner} /> : null}
      <DimensionArrow left={196} top={158} width={108} label="L = lengte" />
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
      <DimensionArrow left={252} top={55} width={102} label="H" vertical />
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
      <DimensionArrow left={236} top={55} width={104} label="Ø D" vertical />
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
      <DimensionArrow left={248} top={67} width={86} label="C / Ø" vertical />
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
      <DimensionArrow left={244} top={66} width={86} label="H" vertical />
      <SketchLabel text="B = diepte" left={210} top={24} emphasis />
    </SketchCard>
  );
}

export function PlateSketch() {
  return (
    <SketchCard title="Vlakke plaat">
      <View style={styles.plateFront} />
      <DimensionArrow left={58} top={154} width={174} label="L = lengte" />
      <DimensionArrow left={238} top={48} width={92} label="B" vertical />
      <SketchLabel text="B = breedte" left={172} top={83} />

      <View style={styles.plateSideView} />
      <SketchLabel text="t = dikte" left={54} top={21} emphasis />
      <SketchLine left={101} top={41} width={36} angle={18} />
    </SketchCard>
  );
}

export function InsulationSketch() {
  return (
    <SketchCard title="Isolatie rond leiding">
      <View style={styles.isoCircleOuter} />
      <View style={styles.isoCircleInner} />
      <SketchLine left={66} top={86} width={116} dashed />
      <SketchLabel text="Ø leiding kaal" left={68} top={102} />
      <SketchLine left={124} top={86} width={47} angle={-43} />
      <SketchLabel text="t = isolatiedikte" left={151} top={40} emphasis />

      <View style={styles.isoSideOuter} />
      <View style={styles.isoSideInner} />
      <DimensionArrow left={194} top={158} width={110} label="L = lengte" />
    </SketchCard>
  );
}

export function CladdingSketch() {
  return (
    <SketchCard title="Beplating rond leiding">
      <View style={styles.claddingCircleOuter} />
      <View style={styles.claddingCircleInner} />
      <SketchLine left={68} top={86} width={112} dashed />
      <SketchLabel text="Ø over isolatie" left={67} top={102} />
      <SketchLine left={124} top={86} width={46} angle={-42} />
      <SketchLabel text="t = plaatdikte" left={150} top={40} emphasis />

      <View style={styles.claddingSide} />
      <DimensionArrow left={194} top={158} width={110} label="L = lengte" />
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
      <SketchLine left={86} top={107} width={160} dashed />
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
      <DimensionArrow left={242} top={62} width={94} label="H" vertical />
    </SketchCard>
  );
}

const styles = StyleSheet.create({
  pipeCrossOuter: {
    position: 'absolute', left: 68, top: 34, width: 104, height: 104,
    borderRadius: 52, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#D8E2EC',
  },
  pipeCrossInsulation: {
    borderColor: colors.accent,
    backgroundColor: '#EAF2FC',
  },
  pipeCrossInner: {
    position: 'absolute', left: 87, top: 53, width: 66, height: 66,
    borderRadius: 33, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CFDBE7',
  },
  pipeSide: {
    position: 'absolute', left: 198, top: 61, width: 104, height: 50,
    borderRadius: 25, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#D8E2EC',
  },
  pipeSideInsulated: {
    height: 66, top: 53, borderRadius: 33, borderColor: colors.accent, backgroundColor: '#EAF2FC',
  },
  pipeSideInner: {
    position: 'absolute', left: 198, top: 68, width: 104, height: 36,
    borderRadius: 18, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CFDBE7',
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
  plateFront: {
    position: 'absolute', left: 58, top: 48, width: 174, height: 92,
    borderWidth: 2, borderColor: colors.primary, backgroundColor: '#D8E2EC',
  },
  plateSideView: {
    position: 'absolute', left: 58, top: 39, width: 80, height: 7,
    borderWidth: 2, borderColor: colors.primary, backgroundColor: '#BFCEDF',
  },
  isoCircleOuter: {
    position: 'absolute', left: 66, top: 28, width: 116, height: 116,
    borderRadius: 58, borderWidth: 4, borderColor: colors.accent, backgroundColor: '#EAF2FC',
  },
  isoCircleInner: {
    position: 'absolute', left: 88, top: 50, width: 72, height: 72,
    borderRadius: 36, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CFDBE7',
  },
  isoSideOuter: {
    position: 'absolute', left: 196, top: 55, width: 108, height: 62,
    borderRadius: 31, borderWidth: 3, borderColor: colors.accent, backgroundColor: '#EAF2FC',
  },
  isoSideInner: {
    position: 'absolute', left: 196, top: 69, width: 108, height: 34,
    borderRadius: 17, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CFDBE7',
  },
  claddingCircleOuter: {
    position: 'absolute', left: 68, top: 30, width: 112, height: 112,
    borderRadius: 56, borderWidth: 4, borderColor: colors.accent, backgroundColor: '#F3F6FA',
  },
  claddingCircleInner: {
    position: 'absolute', left: 80, top: 42, width: 88, height: 88,
    borderRadius: 44, borderWidth: 2, borderColor: colors.primary, backgroundColor: '#CFDBE7',
  },
  claddingSide: {
    position: 'absolute', left: 196, top: 58, width: 108, height: 56,
    borderRadius: 28, borderWidth: 3, borderColor: colors.accent, backgroundColor: '#F3F6FA',
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
    position: 'absolute', left: 86, top: 28, width: 150, height: 150,
    borderRadius: 75, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#E3EBF3',
  },
  sphere: {
    position: 'absolute', left: 91, top: 30, width: 145, height: 145,
    borderRadius: 73, borderWidth: 3, borderColor: colors.primary, backgroundColor: '#E3EBF3',
  },
  halfSphere: {
    position: 'absolute', left: 91, top: 65, width: 145, height: 74,
    borderTopLeftRadius: 73, borderTopRightRadius: 73,
    borderWidth: 3, borderBottomWidth: 2, borderColor: colors.primary, backgroundColor: '#E3EBF3',
  },
});
