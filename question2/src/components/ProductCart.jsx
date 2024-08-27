import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const randomImageUrl = `https://picsum.photos/seed/${product.id}/300/200`;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to={`/product/${product.id}`}>
        <img 
          src={randomImageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h2>
        <div className="text-gray-700 mb-2">
          <p className="text-sm"><span className="font-bold">Price:</span> ${product.price}</p>
          <p className="text-sm"><span className="font-bold">Rating:</span> {product.rating} ⭐</p>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
