import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`px-4 py-2 rounded-l ${
          page === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Previous
      </button>
      <div className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold">
        Page {page} of {totalPages}
      </div>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-r ${
          page === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
