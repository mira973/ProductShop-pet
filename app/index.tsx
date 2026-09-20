import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CategoryChip } from '../components/CategoryChip';
const categories = ['Все', 'Мясо', 'Молочка', 'Овощи', 'Напитки','Выпечка']

export default function HomeScreen() {
        const [activeCategory, setActiveCategory] = useState('Все')
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


      <Text style={styles.debug}>
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
  },

  debug: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 610,
    fontSize: 18,
  },
});