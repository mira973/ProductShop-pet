import { Stack } from 'expo-router';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {

  return(
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </SafeAreaProvider>
  )
}
