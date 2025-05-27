import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Interface que define a estrutura de um produto
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  brand: string;
  rating: number;
  stock: number;
}

// Tradução das categorias para português
const categoryTranslations: { [key: string]: string } = {
  "smartphones": "Smartphones",
  "laptops": "Notebooks",
  "fragrances": "Perfumes",
  "skincare": "Cuidados com a Pele",
  "groceries": "Mercearia",
  "home-decoration": "Decoração",
  "furniture": "Móveis",
  "tops": "Camisetas",
  "womens-dresses": "Vestidos",
  "womens-shoes": "Calçados Femininos",
  "mens-shirts": "Camisas Masculinas",
  "mens-shoes": "Calçados Masculinos",
  "mens-watches": "Relógios Masculinos",
  "womens-watches": "Relógios Femininos",
  "womens-bags": "Bolsas",
  "womens-jewellery": "Joias",
  "sunglasses": "Óculos de Sol"
};

// Ordem de exibição das categorias na página
const categoryOrder = [
  "womens-dresses",
  "womens-shoes",
  "womens-bags",
  "womens-jewellery",
  "womens-watches",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "sunglasses",
  "fragrances",
  "skincare",
  "laptops",
  "smartphones",
  "home-decoration",
  "furniture",
  "groceries"
];

interface CategorySection {
  category: string;
  products: Product[];
}

export default function Products() {
  // Estados para gerenciar produtos, loading e modal
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categorySections, setCategorySections] = useState<CategorySection[]>([]);
  const { addToCart } = useCart();

  // Busca produtos da API e organiza por categorias
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(res => res.json())
      .then((data) => {
        setProducts(data.products);
        // Agrupa produtos por categoria seguindo a ordem definida
        const sections = categoryOrder
          .map(category => ({
            category,
            products: data.products.filter((product: Product) => product.category === category)
          }))
          .filter(section => section.products.length > 0);
        setCategorySections(sections);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, image: product.thumbnail, quantity: 1 });
  };

  const getTranslatedCategory = (category: string) => {
    return categoryTranslations[category] || category;
  };

  // Configurações do carrossel de produtos
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Seção Hero com mascote e mensagem de boas-vindas */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4 rounded-2xl overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bem-vindo à nossa loja
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Descubra produtos incríveis em todas as categorias
            </p>
          </div>
          {/* Mascote com balão de diálogo estilo quadrinhos */}
          <div className="hidden md:block w-64 h-64 relative group">
            <img
              src="/src/assets/mascot.png"
              alt="Mascote da loja"
              className="absolute bottom-0 right-0 w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="relative bg-white border-2 border-black text-black font-bold text-sm py-3 px-4 rounded-xl shadow-lg whitespace-nowrap">
                Assine agora o Amazona Prime Video!
                <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white border-r-2 border-b-2 border-black transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Padrão de fundo decorativo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iLjUiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMC0yYTggOCAwIDEwMCAxNiA4IDggMCAwMDAtMTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
      </div>

      {/* Seções de categorias com carrossel de produtos */}
      {categorySections.map(section => (
        <div key={section.category} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {getTranslatedCategory(section.category)}
            </h2>
            <div className="h-0.5 flex-1 bg-gray-200 ml-6"></div>
          </div>
          
          <div className="relative">
            <Slider {...sliderSettings} className="product-slider -mx-2">
              {section.products.map(product => (
                <div key={product.id} className="px-2">
                  <div 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                  >
                    <div 
                      onClick={() => openModal(product)}
                      className="cursor-pointer p-4"
                    >
                      <div className="relative aspect-square mb-4 group">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="absolute inset-0 w-full h-full object-contain group-hover:opacity-75 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black bg-opacity-50 rounded-full p-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-blue-600 font-medium">
                          {product.brand}
                        </p>
                        <h3 className="text-lg font-semibold line-clamp-2 min-h-[3.5rem]">
                          {product.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(product.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="text-sm text-gray-600">
                            ({product.rating})
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-xl font-bold text-blue-600">
                          R${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.title}</h2>
                  <p className="text-blue-600 font-medium">{selectedProduct.brand}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <div>
                <div className="aspect-square w-full max-w-md mx-auto mb-6">
                  <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(selectedProduct.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600">
                      ({selectedProduct.rating})
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">
                    {getTranslatedCategory(selectedProduct.category)}
                  </p>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-bold text-gray-800">
                        R${selectedProduct.price.toFixed(2)}
                      </span>
                      <p className="text-sm text-gray-600">
                        Estoque: {selectedProduct.stock} unidades
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        handleAddToCart(e, selectedProduct);
                        closeModal();
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 