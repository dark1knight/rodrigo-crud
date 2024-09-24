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
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);

  // Pre-fill the form when the modal is opened with the current user data
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


  return (
    <div className="edit-user-modal-overlay">
      <div className="edit-user-modal-content">
        <button className="edit-user-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Editar Card</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Car Status"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="edit-user-modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
