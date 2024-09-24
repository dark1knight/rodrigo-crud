// src/App.tsx
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

import CarCard from './components/carCard';

import axios from 'axios';
import Modal from './components/cardCreateModal';
import ConfirmRemoveModal from './components/confirmRemove';
import EditModal from './components/editModal';
import './App.css';
import { Car } from './model/car';
interface SearchResult {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [result, setResult] = useState<Car[]>([]);

  const [cars, setCars] = useState<Car[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<Car[]>(`https://localhost:7006/api/Cars/search?query=${query}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCreateCar = async (name: string, status: string, photoBase64: string) => {
    const newCar = {
      name,
      status,
      photo: {
        base64: photoBase64 || null // Handle empty photo input
      }
    };
  
    try {
      const response = await axios.post<Car>('https://localhost:7006/api/cars', newCar);
      setCars((prevCars) => [...prevCars, response.data]); // Update the car list with the new car
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };
  const removeCar = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7006/api/cars/${id}`);
      setCars(cars.filter((car) => car.id !== id))
      setResult(result.filter((car) => car.id !== id)); 
      setSelectedCar(null); // Reset the selected car
    } catch (error) {
      console.error('Error removing car:', error);
    }
  };

  const openConfirmRemoveModal = (car: Car) => {
    setSelectedCar(car); 
    setIsConfirmRemoveOpen(true); 
  };
  const confirmRemoveCar = () => {
    if (selectedCar) {
      removeCar(selectedCar.id); // Call remove user logic
      setIsConfirmRemoveOpen(false); // Close the confirmation modal
    }
  };

  const openEditModal = (car: Car) => {
    setSelectedCar(car); // Set the car to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };
  const handleEditCar = async (id: number, name: string, status: string, photoBase64: string | null) => {
    try {
      const updatedCar = { name, status, photo: { base64: photoBase64 || '' } };
      const response = await axios.put<Car>(`https://localhost:7006/api/cars/${id}`, updatedCar);
      setCars(cars.map(car => car.id === id ? response.data : car));
      setResult(result.map(car => car.id === id ? response.data : car));
    } catch (error) {
      console.error('Error editing car:', error);
    }
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
          onSubmit={handleCreateCar}
        />
        {isEditModalOpen && selectedCar && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditCar}
          carToEdit={selectedCar}
        />
        )}
        <ConfirmRemoveModal
        isOpen={isConfirmRemoveOpen}
        onClose={() => setIsConfirmRemoveOpen(false)}
        onConfirm={confirmRemoveCar}
        car={selectedCar ? selectedCar : null}
        />
     <div className="results-container">
      {result.map((car) => (
        <CarCard
          key={car.id}
          car={car}  
          handleRemoveCar={() => openConfirmRemoveModal(car)}
          handleEditCar={() => openEditModal(car)}  
        />
      ))}
      </div>
    </div>
  </div>
  );
};

export default App;

