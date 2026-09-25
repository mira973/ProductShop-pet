import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  color,
  minTouchTarget,
  radius,
  space,
  tabularNums,
  text,
} from '../theme/tokens';

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  /** True when the cart already holds as many units as the stock allows. */
  maxReached?: boolean;
};

const buttonSize =
  Platform.OS === 'android' ? minTouchTarget.android : minTouchTarget.ios;

/**
 * One quantity stepper for the product page and the cart, so the same control
 * cannot drift into two different tap sizes.
 */
export function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  maxReached = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrease}
        accessibilityRole="button"
        accessibilityLabel="Уменьшить количество"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.symbol}>−</Text>
      </Pressable>

      <Text
        style={styles.quantity}
        accessibilityLabel={`Количество: ${quantity}`}
      >
        {quantity}
      </Text>

      <Pressable
        onPress={onIncrease}
        disabled={maxReached}
        accessibilityRole="button"
        accessibilityLabel="Увеличить количество"
        accessibilityState={{ disabled: maxReached }}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          maxReached && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceSunken,
  },

  button: {
    width: buttonSize,
    height: buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },

  buttonPressed: {
    backgroundColor: color.border,
  },

  buttonDisabled: {
    opacity: 0.35,
  },

  quantity: {
    ...text.quantity,
    ...tabularNums,
    minWidth: space.xxl,
    textAlign: 'center',
  },

  symbol: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '600',
    color: color.textPrimary,
    includeFontPadding: false,
  },
});
