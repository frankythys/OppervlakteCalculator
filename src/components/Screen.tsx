import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
} from 'react-native';
import { useSegments } from 'expo-router';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme/tokens';

type Props = ScrollViewProps & {
  children: React.ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll = true, contentContainerStyle, ...props }: Props) {
  const segments = useSegments();
  const isTabScreen = segments[0] === '(tabs)';
  const edges: Edge[] = isTabScreen
    ? ['top', 'left', 'right']
    : ['top', 'left', 'right', 'bottom'];

  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={edges}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoider}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.content}>{children}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          {...props}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
          scrollsChildToFocus={Platform.OS === 'android'}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  keyboardAvoider: { flex: 1 },
  content: { flex: 1, padding: spacing.md },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});
