import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { CategoryChip } from '../components/CategoryChip';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';







const categories = ['Все', 'Мясо', 'Молочка', 'Овощи', 'Напитки','Выпечка']

export default function HomeScreen() {
        const [activeCategory, setActiveCategory] = useState('Все')
        const [searchQuery, setSearchQuery] = useState('')

        const filteredProducts =
        activeCategory === 'Все'
        ? products
        : products.filter(
        (product) => product.category === activeCategory
      )

        const searchFilteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

const displayedProducts =
  searchQuery !== ''
    ? searchFilteredProducts
    : filteredProducts
      
  return (
    <View style={styles.container}>
      <View>
        <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Найти товар"
      />
      </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
            
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

        <View style={styles.productGrid}>
        {displayedProducts.map((product) => (
          <ProductCard
        key={product.id}
          product={product}
         />
        ))}
    </View>

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
  },

  categories: {
    alignItems: 'center',
    paddingBottom: 18,
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  searchInput: {
  height: 44,
  borderWidth: 1,
  borderRadius: 12,
  paddingHorizontal: 12,
  marginBottom: 16,
}
});