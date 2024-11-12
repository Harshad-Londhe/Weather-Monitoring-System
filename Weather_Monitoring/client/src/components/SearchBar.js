// src/components/SearchBar.js
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity(''); // Clear input after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
