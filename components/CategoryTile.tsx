import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import {
  color,
  layout,
  productCountLabel,
  radius,
  space,
  text,
} from '../theme/tokens';

type Props = {
  title: string;
  count: number;
  active: boolean;
  onPress: () => void;
};

/**
 * A category is a section of the shop, so it is a tile with the number of
 * products in it, not a text chip in a scrolling row.
 */
export function CategoryTile({ title, count, active, onPress }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      // A category is a single choice out of a set, so it is a radio rather
      // than a toggle button.
      role="radio"
      aria-checked={active}
      accessibilityRole="radio"
      accessibilityState={{ checked: active, selected: active }}
      accessibilityLabel={`${title}, ${productCountLabel(count)}`}
      style={({ pressed }) => [
        styles.tile,
        active ? styles.tileActive : styles.tileIdle,
        focused && styles.tileFocused,
        pressed && styles.tilePressed,
      ]}
    >
      <Text
        style={active ? styles.titleActive : styles.title}
        numberOfLines={2}
      >
        {title}
      </Text>

      <Text style={active ? styles.countActive : styles.count}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: layout.categoryTileMinHeight,
    justifyContent: 'center',
    paddingHorizontal: space.md,
    paddingVertical: space.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },

  tileIdle: {
    backgroundColor: color.surfaceSunken,
    borderColor: 'transparent',
  },

  // Active is signalled by fill, border, colour AND weight, never colour alone.
  tileActive: {
    backgroundColor: color.accentTint,
    borderColor: color.accentTintBorder,
  },

  tileFocused: {
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: color.accent,
    outlineOffset: 2,
  },

  tilePressed: {
    opacity: 0.85,
  },

  title: {
    ...text.tileTitle,
  },

  titleActive: {
    ...text.tileTitleActive,
  },

  count: {
    ...text.tileCount,
    marginTop: space.xs / 2,
  },

  countActive: {
    ...text.tileCountActive,
    marginTop: space.xs / 2,
  },
});
