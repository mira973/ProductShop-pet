import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { productImages } from '../data/productImages';
import { color, radius, space, tabularNums, text } from '../theme/tokens';
import type { Product } from '../types/product';
import { discountPercent, stockNote, unitPriceLabel } from '../utils/productFormat';

type Props = {
  product: Product;
  onPress?: () => void;
};

export function ProductCard({ product, onPress }: Props) {
  const [focused, setFocused] = useState(false);

  const image = productImages[product.image];
  const discount = discountPercent(product.price, product.oldPrice);
  const unitPrice = unitPriceLabel(product);
  const stock = stockNote(product);
  const unavailable = stock?.tone === 'danger';

  const meta = [`${product.value} ${product.unit}`, unitPrice]
    .filter(Boolean)
    .join(' · ');

  const availability = stock ? stock.label : 'В наличии';

  return (
    <Pressable
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, ${product.price} рублей за ${product.value} ${product.unit}. ${availability}`}
      accessibilityHint="Открыть карточку товара"
      style={({ pressed }) => [
        styles.card,
        focused && styles.cardFocused,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.imageArea}>
        {image ? (
          <Image
            source={image}
            style={[styles.image, unavailable && styles.imageUnavailable]}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {discount !== null && !unavailable && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>−{discount}%</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/*
          Price and old price are one inline run, so they always share a
          baseline instead of drifting apart inside a flex row.
        */}
        <Text style={styles.price} numberOfLines={1}>
          {product.price} ₽
          {product.oldPrice !== undefined && (
            <Text style={styles.oldPrice}>  {product.oldPrice} ₽</Text>
          )}
        </Text>

        <Text style={styles.meta} numberOfLines={1}>
          {meta}
        </Text>

        {stock !== null && (
          <Text
            style={[
              styles.stock,
              unavailable ? styles.stockUnavailable : styles.stockLow,
            ]}
            numberOfLines={1}
          >
            {stock.label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },

  cardFocused: {
    borderColor: color.accent,
    outlineStyle: 'solid',
    outlineWidth: 2,
    outlineColor: color.accent,
    outlineOffset: 1,
  },

  cardPressed: {
    opacity: 0.9,
  },

  /**
   * The product photos already sit on a neutral white background, so the image
   * slot stays white and the picture blends in instead of floating in a grey box.
   */
  imageArea: {
    aspectRatio: 1,
    padding: space.md,
    backgroundColor: color.surface,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageUnavailable: {
    opacity: 0.45,
  },

  imagePlaceholder: {
    flex: 1,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: color.border,
    borderStyle: 'dashed',
  },

  discountBadge: {
    position: 'absolute',
    top: space.md,
    left: space.md,
    paddingHorizontal: space.sm,
    borderRadius: radius.sm,
    backgroundColor: color.accentTint,
  },

  discountText: {
    ...text.micro,
    fontWeight: '700',
    color: color.accent,
    ...tabularNums,
  },

  details: {
    flex: 1,
    paddingHorizontal: space.md,
    paddingTop: space.xs,
    paddingBottom: space.md,
  },

  name: {
    ...text.productName,
    minHeight: text.productName.lineHeight * 2,
  },

  price: {
    ...text.productPrice,
    ...tabularNums,
    marginTop: space.sm,
  },

  oldPrice: {
    ...text.productOldPrice,
    ...tabularNums,
  },

  meta: {
    ...text.micro,
    marginTop: space.xs,
  },

  stock: {
    ...text.micro,
    marginTop: space.xs,
  },

  stockLow: {
    color: color.warning,
  },

  stockUnavailable: {
    color: color.danger,
  },
});
