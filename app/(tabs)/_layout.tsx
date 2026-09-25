import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';

import {
  TabList,
  TabSlot,
  TabTrigger,
  Tabs,
} from 'expo-router/ui';

import { BlurTargetView, BlurView } from 'expo-blur';
import { usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCart } from '../../context/CartContext';
import { color, radius, space, tabBarBottomGap, text } from '../../theme/tokens';

const TAB_PADDING = 8;
const BORDER_WIDTH = 1;
const PILL_GAP = 3;

export default function TabsLayout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { cart } = useCart();

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const [tabBarWidth, setTabBarWidth] = useState(0);

  const activeIndex =
    pathname === '/ai'
      ? 1
      : pathname === '/cart'
        ? 2
        : 0;

  const availableWidth =
    tabBarWidth - TAB_PADDING * 2 - BORDER_WIDTH * 2;

  const slotWidth =
    availableWidth > 0
      ? availableWidth / 3
      : 0;

  const pillWidth =
    slotWidth > 0
      ? slotWidth - PILL_GAP * 2
      : 0;

  const translateX = useRef(
    new Animated.Value(0)
  ).current;

  /**
   * On Android, expo-blur only blurs what lives inside a BlurTargetView and
   * only when the target ref is passed to the BlurView.
   */
  const blurTargetRef = useRef<View | null>(null);
  const androidBlurProps =
    Platform.OS === 'android'
      ? {
          blurTarget: blurTargetRef,
          blurMethod: 'dimezisBlurViewSdk31Plus' as const,
        }
      : {};

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * slotWidth,

      useNativeDriver: Platform.OS !== 'web',

      friction: 8,
      tension: 70,
    }).start();
  }, [activeIndex, slotWidth, translateX]);

  const isActive = (index: number) => activeIndex === index;

  return (
    <Tabs>
      <BlurTargetView ref={blurTargetRef} style={styles.blurTarget}>
        <TabSlot />
      </BlurTargetView>

      <TabList
        style={[
          styles.tabList,
          { bottom: tabBarBottomGap(insets.bottom) },
        ]}
        onLayout={(event) => {
          setTabBarWidth(
            event.nativeEvent.layout.width
          );
        }}
      >
        <BlurView
          intensity={45}
          tint="light"
          style={StyleSheet.absoluteFill}
          {...androidBlurProps}
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
          accessibilityLabel="Главная"
          accessibilityState={{ selected: isActive(0) }}
        >
          <Text
            style={[
              styles.tabText,
              isActive(0) && styles.activeTabText,
            ]}
          >
            Главная
          </Text>
        </TabTrigger>

        <TabTrigger
          name="ai"
          href="/ai"
          style={styles.tabTrigger}
          accessibilityLabel="AI-шеф"
          accessibilityState={{ selected: isActive(1) }}
        >
          <Text
            style={[
              styles.tabText,
              isActive(1) && styles.activeTabText,
            ]}
          >
            AI-шеф
          </Text>
        </TabTrigger>

        <TabTrigger
          name="cart"
          href="/cart"
          style={styles.tabTrigger}
          accessibilityLabel={
            totalItems > 0
              ? `Корзина, товаров: ${totalItems}`
              : 'Корзина, пусто'
          }
          accessibilityState={{ selected: isActive(2) }}
        >
          <View style={styles.cartLabel}>
            <Text
              style={[
                styles.tabText,
                isActive(2) && styles.activeTabText,
              ]}
            >
              Корзина
            </Text>

            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {totalItems > 99 ? '99+' : totalItems}
                </Text>
              </View>
            )}
          </View>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  blurTarget: {
    flex: 1,
  },

  tabList: {
    position: 'absolute',

    left: 20,
    right: 20,

    flexDirection: 'row',

    padding: TAB_PADDING,

    borderRadius: radius.pill,

    borderWidth: BORDER_WIDTH,
    borderColor: 'rgba(15, 23, 42, 0.08)',

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

    borderRadius: radius.pill,

    backgroundColor: color.accentTint,
    borderWidth: 1,
    borderColor: color.accentTintBorder,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 2,

    zIndex: 1,
  },

  tabText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: color.textSecondary,
  },

  activeTabText: {
    fontWeight: '700',
    color: color.accent,
  },

  cartLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },

  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: space.xs,
    borderRadius: radius.pill,
    backgroundColor: color.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: color.onAccent,
    fontSize: 11,
    fontWeight: '700',
  },
});
