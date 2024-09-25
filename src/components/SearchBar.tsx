// src/components/SearchBar.tsx
import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
      <div className="search-bar-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Digite aqui sua busca..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch className='search-icon'/>
        </button>
    </div>
  );
};

export default SearchBar;
