import React from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types/types';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();

  // Simulate fetching product details based on the id
  // In a real application, you would fetch this data from an API
  const fetchProductDetails = (id: string) => {
    // Placeholder for product details fetching logic
    return product; // This should return the actual product details
  };

  const productDetails = id ? fetchProductDetails(id) : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {productDetails ? (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{productDetails.name}</h2>
          <p className="text-gray-600 text-lg mb-6">{productDetails.description}</p>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            Price: <span className="text-green-600">${productDetails.price.toFixed(2)}</span>
          </p>
          <button
            onClick={() => onAddToCart(productDetails)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </>
      ) : (
        <p className="text-gray-600 text-lg">Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetails;