import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '@/theme/tokens';

type LineProps = {
  left: number;
  top: number;
  width: number;
  angle?: number;
  dashed?: boolean;
  thickness?: number;
};

export function SketchLine({ left, top, width, angle = 0, dashed = false, thickness = 2 }: LineProps) {
  return (
    <View
      style={[
        styles.line,
        {
          left,
          top,
          width,
          height: thickness,
          borderStyle: dashed ? 'dashed' : 'solid',
          transform: [{ rotate: `${angle}deg` }],
        },
      ]}
    />
  );
}

type LabelProps = {
  text: string;
  left: number;
  top: number;
  emphasis?: boolean;
};

export function SketchLabel({ text, left, top, emphasis = false }: LabelProps) {
  return (
    <View style={[styles.label, { left, top }, emphasis && styles.labelEmphasis]}>
      <Text style={[styles.labelText, emphasis && styles.labelTextEmphasis]}>{text}</Text>
    </View>
  );
}

type ArrowProps = {
  left: number;
  top: number;
  width: number;
  label: string;
  vertical?: boolean;
};

export function DimensionArrow({ left, top, width, label, vertical = false }: ArrowProps) {
  if (vertical) {
    return (
      <View style={[styles.verticalDimension, { left, top, height: width }]}>
        <View style={styles.verticalLine} />
        <View style={[styles.arrowHead, styles.arrowTop]} />
        <View style={[styles.arrowHead, styles.arrowBottom]} />
        <SketchLabel text={label} left={10} top={Math.max(0, width / 2 - 13)} emphasis />
      </View>
    );
  }

  return (
    <View style={[styles.horizontalDimension, { left, top, width }]}>
      <View style={styles.horizontalLine} />
      <View style={[styles.arrowHead, styles.arrowLeft]} />
      <View style={[styles.arrowHead, styles.arrowRight]} />
      <View style={styles.horizontalLabelWrap}>
        <Text style={styles.dimensionText}>{label}</Text>
      </View>
    </View>
  );
}

export function SketchCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>MAATVOERING</Text>
        <Text style={styles.cardHint}>{title}</Text>
      </View>
      <View style={styles.canvas}>{children}</View>
      <Text style={styles.footer}>Schematische weergave — maten volgens invoervelden</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  cardHint: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  canvas: {
    height: 220,
    marginHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    position: 'relative',
    overflow: 'hidden',
  },
  footer: {
    color: colors.textMuted,
    fontSize: 11,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  line: {
    position: 'absolute',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    transformOrigin: 'left center',
  },
  label: {
    position: 'absolute',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 20,
  },
  labelEmphasis: {
    borderColor: colors.accent,
    backgroundColor: '#F2F7FF',
  },
  labelText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '700',
  },
  labelTextEmphasis: {
    color: colors.accent,
    fontWeight: '900',
  },
  horizontalDimension: {
    position: 'absolute',
    height: 26,
    justifyContent: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 12,
    height: 1,
    backgroundColor: colors.accent,
  },
  horizontalLabelWrap: {
    alignSelf: 'center',
    paddingHorizontal: 6,
    backgroundColor: colors.surfaceMuted,
  },
  verticalDimension: {
    position: 'absolute',
    width: 45,
  },
  verticalLine: {
    position: 'absolute',
    left: 5,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.accent,
  },
  dimensionText: {
    color: colors.accent,
    fontWeight: '900',
    fontSize: 11,
  },
  arrowHead: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderColor: colors.accent,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  arrowLeft: { left: 0, top: 8, transform: [{ rotate: '-45deg' }] },
  arrowRight: { right: 0, top: 8, transform: [{ rotate: '135deg' }] },
  arrowTop: { left: 1, top: 0, transform: [{ rotate: '45deg' }] },
  arrowBottom: { left: 1, bottom: 0, transform: [{ rotate: '-135deg' }] },
});
