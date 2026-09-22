import { Tabs } from "expo-router"

export default function TabsLayout(){

    return(
        <Tabs>
            <Tabs.Screen name="index"
            options={{title: "Главная"}}/>
            <Tabs.Screen name="ai" options={{title: "AI-шеф"}}/>
            <Tabs.Screen name="cart" options={{title: "Корзина"}}/>
        </Tabs>
    )

}