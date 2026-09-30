import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme/tokens';

type Measurable = {
  measureInWindow: (callback: (x: number, y: number, width: number, height: number) => void) => void;
};

const ScrollToInputContext = createContext<(input: Measurable | null) => void>(() => {});
export function useScrollToInput() {
  return useContext(ScrollToInputContext);
}

// Meet-gebaseerde keyboard-avoidance die werkt op de New Architecture (Fabric)
// én met edge-to-edge: bij focus meten we het veld en scrollen we het net
// boven het toetsenbord.
export function useKeyboardAwareScroll() {
  const scrollRef = useRef<ScrollView>(null);
  const scrollY = useRef(0);
  const focused = useRef<Measurable | null>(null);
  const keyboard = useRef(0);
  const keyboardTopRef = useRef(Number.POSITIVE_INFINITY);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const ensureVisible = useCallback(() => {
    const input = focused.current;
    const keyboardTop = keyboardTopRef.current;
    if (!input || !Number.isFinite(keyboardTop)) return;
    input.measureInWindow((_x, y, _w, h) => {
      const margin = 56;
      const inputBottom = y + h;
      if (inputBottom > keyboardTop - margin) {
        const delta = inputBottom - (keyboardTop - margin);
        scrollRef.current?.scrollTo({ y: scrollY.current + delta, animated: true });
      }
    });
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (event) => {
      const { screenY, height } = event.endCoordinates;
      // Echte bovenkant van het toetsenbord; val terug op de berekening als screenY ontbreekt.
      keyboardTopRef.current = screenY > 0 ? screenY : Dimensions.get('window').height - height;
      keyboard.current = height;
      setKeyboardHeight(height);
      requestAnimationFrame(ensureVisible);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      keyboardTopRef.current = Number.POSITIVE_INFINITY;
      keyboard.current = 0;
      setKeyboardHeight(0);
      focused.current = null;
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, [ensureVisible]);

  const scrollToInput = useCallback(
    (input: Measurable | null) => {
      focused.current = input;
      if (keyboard.current > 0) ensureVisible();
    },
    [ensureVisible]
  );

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = event.nativeEvent.contentOffset.y;
  }, []);

  return { scrollRef, keyboardHeight, scrollToInput, onScroll };
}

type Props = React.ComponentProps<typeof ScrollView> & {
  children: React.ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll = true, contentContainerStyle, ...props }: Props) {
  const { scrollRef, keyboardHeight, scrollToInput, onScroll } = useKeyboardAwareScroll();

  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollToInputContext.Provider value={scrollToInput}>
          <View style={[styles.content, { paddingBottom: spacing.md + keyboardHeight }]}>
            {children}
          </View>
        </ScrollToInputContext.Provider>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        {...props}
        ref={scrollRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          contentContainerStyle,
          { paddingBottom: spacing.lg + keyboardHeight },
        ]}
      >
        <ScrollToInputContext.Provider value={scrollToInput}>{children}</ScrollToInputContext.Provider>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { flex: 1, padding: spacing.md },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },
});
