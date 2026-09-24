import { createContext, useState, ReactNode, useContext} from 'react';

type CartState = Record<number, number>;
type CartContextType = {
  cart: CartState;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
};
type CartProviderProps = {
  children: ReactNode;
};

export function useCart(){
        const context = useContext(CartContext);
        if(context === undefined ){
            throw new Error('Error')
        }else{
            return context
        }
    }


const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartState>({});

  const increaseProduct = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1,
    }));
  };

    const decreaseProduct = (productId: number) => {
        setCart((prev) => {
     const currentQuantity = prev[productId] ?? 0;

        if (currentQuantity === 0) {
        return prev;
        }

        const newCart = { ...prev };

        if (currentQuantity === 1) {
            delete newCart[productId];
        return newCart;
        }

    newCart[productId] = currentQuantity - 1;

    return newCart;
  });
};


  return (
    <CartContext value={{ cart, 
    increase: increaseProduct,
    decrease: decreaseProduct
      }}>
      {children}
    </CartContext>
  );


}