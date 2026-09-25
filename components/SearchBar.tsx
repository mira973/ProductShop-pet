import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  color,
  minTouchTarget,
  radius,
  space,
  text,
} from '../theme/tokens';

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
  label?: string;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  onClear,
  label = 'Поиск по каталогу',
  placeholder = 'Молоко, хлеб, сыр…',
}: Props) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.field, focused && styles.fieldFocused]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={color.textMuted}
          accessibilityLabel={`${label}. ${placeholder}`}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />

        {hasValue && (
          <Pressable
            onPress={onClear}
            accessibilityRole="button"
            accessibilityLabel="Очистить поиск"
            hitSlop={space.sm}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Очистить</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const fieldHeight =
  Platform.OS === 'android' ? minTouchTarget.android : 48;

const styles = StyleSheet.create({
  label: {
    ...text.fieldLabel,
    marginBottom: space.sm,
  },

  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    minHeight: fieldHeight,
    paddingHorizontal: space.md,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
  },

  // The ring is drawn outside the field, so focusing never shifts the layout.
  fieldFocused: {
    backgroundColor: color.surface,
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: color.accent,
    outlineOffset: 1,
  },

  input: {
    ...text.input,
    flex: 1,
    paddingVertical: 0,
    // The browser default ring is replaced by the field ring above.
    outlineWidth: 0,
  },

  clearButton: {
    minHeight: fieldHeight - space.lg,
    justifyContent: 'center',
    paddingHorizontal: space.sm,
  },

  clearText: {
    ...text.meta,
    fontWeight: '600',
  },
});
