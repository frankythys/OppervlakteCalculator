import React, { useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Screen } from '@/components/Screen';
import { CalculatorCard } from '@/components/CalculatorCard';
import { getCalculatorsByCategory } from '@/domain/calculators/publicRepository';
import { useAppState } from '@/state/AppStateProvider';
import { colors } from '@/theme/tokens';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const navigation = useNavigation();
  const decodedCategory = decodeURIComponent(category ?? '');
  const items = getCalculatorsByCategory(decodedCategory);
  const { isFavorite, toggleFavorite } = useAppState();

  useLayoutEffect(() => {
    navigation.setOptions({ title: decodedCategory });
  }, [decodedCategory, navigation]);

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '900', marginBottom: 18 }}>
        {decodedCategory}
      </Text>

      {items.map((calculator) => (
        <CalculatorCard
          key={calculator.id}
          title={calculator.title}
          category={calculator.category}
          favorite={isFavorite(calculator.id)}
          onToggleFavorite={() => toggleFavorite(calculator.id)}
          onPress={() => router.push(`/calculator/${calculator.id}`)}
        />
      ))}
    </Screen>
  );
}
