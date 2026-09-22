import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { CategoryChip } from '../../components/CategoryChip';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import {useRouter } from 'expo-router';







const categories = ['Все', 'Мясо', 'Молочка', 'Овощи', 'Напитки','Выпечка']

export default function HomeScreen() {
        const [activeCategory, setActiveCategory] = useState('Все')
        const [searchQuery, setSearchQuery] = useState('')
        const router = useRouter()


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

        
      <FlatList
  data={displayedProducts}
  renderItem={({ item }) => (
    <ProductCard
      product={item}
      onPress={() => router.push(`/Product/${item.id}`)}
    />
  )}
  keyExtractor={(item) => item.id.toString()}
  numColumns={2}
  contentContainerStyle={styles.listContainer}
  columnWrapperStyle={styles.row}
  showsVerticalScrollIndicator={false}
/>

    </View>
  );
}



const styles = StyleSheet.create({

  listContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },

  row:{
  justifyContent: 'space-between',
  marginBottom: 14,
  },

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
    flexWrap: 'nowrap',
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