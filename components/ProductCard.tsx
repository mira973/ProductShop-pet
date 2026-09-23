import { Image, StyleSheet, Text, View,Pressable} from 'react-native';
import { productImages } from '../data/productImages';
import { Product } from '../types/product';


type Props = {
  product: Product;
  onPress?: () => void
};
export function ProductCard({ product, onPress }: Props) {

  const image = productImages[product.image];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageArea}>
        {image ? (
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{product.price} ₽</Text>
        <Text style={styles.unit}>{`${product.value} ${product.unit}`}</Text>
        <Text style={styles.stock}>Количество: {product.stock} шт.</Text>

      </View>
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
card: {
  width: '48%',
  borderRadius: 16,
  backgroundColor: '#fff',

  borderWidth: 1,
  borderColor: '#ececec',

  overflow: 'hidden',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.08,
  shadowRadius: 8,

  elevation: 3,
},
  imageArea: {
    width: '100%',
    aspectRatio: 1,
    padding: 10,
    backgroundColor: '#f1f3f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e5e9',
    borderStyle: 'dashed',
    backgroundColor: '#f7f8fa',
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

  unit:{
    fontSize: 10,
    color: "#733414"
  },

});
