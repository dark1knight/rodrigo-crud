import React, { useState } from 'react';
import {Car} from '../model/car'
import './cardCreateModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, status: string, photoBase64: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoBase64(base64String.split(',')[1]); // Remove the data URL prefix, store base64 string
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };
  const handleSubmit = () => {
    if (name && status) {
      onSubmit(name, status, photoBase64);
      setName('');
      setStatus('');
      setPhotoBase64('');
      onClose();
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Criar Carro</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Car Name"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Car Status"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Handle file selection and Base64 conversion
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;