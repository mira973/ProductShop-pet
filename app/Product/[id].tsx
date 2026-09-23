import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { products } from '../../data/products';

export default function ProductScreen() {
  const [quantity, setQuantity] = useState(0);

  const params = useLocalSearchParams();
  const productId = Number(params.id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не найден</Text>
      </View>
    );
  }

  const changeButton =
    product.stock === 0 ? (
      <Text style={styles.outOfStock}>Нет в наличии</Text>
    ) : quantity === 0 ? (
      <Pressable
        style={styles.addButton}
        onPress={() => setQuantity(1)}
      >
        <Text style={styles.addButtonText}>Добавить</Text>
      </Pressable>
    ) : (
      <View style={styles.counter}>
        <Pressable
          style={styles.counterButton}
          onPress={() =>
            setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
          }
        >
          <Text style={styles.counterButtonText}>−</Text>
        </Pressable>

        <Text style={styles.quantity}>{quantity}</Text>

        <Pressable
          style={[
            styles.counterButton,
            quantity >= product.stock && styles.disabledButton,
          ]}
          disabled={quantity >= product.stock}
          onPress={() =>
            setQuantity((prev) =>
              prev < product.stock ? prev + 1 : prev
            )
          }
        >
          <Text style={styles.counterButtonText}>+</Text>
        </Pressable>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder} />

      <Text style={styles.title}>{product.name}</Text>

      <Text style={styles.unit}>
        {product.value} {product.unit}
      </Text>

      <Text style={styles.price}>{product.price} ₽</Text>

      <Text style={styles.stock}>
        В наличии: {product.stock} шт.
      </Text>

      {changeButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },

  imagePlaceholder: {
    width: '100%',
    height: 260,
    backgroundColor: '#f1f3f5',
    borderRadius: 20,
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },

  unit: {
    marginTop: 6,
    fontSize: 15,
    color: '#737373',
  },

  price: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '700',
  },

  stock: {
    marginTop: 6,
    fontSize: 14,
    color: '#737373',
  },

  addButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#d9f99d',
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },

  counter: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#d9f99d',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.35,
  },

  counterButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },

  quantity: {
    minWidth: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },

  outOfStock: {
    marginTop: 24,
    fontSize: 16,
    color: '#737373',
  },
});