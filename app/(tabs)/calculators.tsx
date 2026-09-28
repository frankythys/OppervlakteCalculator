import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators, categories, searchCalculators } from '@/domain/calculators/repository';
import { useAppState } from '@/state/AppStateProvider';
import { colors, spacing } from '@/theme/tokens';

export default function CalculatorsScreen() {
  const [query, setQuery] = useState('');
  const { isFavorite, toggleFavorite } = useAppState();
  const results = useMemo(() => searchCalculators(query), [query]);

  return (
    <Screen>
      <Text style={styles.title}>Calculators</Text>
      <Text style={styles.subtitle}>
        {calculators.length} technische calculators, gegroepeerd per toepassing.
      </Text>

      <View style={styles.search}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      {query ? (
        <View style={styles.list}>
          {results.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              title={calculator.title}
              category={calculator.category}
              favorite={isFavorite(calculator.id)}
              onToggleFavorite={() => toggleFavorite(calculator.id)}
              onPress={() => router.push(`/calculator/${calculator.id}`)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.grid}>
          {categories.map((category) => (
            <View style={styles.gridItem} key={category}>
              <CategoryCard
                title={category}
                count={calculators.filter((c) => c.category === category).length}
                onPress={() =>
                  router.push({
                    pathname: '/category/[category]',
                    params: { category },
                  })
                }
              />
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.textMuted, marginTop: 5 },
  search: { marginVertical: spacing.lg },
  list: { marginTop: spacing.xs },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  gridItem: { width: '50%', padding: 5 },
});
