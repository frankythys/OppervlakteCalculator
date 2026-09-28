import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { CategoryCard } from '@/components/CategoryCard';
import { CalculatorCard } from '@/components/CalculatorCard';
import { calculators, categories, searchCalculators } from '@/domain/calculators/repository';
import { useAppState } from '@/state/AppStateProvider';
import { colors, spacing } from '@/theme/tokens';

const QUICK_IDS = [
  'leiding_met_isolatie',
  'bocht_oppervlakte',
  'flenskap_met_deksels',
  'rechthoekige_afsluiterkap',
  'plaat_gewicht',
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const { favorites, isFavorite, toggleFavorite, history } = useAppState();

  const quick = QUICK_IDS.map((id) => calculators.find((c) => c.id === id)).filter(Boolean);
  const results = useMemo(() => searchCalculators(query).slice(0, 8), [query]);

  return (
    <Screen>
      <Text style={styles.kicker}>WERFCALCULATOR</Text>
      <Text style={styles.title}>Oppervlakte Calculator</Text>
      <Text style={styles.subtitle}>Snel technische berekeningen uitvoeren zonder Excel.</Text>

      <View style={styles.search}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      {query ? (
        <>
          <SectionHeader title="Zoekresultaten" />
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
        </>
      ) : (
        <>
          <SectionHeader title="Snel berekenen" />
          {quick.map((calculator) =>
            calculator ? (
              <CalculatorCard
                key={calculator.id}
                title={calculator.title}
                category={calculator.category}
                favorite={isFavorite(calculator.id)}
                onToggleFavorite={() => toggleFavorite(calculator.id)}
                onPress={() => router.push(`/calculator/${calculator.id}`)}
              />
            ) : null
          )}

          <SectionHeader
            title="Categorieën"
            action={
              <Pressable onPress={() => router.push('/calculators')}>
                <Text style={styles.link}>Alles bekijken</Text>
              </Pressable>
            }
          />
          <View style={styles.grid}>
            {categories.slice(0, 6).map((category) => (
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

          <SectionHeader title="Jouw app" />
          <View style={styles.stats}>
            <View>
              <Text style={styles.statValue}>{history.length}</Text>
              <Text style={styles.statLabel}>berekeningen</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{favorites.length}</Text>
              <Text style={styles.statLabel}>favorieten</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{calculators.length}</Text>
              <Text style={styles.statLabel}>calculators</Text>
            </View>
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { color: colors.accent, fontSize: 12, fontWeight: '900', letterSpacing: 1.4 },
  title: { color: colors.text, fontSize: 30, fontWeight: '900', marginTop: 4 },
  subtitle: { color: colors.textMuted, fontSize: 15, lineHeight: 21, marginTop: 6 },
  search: { marginTop: spacing.lg },
  link: { color: colors.accent, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  gridItem: { width: '50%', padding: 5 },
  stats: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statValue: { color: colors.primary, fontSize: 25, fontWeight: '900' },
  statLabel: { color: colors.textMuted, marginTop: 2, fontSize: 12 },
});
