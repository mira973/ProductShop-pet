import { View,Text } from "react-native";
import { useLocalSearchParams } from 'expo-router';
import { products } from "../../data/products";

export default function ProductScreen(){

    const params = useLocalSearchParams()
    const productId = Number(params.id)
    const product = products.find((item) => item.id === productId)
    

    if(!product){
        return(
            <View>
                <Text>Товар не найден</Text>
            </View>
        )
    }

    return(
        <View>
            <Text>{product.name}</Text>
            <Text>{product.price} ₽</Text>
        </View>
    )
}