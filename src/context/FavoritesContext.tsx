import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";

// Interface para os produtos nos favoritos
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  thumbnail: string;
  brand: string;
  rating: number;
}

// Tipo para o contexto dos favoritos
interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

// Criação do contexto com valor inicial
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Hook personalizado para usar o contexto dos favoritos
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

// Provider que gerencia o estado dos favoritos
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Adiciona ou remove um produto dos favoritos
  const toggleFavorite = (product: Product) => {
    const isAlreadyFavorite = favorites.some(
      (item) => item.id === product.id
    );

    if (isAlreadyFavorite) {
      setFavorites(currentFavorites => 
        currentFavorites.filter((item) => item.id !== product.id)
      );
      toast.success(`${product.title} removido dos favoritos!`);
    } else {
      setFavorites(currentFavorites => [...currentFavorites, product]);
      toast.success(`${product.title} adicionado aos favoritos!`);
    }
  };

  // Verifica se um produto está nos favoritos
  const isFavorite = (productId: number) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
} 