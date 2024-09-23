// src/App.tsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import './App.css';
interface SearchResult {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<SearchResult[]>(`https://localhost:7006/api/Users/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='search-bar-background'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="container">
        <ul>
          {results.map((user) => (
            <li key={user.id}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

