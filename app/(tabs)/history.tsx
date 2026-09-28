import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '@/components/Screen';
import { EmptyState } from '@/components/EmptyState';
import { useAppState } from '@/state/AppStateProvider';
import { colors, radius, spacing } from '@/theme/tokens';

export default function HistoryScreen() {
  const { history, clearHistory } = useAppState();

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Geschiedenis</Text>
          <Text style={styles.subtitle}>Je laatst uitgevoerde berekeningen.</Text>
        </View>
        {history.length ? (
          <Pressable onPress={clearHistory}>
            <Text style={styles.clear}>Wissen</Text>
          </Pressable>
        ) : null}
      </View>

      {history.length === 0 ? (
        <EmptyState
          title="Nog geen berekeningen"
          text="Een opgeslagen berekening verschijnt hier automatisch."
        />
      ) : (
        <View style={styles.list}>
          {history.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => router.push(`/calculator/${item.calculatorId}`)}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.calculatorTitle}</Text>
                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString('nl-BE')}
                </Text>
              </View>
              <Text style={styles.result}>{item.primaryResult}</Text>
              <Text style={styles.hint}>Tik om calculator opnieuw te openen</Text>
            </Pressable>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { color: colors.text, fontSize: 30, fontWeight: '900' },
  subtitle: { color: colors.textMuted, marginTop: 5 },
  clear: { color: colors.danger, fontWeight: '800', paddingTop: 8 },
  list: { marginTop: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  cardTitle: { color: colors.text, fontWeight: '800', flex: 1 },
  date: { color: colors.textMuted, fontSize: 12 },
  result: { color: colors.primary, fontSize: 22, fontWeight: '900', marginTop: spacing.sm },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 5 },
});
