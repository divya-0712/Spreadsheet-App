import React from 'react';
import useStore from '../store/store';

const SearchBar = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-4 border-b">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        className="p-2 border rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
