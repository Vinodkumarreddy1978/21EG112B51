import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCart';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'Laptop', 
    company: '',
    rating: 0,
    minPrice: 1,
    maxPrice: 10000,
    availability: 'all',
  });
  const [sortBy, setSortBy] = useState('price');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy, order, page]);

  const fetchProducts = async () => {
    const { category, minPrice, maxPrice } = filters;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/categories/${category}/products/`,
        {
          params: { n: 10, page, sort_by: sortBy, order, minPrice, maxPrice },
        }
      );
      setProducts(response.data);
      setTotalPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">All Products</h1>
      
      <div className="mb-6">
        <FilterBar filters={filters} setFilters={setFilters} setSortBy={setSortBy} setOrder={setOrder} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default AllProductsPage;
