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
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [result, setResult] = useState<Car[]>([]);

  const [cars, setCars] = useState<Car[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] = useState(false);

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const currentData = result.length > 0 ? result : cars;
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = currentData.slice(indexOfFirstCar, indexOfLastCar);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.get<Car[]>(`https://app-rodrigonakamuta-api.azurewebsites.net/api/Cars/search?query=${query}`);
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
      const response = await axios.post<Car>('https://app-rodrigonakamuta-api.azurewebsites.net/api/cars', newCar);
      setCars((prevCars) => [...prevCars, response.data]); 
      setResult((prevCars) => [...prevCars, response.data]);
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };
  const removeCar = async (id: number) => {
    try {
      await axios.delete(`https://app-rodrigonakamuta-api.azurewebsites.net/api/cars/${id}`);
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
      removeCar(selectedCar.id); 
      setIsConfirmRemoveOpen(false); 
    }
  };

  const openEditModal = (car: Car) => {
    setSelectedCar(car); 
    setIsEditModalOpen(true); 
  };
  const handleEditCar = async (id: number, name: string, status: string, photoBase64: string | null) => {
    try {
      const updatedCar = { name, status, photo: { base64: photoBase64 || '' } };
      const response = await axios.put<Car>(`https://app-rodrigonakamuta-api.azurewebsites.net/api/cars/${id}`, updatedCar);
      setCars(cars.map(car => car.id === id ? response.data : car));
      setResult(result.map(car => car.id === id ? response.data : car));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error editing car:', error);
    }
  };


  return (
  <div className='background-color'>
    <div className='search-bar-background'>
        <SearchBar onSearch={handleSearch} />
    </div>
    <div className="container">
        <div className="create-user-section">
          <p className='Result-text'>Resultados da Busca</p>
          <button className='Novo-card' onClick={() => setIsModalOpen(true)}><text style={{color:'white'}}>Novo Card</text></button>
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
      {currentCars.map((car) => (
        <CarCard
          key={car.id}
          car={car}  
          handleRemoveCar={() => openConfirmRemoveModal(car)}
          handleEditCar={() => openEditModal(car)}  
        />
      ))}
      </div>
       {/* Pagination Component */}
       <Pagination
        currentPage={currentPage}
        totalItems={result.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)} // Update current page
      />
    </div>
  </div>
  );
};

export default App;

