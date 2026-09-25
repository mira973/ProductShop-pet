import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { color, radius, space, tabularNums, text } from '../theme/tokens';
import type { Product } from '../types/product';

type Props = {
  product: Product;
};

/**
 * Order follows how a shopper reads a product: what it is, what it costs, how
 * much of it, whether it is available, and only then the reference detail.
 */
export function ProductInfo({ product }: Props) {
  const inStock = product.isAvailable && product.stock > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{product.price} ₽</Text>

        {product.oldPrice !== undefined && (
          <Text style={styles.oldPrice}>{product.oldPrice} ₽</Text>
        )}
      </View>

      <View style={styles.factsRow}>
        <View style={styles.factChip}>
          <Text style={styles.factText}>
            {product.value} {product.unit}
          </Text>
        </View>

        <View
          style={[
            styles.factChip,
            inStock ? styles.inStockChip : styles.outOfStockChip,
          ]}
        >
          <Text
            style={[
              styles.factText,
              inStock ? styles.inStockText : styles.outOfStockText,
            ]}
          >
            {inStock ? `В наличии: ${product.stock} шт.` : 'Нет в наличии'}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      {product.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {product.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <Section title="КБЖУ (на 100 г)">
        <View style={styles.nutritionRow}>
          <NutritionCell label="Ккал" value={product.nutrition.calories} />
          <NutritionCell label="Белки" value={product.nutrition.protein} />
          <NutritionCell label="Жиры" value={product.nutrition.fat} />
          <NutritionCell label="Углеводы" value={product.nutrition.carbs} />
        </View>
      </Section>

      <Section title="Состав">
        <Text style={styles.sectionText}>{product.ingredients}</Text>
      </Section>

      <Section title="Аллергены">
        <Text style={styles.sectionText}>
          {product.allergens.length > 0
            ? product.allergens.join(', ')
            : 'Не содержит'}
        </Text>
      </Section>

      <Section title="Хранение и срок годности">
        <InfoRow label="Условия хранения" value={product.storageConditions} />
        <InfoRow label="Срок годности" value={product.shelfLife} />
        <InfoRow label="Страна происхождения" value={product.countryOfOrigin} />
      </Section>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {children}
    </View>
  );
}

function NutritionCell({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.nutritionCell}>
      <Text style={styles.nutritionValue}>{value}</Text>

      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: space.xl,
  },

  name: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    color: color.textPrimary,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.md,
    marginTop: space.sm,
  },

  price: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '800',
    color: color.textPrimary,
    ...tabularNums,
  },

  oldPrice: {
    ...text.productOldPrice,
    ...tabularNums,
  },

  factsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
    marginTop: space.md,
  },

  factChip: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.sm,
    backgroundColor: color.surfaceSunken,
  },

  inStockChip: {
    backgroundColor: color.accentTint,
  },

  outOfStockChip: {
    backgroundColor: color.dangerTint,
  },

  factText: {
    ...text.meta,
    fontWeight: '600',
    color: color.textPrimary,
  },

  inStockText: {
    color: color.accent,
  },

  outOfStockText: {
    color: color.danger,
  },

  description: {
    ...text.meta,
    lineHeight: 21,
    marginTop: space.lg,
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
    marginTop: space.md,
  },

  tag: {
    paddingHorizontal: space.md,
    paddingVertical: space.sm - 2,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceSunken,
  },

  tagText: {
    ...text.micro,
  },

  section: {
    marginTop: space.xl,
    paddingTop: space.lg,
    borderTopWidth: 1,
    borderTopColor: color.border,
  },

  sectionTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: color.textPrimary,
  },

  sectionText: {
    ...text.meta,
    lineHeight: 21,
    marginTop: space.sm,
  },

  nutritionRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.md,
  },

  nutritionCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: space.md,
    borderRadius: radius.sm,
    backgroundColor: color.surfaceSunken,
  },

  nutritionValue: {
    ...text.quantity,
    ...tabularNums,
  },

  nutritionLabel: {
    ...text.micro,
    marginTop: space.xs / 2,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: space.lg,
    marginTop: space.md,
  },

  infoLabel: {
    ...text.meta,
    flex: 1,
  },

  infoValue: {
    ...text.meta,
    flex: 1.4,
    fontWeight: '600',
    color: color.textPrimary,
    textAlign: 'right',
  },
});
