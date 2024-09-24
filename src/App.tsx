// src/App.tsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserCard from './components/userCard'
import axios from 'axios';
import Modal from './components/cardCreateModal';
import ConfirmRemoveModal from './components/confirmRemove';
import EditModal from './components/editModal';
import './App.css';
interface SearchResult {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [users, setUsers] = useState<SearchResult[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SearchResult | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<SearchResult[]>(`https://localhost:7006/api/Users/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCreateUser = async (name: string, email: string) => {
    const newUser = { name, email };

    try {
      const response = await axios.post<SearchResult>('https://localhost:7006/api/users', newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleRemoveUser = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7006/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setResults(results.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };
  const openConfirmRemoveModal = (user: SearchResult) => {
    setSelectedUser(user); // Set the user to be removed
    setIsConfirmRemoveOpen(true); // Open the confirmation modal
  };

  const confirmRemoveUser = () => {
    if (selectedUser) {
      handleRemoveUser(selectedUser.id); // Call remove user logic
      setIsConfirmRemoveOpen(false); // Close the confirmation modal
    }
  };
  const handleEditUser = async (id: number, name: string, email: string) => {
    try {
      const response = await axios.put<SearchResult>(`https://localhost:7006/api/users/${id}`, { name, email });
      setUsers(users.map(user => user.id === id ? response.data : user));
      setResults(results.map(user => user.id === id ? response.data : user));
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const openEditModal = (user: SearchResult) => {
    setSelectedUser(user); // Set the user to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  return (
  <div>
    <div className='search-bar-background'>
        <SearchBar onSearch={handleSearch} />
    </div>
    <div className="container">
        <div className="create-user-section">
          <p>Resultados da Busca</p>
          <button onClick={() => setIsModalOpen(true)}>Novo Card</button>
        </div>
        {/* Modal for Creating User */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateUser}
        />
        {selectedUser && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditUser}
          currentUser={selectedUser}
        />
        )}
        <ConfirmRemoveModal
        isOpen={isConfirmRemoveOpen}
        onClose={() => setIsConfirmRemoveOpen(false)}
        onConfirm={confirmRemoveUser}
        userName={selectedUser ? selectedUser.name : ''}
        />
      <div className='results-container'>
        {results.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              handleRemoveUser={() => openConfirmRemoveModal(user)}
              handleEditUser={() => openEditModal(user)}
            />
          ))}
      </div>
    </div>
  </div>
  );
};

export default App;

