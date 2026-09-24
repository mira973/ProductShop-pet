import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

export default function CartScreen() {
  const { cart, increase, decrease } = useCart();

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
      <View style={styles.container}>
        <Text style={styles.title}>Корзина</Text>
        <Text style={styles.emptyText}>Корзина пуста</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Корзина</Text>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map(({ product, quantity }) => {
          if (!product) return null;

          return (
            <View key={product.id} style={styles.item}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.itemPrice}>
                  {product.price} ₽ / {product.value}{product.unit}
                </Text>
              </View>

              <View style={styles.counter}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => decrease(product.id)}
                >
                  <Text style={styles.counterButtonText}>−</Text>
                </Pressable>

                <Text style={styles.quantity}>{quantity}</Text>

                <Pressable
                  disabled={quantity >= product.stock}
                  style={[
                    styles.counterButton,
                    quantity >= product.stock && styles.counterButtonDisabled,
                  ]}
                  onPress={() => increase(product.id)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </Pressable>
              </View>

              <Text style={styles.itemSum}>{product.price * quantity} ₽</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Товаров: {totalItems}</Text>
        <Text style={styles.totalPrice}>Итого: {totalPrice} ₽</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 96,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },

  emptyText: {
    fontSize: 16,
    color: '#888',
  },

  list: {
    paddingBottom: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  itemInfo: {
    flex: 1,
    marginRight: 8,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '600',
  },

  itemPrice: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },

  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },

  counterButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterButtonDisabled: {
    opacity: 0.4,
  },

  counterButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  quantity: {
    minWidth: 26,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },

  itemSum: {
    fontSize: 15,
    fontWeight: '700',
    minWidth: 60,
    textAlign: 'right',
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 14,
  },

  footerText: {
    fontSize: 13,
    color: '#888',
    marginBottom: 4,
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
  },
});