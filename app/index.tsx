import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CategoryChip } from '../components/CategoryChip';
import { products } from '../data/products';






const categories = ['Все', 'Мясо', 'Молочка', 'Овощи', 'Напитки','Выпечка']

export default function HomeScreen() {
        const [activeCategory, setActiveCategory] = useState('Все')
       
      const filteredProducts = activeCategory === "Все"? products: products.filter((product) => product.category === activeCategory)

      
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Доставка за 15 минут</Text>

        <ScrollView horizontal
        showsHorizontalScrollIndicator={false}>
            
        {categories.map( category =>
            <CategoryChip
            key={category}
            title={category}
            active={activeCategory === category}
            onPress={() => setActiveCategory(category)}
            
            >

            </CategoryChip>

        )}
        </ScrollView>

        <View>
            {filteredProducts.map(product => (
            <View key={product.id}>
            <Text>{product.name}</Text>
            <Text>Цена: {product.price} р</Text>
            </View>
            ))}
        </View>
        
        


      <Text>
        Выбрано: {activeCategory}
      </Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  }
});