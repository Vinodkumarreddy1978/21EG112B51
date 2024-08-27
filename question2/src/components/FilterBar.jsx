import React from 'react';

const FilterBar = ({ filters, setFilters, setSortBy, setOrder }) => {
  const validCategories = [
    "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger",
    "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker",
    "Headset", "Laptop", "PC"
  ];
  const validCompanies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

  return (
    <div className="flex flex-wrap justify-between mb-4 gap-4 p-4 bg-white shadow-lg rounded-lg">
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {validCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={filters.company}
        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Companies</option>
        {validCompanies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>

      <select
        value={filters.rating}
        onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={0}>All Ratings</option>
        <option value={4}>4 Stars & Up</option>
        <option value={3}>3 Stars & Up</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
        <option value="discount">Sort by Discount</option>
      </select>

      <select
        onChange={(e) => setOrder(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterBar;
