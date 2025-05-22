import React from 'react';
import './ProductCard.css'; // Importando o arquivo CSS

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
  onAddToCart: (product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }) => void; // Callback para adicionar ao carrinho
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button
        className="product-button"
        onClick={() => onAddToCart(product)} // Chama a função ao clicar
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;