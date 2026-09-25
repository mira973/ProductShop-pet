import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProductInfo } from '../../components/ProductInfo';
import { QuantityControl } from '../../components/QuantityControl';
import { useCart } from '../../context/CartContext';
import { productImages } from '../../data/productImages';
import { products } from '../../data/products';
import {
  color,
  layout,
  radius,
  space,
  tabularNums,
  text,
} from '../../theme/tokens';

export default function ProductScreen() {
  const { cart, increase, decrease } = useCart();

  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const productId = Number(params.id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <View style={[styles.screen, styles.notFound]}>
        <Text style={styles.notFoundText}>Товар не найден</Text>
      </View>
    );
  }

  const quantity = cart[product.id] ?? 0;

  const image = productImages[product.image];

  const changeButton =
    product.stock === 0 ? (
      <View style={styles.unavailableButton}>
        <Text style={styles.unavailableText}>Нет в наличии</Text>
      </View>
    ) : quantity === 0 ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Добавить в корзину"
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
        onPress={() => increase(product.id)}
      >
        <Text style={styles.addButtonText}>Добавить в корзину</Text>
      </Pressable>
    ) : (
      <QuantityControl
        quantity={quantity}
        onDecrease={() => decrease(product.id)}
        onIncrease={() => increase(product.id)}
        maxReached={quantity >= product.stock}
      />
    );

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + space.md },
      ]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageArea}>
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

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Назад"
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.backGlyph}>‹</Text>
          </Pressable>
        </View>

        <ProductInfo product={product} />
      </ScrollView>

      {/* Separated from the content by a hairline and the surface colour. */}
      <View
        style={[
          styles.purchaseBar,
          { paddingBottom: insets.bottom + space.md },
        ]}
      >
        <View style={styles.purchasePrice}>
          <Text style={styles.price}>
            {product.price} ₽
          </Text>

          {quantity > 0 && (
            <Text style={styles.priceNote}>
              {product.price * quantity} ₽ всего
            </Text>
          )}
        </View>

        {changeButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    backgroundColor: color.background,
  },

  notFound: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFoundText: {
    ...text.sectionTitle,
    color: color.textSecondary,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: space.lg,
  },

  imageArea: {
    aspectRatio: 1,
    maxHeight: 420,
    alignSelf: 'center',
    width: '100%',
    padding: space.lg,
    borderRadius: radius.xl,
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
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.border,
    borderStyle: 'dashed',
  },

  backButton: {
    position: 'absolute',
    top: space.md,
    left: space.md,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },

  backButtonPressed: {
    backgroundColor: color.surfaceSunken,
  },

  backGlyph: {
    fontSize: 28,
    lineHeight: 30,
    fontWeight: '500',
    color: color.textPrimary,
    includeFontPadding: false,
  },

  purchaseBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    marginHorizontal: -layout.screenPadding,
    marginTop: space.md,
    paddingHorizontal: layout.screenPadding,
    paddingTop: space.md,
    borderTopWidth: 1,
    borderTopColor: color.border,
    backgroundColor: color.surface,
  },

  purchasePrice: {
    flexShrink: 1,
  },

  price: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '800',
    color: color.textPrimary,
    ...tabularNums,
  },

  priceNote: {
    ...text.micro,
    marginTop: space.xs / 2,
  },

  addButton: {
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: space.xl,
    borderRadius: radius.md,
    backgroundColor: color.accent,
  },

  addButtonPressed: {
    opacity: 0.85,
  },

  addButtonText: {
    ...text.button,
    color: color.onAccent,
  },

  unavailableButton: {
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: space.xl,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSunken,
  },

  unavailableText: {
    ...text.button,
    color: color.textMuted,
  },
});
