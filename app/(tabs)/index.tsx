import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryTile } from '../../components/CategoryTile';
import { EmptyState } from '../../components/EmptyState';
import { ProductCard } from '../../components/ProductCard';
import { SearchBar } from '../../components/SearchBar';
import { products } from '../../data/products';
import {
  color,
  layout,
  productCountLabel,
  scrollBottomInset,
  space,
  text,
} from '../../theme/tokens';
import type { Product } from '../../types/product';

const categories = [
  'Все',
  'Мясо',
  'Молочка',
  'Овощи',
  'Напитки',
  'Выпечка',
  'Фрукты',
  'Бакалея',
  'Соусы',
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const query = searchQuery.trim();
  const isSearching = query !== '';

  const listWidth = Math.min(width, layout.maxContentWidth);

  const visibleProducts = useMemo(() => {
    if (isSearching) {
      return products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (activeCategory === 'Все') {
      return products;
    }

    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory, isSearching, query]);

  /**
   * FlatList needs a complete last row, otherwise `flex: 1` stretches the one
   * remaining card across the full width.
   */
  const gridData = useMemo(() => {
    const padded: (Product | null)[] = [...visibleProducts];

    while (padded.length % layout.productColumns !== 0) {
      padded.push(null);
    }

    return padded;
  }, [visibleProducts]);

  const categoryRows = useMemo(() => {
    const rows: string[][] = [];

    for (let index = 0; index < categories.length; index += layout.categoryColumns) {
      rows.push(categories.slice(index, index + layout.categoryColumns));
    }

    return rows;
  }, []);

  /** How many products each tile stands for. Derived, never stored. */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Все: products.length };

    for (const product of products) {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    }

    return counts;
  }, []);

  const header = (
    <View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      <View
        style={styles.categoryGrid}
        role="radiogroup"
        aria-label="Разделы каталога"
      >
        {categoryRows.map((row) => (
          <View key={row.join('-')} style={styles.categoryRow}>
            {row.map((category) => (
              <CategoryTile
                key={category}
                title={category}
                count={categoryCounts[category] ?? 0}
                // Search covers the whole catalogue, so no tile claims to be
                // the active filter while a query is running.
                active={!isSearching && activeCategory === category}
                onPress={() => {
                  setActiveCategory(category);
                  setSearchQuery('');
                }}
              />
            ))}

            {/* Keeps the last row's tiles the same width as a full row. */}
            {row.length < layout.categoryColumns &&
              Array.from({ length: layout.categoryColumns - row.length }).map(
                (_, index) => (
                  <View key={`filler-${index}`} style={styles.categoryFiller} />
                )
              )}
          </View>
        ))}
      </View>

      <Text style={styles.count} accessibilityLiveRegion="polite">
        {isSearching
          ? `Найдено ${productCountLabel(visibleProducts.length)}`
          : activeCategory === 'Все'
            ? `${productCountLabel(products.length)} в каталоге`
            : `${activeCategory}: ${productCountLabel(visibleProducts.length)}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={gridData}
        renderItem={({ item }) =>
          item ? (
            <ProductCard
              product={item}
              onPress={() => router.push(`/Product/${item.id}`)}
            />
          ) : (
            <View style={styles.spacer} />
          )
        }
        keyExtractor={(item, index) =>
          item ? String(item.id) : `spacer-${index}`
        }
        numColumns={layout.productColumns}
        columnWrapperStyle={styles.row}
        style={[styles.list, { width: listWidth }]}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + space.lg,
            paddingBottom: scrollBottomInset(insets.bottom),
          },
        ]}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <EmptyState
            title={isSearching ? 'Ничего не нашлось' : 'Здесь пока пусто'}
            description={
              isSearching
                ? `По запросу «${query}» товаров нет. Проверьте написание, попробуйте другое слово или выберите раздел выше.`
                : 'В этом разделе товаров пока нет. Загляните в другие категории.'
            }
            actionLabel={isSearching ? 'Очистить поиск' : 'Показать все товары'}
            onAction={() =>
              isSearching ? setSearchQuery('') : setActiveCategory('Все')
            }
          />
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        initialNumToRender={6}
        windowSize={7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.background,
  },

  list: {
    flex: 1,
  },

  content: {
    paddingHorizontal: layout.screenPadding,
  },

  categoryGrid: {
    gap: layout.categoryGap,
    marginTop: space.xl,
  },

  categoryRow: {
    flexDirection: 'row',
    gap: layout.categoryGap,
  },

  categoryFiller: {
    flex: 1,
  },

  count: {
    ...text.meta,
    marginTop: space.lg,
  },

  row: {
    gap: layout.cardGap,
    marginBottom: layout.cardGap,
  },

  spacer: {
    flex: 1,
  },
});
