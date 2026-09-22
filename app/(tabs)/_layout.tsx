import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
} from 'expo-router/ui';

import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';

import { usePathname } from 'expo-router';
import { BlurView } from 'expo-blur';

const TAB_PADDING = 8;
const BORDER_WIDTH = 1;
const PILL_GAP = 3;

export default function TabsLayout() {
  const pathname = usePathname();

  const [tabBarWidth, setTabBarWidth] = useState(0);

  const activeIndex =
    pathname === '/ai'
      ? 1
      : pathname === '/cart'
        ? 2
        : 0;

  // Реальная ширина области, в которой находятся три таба.
  const availableWidth =
    tabBarWidth - TAB_PADDING * 2 - BORDER_WIDTH * 2;

  // Размер одной из трёх зон.
  const slotWidth =
    availableWidth > 0
      ? availableWidth / 3
      : 0;

  // Pill немного меньше своей зоны.
  const pillWidth =
    slotWidth > 0
      ? slotWidth - PILL_GAP * 2
      : 0;

  const translateX = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * slotWidth,

      // На телефоне используем native driver.
      // На web он иногда работает нестабильно.
      useNativeDriver: Platform.OS !== 'web',

      friction: 8,
      tension: 70,
    }).start();
  }, [activeIndex, slotWidth, translateX]);

  return (
    <Tabs>
      <TabSlot />

      <TabList
        style={styles.tabList}
        onLayout={(event) => {
          setTabBarWidth(
            event.nativeEvent.layout.width
          );
        }}
      >
        <BlurView
          intensity={70}
          tint="light"
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          pointerEvents="none"
          style={[
            styles.activePill,
            {
              width: pillWidth,
              transform: [{ translateX }],
            },
          ]}
        />

        <TabTrigger
          name="home"
          href="/"
          style={styles.tabTrigger}
        >
          <Text
            style={[
              styles.tabText,
              activeIndex === 0 &&
                styles.activeTabText,
            ]}
          >
            Главная
          </Text>
        </TabTrigger>

        <TabTrigger
          name="ai"
          href="/ai"
          style={styles.tabTrigger}
        >
          <Text
            style={[
              styles.tabText,
              activeIndex === 1 &&
                styles.activeTabText,
            ]}
          >
            AI-шеф
          </Text>
        </TabTrigger>

        <TabTrigger
          name="cart"
          href="/cart"
          style={styles.tabTrigger}
        >
          <Text
            style={[
              styles.tabText,
              activeIndex === 2 &&
                styles.activeTabText,
            ]}
          >
            Корзина
          </Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    position: 'absolute',

    left: 20,
    right: 20,
    bottom: 20,

    flexDirection: 'row',

    padding: TAB_PADDING,

    borderRadius: 32,

    borderWidth: BORDER_WIDTH,
    borderColor: 'rgba(15, 23, 42, 0.18)',

    overflow: 'hidden',
  },

  tabTrigger: {
    flex: 1,

    minHeight: 48,

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 2,
  },

  activePill: {
    position: 'absolute',

    left: TAB_PADDING + BORDER_WIDTH + PILL_GAP,
    top: TAB_PADDING,
    bottom: TAB_PADDING,

    borderRadius: 24,

    backgroundColor: 'rgba(255, 255, 255, 0.65)',

    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,

    elevation: 4,

    zIndex: 1,
  },

  tabText: {
    color: '#737373',
    fontSize: 14,
    fontWeight: '500',
  },

  activeTabText: {
    color: '#171717',
    fontWeight: '700',
  },
});