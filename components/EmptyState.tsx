import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, radius, space, text } from '../theme/tokens';

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      {actionLabel !== undefined && onAction !== undefined && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={({ pressed }) => [
            styles.action,
            pressed && styles.actionPressed,
          ]}
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: space.xxxl,
    paddingBottom: space.xxl,
  },

  title: {
    ...text.sectionTitle,
    textAlign: 'center',
  },

  description: {
    ...text.meta,
    maxWidth: 300,
    marginTop: space.sm,
    textAlign: 'center',
  },

  action: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: space.lg,
    paddingHorizontal: space.xl,
    borderRadius: radius.md,
    backgroundColor: color.accent,
  },

  actionPressed: {
    opacity: 0.85,
  },

  actionLabel: {
    ...text.button,
    color: color.onAccent,
  },
});
