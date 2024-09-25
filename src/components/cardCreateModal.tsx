import React, { useState, useEffect } from 'react';
import {Car} from '../model/car'
import './cardCreateModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, status: string, photoBase64: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false); 
  const [shouldRender, setShouldRender] = useState(isOpen); 
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Add slight delay to allow for smooth transitions
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    } else {
      setIsVisible(false); // Trigger closing animation
      setTimeout(() => setShouldRender(false), 400); // Wait for animation to finish, then unmount
    }
  }, [isOpen]);


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

  const modalClass = isVisible ? 'modal-overlay open' : 'modal-overlay';
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {  // Ensure click is outside the modal content
      onClose();
    }
  };

  return (
    <div className={modalClass} onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2 style={{color:'purple', fontSize: 22}}>Criar Carro</h2>
        <div className="card-divider-Card"></div>
          Insira o nome do Carro
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Carro"
          />
          Informe o Status do Carro
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
        <div className="card-divider-Card"></div>
        <div className="modal-buttons">
          <button onClick={handleSubmit} style={{backgroundColor:'orange'}}>Criar Card</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;