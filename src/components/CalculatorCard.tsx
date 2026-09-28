import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '@/theme/tokens';

type Props = {
  title: string;
  category: string;
  favorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
};

export function CalculatorCard({
  title,
  category,
  favorite,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="calculator-variant-outline" size={24} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      {onToggleFavorite ? (
        <Pressable
          hitSlop={12}
          onPress={(event) => {
            event.stopPropagation();
            onToggleFavorite();
          }}
        >
          <MaterialCommunityIcons
            name={favorite ? 'star' : 'star-outline'}
            size={24}
            color={favorite ? colors.warning : colors.textMuted}
          />
        </Pressable>
      ) : null}

      <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  title: { color: colors.text, fontSize: 16, fontWeight: '800' },
  category: { color: colors.textMuted, marginTop: 3 },
});
