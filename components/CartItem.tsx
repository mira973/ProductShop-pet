import { Image, StyleSheet, Text, View } from 'react-native';

import { productImages } from '../data/productImages';
import { color, radius, space, tabularNums, text } from '../theme/tokens';
import type { Product } from '../types/product';
import { QuantityControl } from './QuantityControl';

type Props = {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export function CartItem({ product, quantity, onIncrease, onDecrease }: Props) {
  const image = productImages[product.image];
  const lineTotal = product.price * quantity;

  return (
    <View
      style={styles.card}
      accessibilityLabel={`${product.name}, ${product.value} ${product.unit}, ${quantity} шт., ${lineTotal} рублей`}
    >
      <View style={styles.thumbnail}>
        {image ? (
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <Text style={styles.meta} numberOfLines={1}>
          {product.value} {product.unit} · {product.price} ₽
        </Text>

        <View style={styles.footer}>
          <QuantityControl
            quantity={quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            maxReached={quantity >= product.stock}
          />

          <Text style={styles.lineTotal}>{lineTotal} ₽</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
    padding: space.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },

  thumbnail: {
    width: 72,
    height: 72,
    padding: space.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imagePlaceholder: {
    flex: 1,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: color.border,
    borderStyle: 'dashed',
  },

  body: {
    flex: 1,
  },

  name: {
    ...text.productName,
  },

  meta: {
    ...text.micro,
    marginTop: space.xs,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    marginTop: space.md,
  },

  lineTotal: {
    ...text.productPrice,
    ...tabularNums,
  },
});
