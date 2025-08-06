import React from 'react';

const Filter = ({ sortBy, setSortBy }) => {
  return (
    <div className="div flex flex-row p-4 text-white ">
      <div className="flex items-center text-black">
        <h2>Order by:</h2>
      </div>
      <div className="flex space-x-4 mx-4">
        <button
          className={`bg-blue-800 rounded-lg p-2 text-white ${sortBy === 'newest' ? 'font-bold' : ''}`}
          onClick={() => setSortBy('newest')}
        >
          Newest
        </button>
        <button
          className={`bg-blue-800 rounded-lg p-2 text-white ${sortBy === 'popular' ? 'font-bold' : ''}`}
          onClick={() => setSortBy('popular')}
        >
          Popular
        </button>
      </div>
    </div>
  );
};

export default Filter;
