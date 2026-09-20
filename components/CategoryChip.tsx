import { Pressable, StyleSheet, Text } from 'react-native';


type Props = {
    title: string,
    active: boolean,
    onPress: () => void
}

export function CategoryChip({title, active, onPress}: Props){

    return(
            <Pressable
            onPress={onPress}
            style={[
                    styles.category,
                    active && styles.activeCategory,
                ]}
            >
                <Text>{title}</Text>

            </Pressable>

    )



}

const styles = StyleSheet.create({
  category: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: '#d9f99d',
  },
});