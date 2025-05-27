import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";

// Interface para os produtos no carrinho
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// Tipo para o contexto do carrinho
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

// Criação do contexto com valor inicial
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar o contexto do carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Provider que gerencia o estado do carrinho
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  // Adiciona ou atualiza produto no carrinho
  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      setCart(currentCart =>
        currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`Quantidade de ${product.title} atualizada no carrinho!`);
    } else {
      setCart(currentCart => [...currentCart, { ...product, quantity: 1 }]);
      toast.success(`${product.title} adicionado ao carrinho!`);
    }
  };

  // Remove produto do carrinho
  const removeFromCart = (productId: number) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      toast.success(`${product.title} removido do carrinho!`);
      setCart((currentCart) =>
        currentCart.filter((item) => item.id !== productId)
      );
    }
  };

  // Atualiza a quantidade de um produto
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Limpa todo o carrinho
  const clearCart = () => {
    setCart([]);
    toast.success("Carrinho limpo!");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
