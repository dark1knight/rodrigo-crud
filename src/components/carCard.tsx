import React from 'react';
import './carCard.css'; 
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import {Car} from '../model/car';

interface CarCardProps {
    car: Car;
    handleRemoveCar: (id: number) => void;
    handleEditCar: (id: number) => void;
  }
  
  const CarCard: React.FC<CarCardProps> = ({ car, handleRemoveCar, handleEditCar }) => {
    return (
      <div className="car-card">
        <img 
          src={car.photo ? `data:image/png;base64,${car.photo.base64}` : "https://via.placeholder.com/80"}
          alt={`${car.name} Avatar`} 
          className="car-avatar" 
        />
        <div className="card-divider"></div>
        <div className="car-info">
          <p><strong>Nome:</strong> {car.name}</p>
          <p><strong>Status:</strong> {car.status}</p>
        </div>
        <div className="car-actions">
          <button onClick={() => handleRemoveCar(car.id)} className="remove-button">
            <FaTrash style={{ marginRight: '5px', color: 'red'}} /><text style={{color:'grey'}}>Remover</text> 
          </button>
          <button onClick={() => handleEditCar(car.id)} className="edit-button">
            <FaPencilAlt style={{ marginRight: '5px', color:'orange'}} /><text style={{color:'grey'}}>Editar</text>
          </button>
        </div>
      </div>
    );
  };
  
  export default CarCard;