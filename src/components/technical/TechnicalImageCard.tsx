import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { colors, radius, spacing } from '@/theme/tokens';

type Props = {
  source: ImageSourcePropType;
  title: string;
  caption?: string;
};

export function TechnicalImageCard({ source, title, caption }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MAATVOERING</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.imageWrap}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>

      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
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
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  title: {
    flexShrink: 1,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
