import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { useState } from 'react';

import { products } from '../../data/products';


export default function ProductScreen() {
  const [quantity, setQuantity] = useState(0);

  const params = useLocalSearchParams();
  const router = useRouter();

  const productId = Number(params.id);

  const product = products.find(
    (item) => item.id === productId
  );


  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Товар не найден</Text>
      </View>
    );
  }


  const changeButton =
    product.stock === 0 ? (
      <View style={styles.outOfStockButton}>
        <Text style={styles.outOfStockText}>
          Нет в наличии
        </Text>
      </View>
    ) : quantity === 0 ? (
      <Pressable
        style={styles.addButton}
        onPress={() => setQuantity(1)}
      >
        <Text style={styles.addButtonText}>
          Добавить в корзину
        </Text>
      </Pressable>
    ) : (
      <View style={styles.counter}>
        <Pressable
          style={styles.counterButton}
          onPress={() =>
            setQuantity((prev) =>
              prev > 0 ? prev - 1 : 0
            )
          }
        >
          <Text style={styles.counterButtonText}>
            −
          </Text>
        </Pressable>

        <Text style={styles.quantity}>
          {quantity}
        </Text>

        <Pressable
          disabled={quantity >= product.stock}
          style={[
            styles.counterButton,
            quantity >= product.stock &&
              styles.disabledButton,
          ]}
          onPress={() =>
            setQuantity((prev) =>
              prev < product.stock
                ? prev + 1
                : prev
            )
          }
        >
          <Text style={styles.counterButtonText}>
            +
          </Text>
        </Pressable>
      </View>
    );


  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>
            ‹
          </Text>
        </Pressable>

        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>
            PRODUCT IMAGE
          </Text>
        </View>
      </View>


      <View style={styles.productInfo}>
        <Text style={styles.title}>
          {product.name}
        </Text>

        <Text style={styles.unit}>
          {product.value} {product.unit}
        </Text>

        <Text style={styles.stock}>
          В наличии: {product.stock} шт.
        </Text>
      </View>


      <View style={styles.bottomCard}>

        <View>
          <Text style={styles.price}>
            {product.price} ₽
          </Text>

          {quantity > 0 && (
            <Text style={styles.total}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 24,
  },


  imageContainer: {
    position: 'relative',
  },


  imagePlaceholder: {
    width: '100%',
    height: 380,
    borderRadius: 28,

    backgroundColor: '#f2f2f2',

    alignItems: 'center',
    justifyContent: 'center',
  },


  imageText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },


  backButton: {
    position: 'absolute',

    top: 14,
    left: 14,

    width: 48,
    height: 48,

    borderRadius: 18,

    backgroundColor: 'rgba(255,255,255,0.9)',

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 10,
  },


  backButtonText: {
    fontSize: 38,
    lineHeight: 38,
    color: '#444',
  },


  productInfo: {
    marginTop: 22,
  },


  title: {
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '800',
    color: '#171717',
  },


  unit: {
    marginTop: 8,

    fontSize: 16,
    fontWeight: '500',

    color: '#737373',
  },


  stock: {
    marginTop: 8,

    fontSize: 14,

    color: '#8a8a8a',
  },


  bottomCard: {
    marginTop: 'auto',

    minHeight: 92,

    padding: 14,

    borderRadius: 24,

    backgroundColor: '#f3f3f3',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    gap: 14,
  },


  price: {
    fontSize: 25,
    fontWeight: '800',

    color: '#171717',
  },


  total: {
    marginTop: 3,

    fontSize: 12,

    color: '#737373',
  },


  addButton: {
    minHeight: 58,

    paddingHorizontal: 22,

    borderRadius: 18,

    backgroundColor: '#22c55e',

    alignItems: 'center',
    justifyContent: 'center',

    flexShrink: 1,
  },


  addButtonText: {
    fontSize: 15,
    fontWeight: '700',

    color: '#fff',
  },


  counter: {
    minWidth: 160,
    height: 58,

    paddingHorizontal: 6,

    borderRadius: 18,

    backgroundColor: '#dedede',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  counterButton: {
    width: 46,
    height: 46,

    alignItems: 'center',
    justifyContent: 'center',
  },


  counterButtonText: {
    fontSize: 28,
    fontWeight: '400',

    color: '#171717',
  },


  quantity: {
    minWidth: 30,

    textAlign: 'center',

    fontSize: 20,
    fontWeight: '600',

    color: '#171717',
  },


  disabledButton: {
    opacity: 0.25,
  },


  outOfStockButton: {
    minHeight: 58,

    paddingHorizontal: 20,

    borderRadius: 18,

    backgroundColor: '#dedede',

    alignItems: 'center',
    justifyContent: 'center',
  },


  outOfStockText: {
    color: '#777',

    fontSize: 14,
    fontWeight: '600',
  },
});