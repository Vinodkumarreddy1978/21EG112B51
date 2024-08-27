import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/categories/Laptop/products/${productId}/`);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  if (!product) return <div className="flex justify-center items-center h-screen text-2xl font-semibold">Loading...</div>;

  const randomImageUrl = `https://picsum.photos/seed/${product.id}/600/400`;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">{product.name}</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img src={randomImageUrl} alt={product.name} className="w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-md" />
        <div className="w-full md:w-1/2 lg:w-2/3">
          <p className="text-2xl font-semibold text-gray-800 mb-4">Price: <span className="text-green-600">${product.price}</span></p>
          <p className="text-2xl font-semibold text-gray-800 mb-4">Rating: <span className="text-yellow-500">{product.rating} ⭐</span></p>
          <p className="text-2xl font-semibold text-gray-800 mb-4">Discount: <span className="text-red-600">{product.discount}% OFF</span></p>
          <p className="text-2xl font-semibold text-gray-800 mb-4">Availability: <span className="text-blue-600">{product.availability}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
