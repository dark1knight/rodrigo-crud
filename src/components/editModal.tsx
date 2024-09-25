// src/components/EditUserModal.tsx
import React, { useState, useEffect } from 'react';
import './editModal.css';
import {Car} from '../model/car'

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, name: string, status: string, photoBase64: string | null) => void;
  carToEdit: Car | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSubmit, carToEdit }) => {
  const [isVisible, setIsVisible] = useState(false);  // Handles visibility
  const [isClosing, setIsClosing] = useState(false); 

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);  
      setTimeout(() => setIsVisible(true), 50);  
    } else if (isVisible) {
      setIsClosing(true);  
      setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 400);  
    }
  }, [isOpen, isVisible]);

  useEffect(() => {
    if (isOpen && carToEdit) {
      setName(carToEdit.name);
      setStatus(carToEdit.status);
      setPhotoBase64(carToEdit.photo?.base64 || null);
    }
  }, [isOpen, carToEdit]);
  if (!isOpen || !carToEdit) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoBase64(base64String.split(',')[1]); // Remove the prefix
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    if (name && status) {
      onSubmit(carToEdit.id, name, status, photoBase64);
      setName('');
      setStatus('');
      setPhotoBase64(null);
      onClose();
    }
  };

  const modalClass = isVisible && !isClosing ? 'edit-user-modal-overlay open' : 'edit-user-modal-overlay';


  return (
    <div className={modalClass} onClick={onClose}>
      <div className="edit-user-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="edit-user-close-button" onClick={onClose}>
          &times;
        </button>
        <h2 style={{ color: 'purple', fontSize: 22 }}>Editar Carro</h2>
        <div className="card-divider-Card"></div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do Carro"
        />

        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status do Carro"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="card-divider-edit"></div>
        <div className="edit-user-modal-buttons">
          <button onClick={handleSubmit} style={{ backgroundColor: 'orange' }}>
           <text style={{color:'white'}}>Atualizar Carro</text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
