import { StyleSheet, Text, View,Pressable} from 'react-native';
import { Product } from '../types/product';


type Props = {
  product: Product;
  onPress?: () => void
};

export function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imagePlaceholder} />

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{product.price} ₽</Text>
        <Text style={styles.stock}>Количество: {product.stock} шт.</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '31.5%',
    minHeight: 190,
    marginBottom: 12,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 88,
    backgroundColor: '#f1f3f5',
  },
  details: {
    padding: 9,
  },
  name: {
    minHeight: 38,
    color: '#171717',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  price: {
    marginTop: 6,
    color: '#171717',
    fontSize: 16,
    fontWeight: '700',
  },
  stock: {
    marginTop: 4,
    color: '#737373',
    fontSize: 11,
  },
});