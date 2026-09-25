import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CartItem } from '../../components/CartItem';
import { EmptyState } from '../../components/EmptyState';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import {
  color,
  layout,
  radius,
  scrollBottomInset,
  space,
  tabularNums,
  text,
} from '../../theme/tokens';

export default function CartScreen() {
  const { cart, increase, decrease } = useCart();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const cartItems = Object.entries(cart).map(([productId, quantity]) => ({
    product: products.find((p) => p.id === Number(productId)),
    quantity,
  }));

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      item.product ? sum + item.product.price * item.quantity : sum,
    0
  );

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <View
        style={[
          styles.screen,
          { paddingTop: insets.top + space.lg },
        ]}
      >
        <Text style={styles.title}>Корзина</Text>

        <View
          style={[
            styles.emptyBody,
            { paddingBottom: scrollBottomInset(insets.bottom) },
          ]}
        >
          <EmptyState
            title="Корзина пуста"
            description="Добавьте товары из каталога, и они появятся здесь."
            actionLabel="Перейти в каталог"
            onAction={() => router.navigate('/')}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top + space.lg }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Корзина</Text>

        {/* The running total stays visible even before the summary is reached. */}
        <Text style={styles.headerTotal}>{totalPrice} ₽</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.list,
          { paddingBottom: scrollBottomInset(insets.bottom) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map(({ product, quantity }) => {
          if (!product) return null;

          return (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              onIncrease={() => increase(product.id)}
              onDecrease={() => decrease(product.id)}
            />
          );
        })}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Товаров</Text>
            <Text style={styles.summaryValue}>{totalItems} шт.</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Итого</Text>
            <Text style={styles.summaryTotal}>{totalPrice} ₽</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    backgroundColor: color.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: space.lg,
  },

  title: {
    ...text.screenTitle,
  },

  headerTotal: {
    ...text.sectionTitle,
    ...tabularNums,
  },

  emptyBody: {
    flex: 1,
    justifyContent: 'center',
  },

  list: {
    gap: space.md,
  },

  summary: {
    marginTop: space.sm,
    padding: space.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    backgroundColor: color.surface,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space.lg,
  },

  summaryLabel: {
    ...text.meta,
  },

  summaryValue: {
    ...text.meta,
    ...tabularNums,
    color: color.textPrimary,
  },

  summaryDivider: {
    height: 1,
    marginVertical: space.md,
    backgroundColor: color.border,
  },

  summaryTotalLabel: {
    ...text.sectionTitle,
  },

  summaryTotal: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: color.textPrimary,
    ...tabularNums,
  },
});
