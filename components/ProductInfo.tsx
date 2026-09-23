import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';


type Props = {
  product: Product;
};


export function ProductInfo({ product }: Props) {
  const inStock = product.isAvailable && product.stock > 0;

  return (
    <View style={styles.container}>

      <Text style={styles.name}>
        {product.name}
      </Text>

      {product.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {product.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.priceRow}>
        <Text style={styles.price}>
          {product.price} ₽
        </Text>

        {product.oldPrice !== undefined && (
          <Text style={styles.oldPrice}>
            {product.oldPrice} ₽
          </Text>
        )}
      </View>

      <View style={styles.factsRow}>
        <View style={styles.weightChip}>
          <Text style={styles.weightText}>
            {product.value} {product.unit}
          </Text>
        </View>

        <View
          style={[
            styles.stockChip,
            inStock ? styles.inStockChip : styles.outOfStockChip,
          ]}
        >
          <Text
            style={[
              styles.stockText,
              inStock ? styles.inStockText : styles.outOfStockText,
            ]}
          >
            {inStock
              ? `В наличии: ${product.stock} шт.`
              : 'Нет в наличии'}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {product.description}
      </Text>

      <Section title="КБЖУ (на 100 г)">
        <View style={styles.nutritionRow}>
          <NutritionCell
            label="Ккал"
            value={product.nutrition.calories}
          />
          <NutritionCell
            label="Белки"
            value={product.nutrition.protein}
          />
          <NutritionCell
            label="Жиры"
            value={product.nutrition.fat}
          />
          <NutritionCell
            label="Углеводы"
            value={product.nutrition.carbs}
          />
        </View>
      </Section>

      <Section title="Состав">
        <Text style={styles.sectionText}>
          {product.ingredients}
        </Text>
      </Section>

      <Section title="Аллергены">
        <Text style={styles.sectionText}>
          {product.allergens.length > 0
            ? product.allergens.join(', ')
            : 'Не содержит'}
        </Text>
      </Section>

      <Section title="Хранение и срок годности">
        <InfoRow
          label="Условия хранения"
          value={product.storageConditions}
        />
        <InfoRow
          label="Срок годности"
          value={product.shelfLife}
        />
        <InfoRow
          label="Страна происхождения"
          value={product.countryOfOrigin}
        />
      </Section>

    </View>
  );
}


function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      {children}
    </View>
  );
}


function NutritionCell({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.nutritionCell}>
      <Text style={styles.nutritionValue}>
        {value}
      </Text>

      <Text style={styles.nutritionLabel}>
        {label}
      </Text>
    </View>
  );
}


function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },

  name: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '800',
    color: '#171717',
  },

  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#f1f3f5',
  },

  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginTop: 16,
  },

  price: {
    fontSize: 26,
    fontWeight: '800',
    color: '#171717',
  },

  oldPrice: {
    fontSize: 16,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },

  factsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },

  weightChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
  },

  weightText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  stockChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  inStockChip: {
    backgroundColor: '#e8f8ee',
  },

  outOfStockChip: {
    backgroundColor: '#fdecec',
  },

  stockText: {
    fontSize: 13,
    fontWeight: '600',
  },

  inStockText: {
    color: '#15803d',
  },

  outOfStockText: {
    color: '#b91c1c',
  },

  description: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 22,
    color: '#444444',
  },

  section: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8a8a8a',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  sectionText: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: '#333333',
  },

  nutritionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  nutritionCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#f7f7f7',
  },

  nutritionValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
  },

  nutritionLabel: {
    marginTop: 2,
    fontSize: 11,
    color: '#8a8a8a',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    marginTop: 10,
  },

  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: '#8a8a8a',
  },

  infoValue: {
    flex: 1.4,
    fontSize: 14,
    fontWeight: '500',
    color: '#171717',
    textAlign: 'right',
  },
});
