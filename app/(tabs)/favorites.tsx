import React from 'react';
import { Text } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { EmptyState } from '@/components/EmptyState';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators } from '@/domain/calculators/publicRepository';
import { useAppState } from '@/state/AppStateProvider';
import { colors } from '@/theme/tokens';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useAppState();
  const items = calculators.filter((calculator) => favorites.includes(calculator.id));

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 30, fontWeight: '900' }}>Favorieten</Text>
      <Text style={{ color: colors.textMuted, marginTop: 5, marginBottom: 22 }}>
        Je meest gebruikte calculators altijd bij de hand.
      </Text>

      {items.length === 0 ? (
        <EmptyState
          title="Nog geen favorieten"
          text="Tik op de ster bij een calculator om hem hier toe te voegen."
        />
      ) : (
        items.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            title={calculator.title}
            category={calculator.category}
            favorite
            onToggleFavorite={() => toggleFavorite(calculator.id)}
            onPress={() => router.push(`/calculator/${calculator.id}`)}
          />
        ))
      )}
    </Screen>
  );
}
