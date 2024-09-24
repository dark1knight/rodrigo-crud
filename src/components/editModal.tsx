// src/components/EditUserModal.tsx
import React, { useState, useEffect } from 'react';
import './editModal.css';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, name: string, email: string) => void;
  currentUser: { id: number; name: string; email: string }; // Current user to edit
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Pre-fill the form when the modal is opened with the current user data
  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [isOpen, currentUser]);

  const handleSubmit = () => {
    if (name && email) {
      onSubmit(currentUser.id, name, email);
      onClose(); // Close modal after submission
    }
  };

  if (!isOpen) return null;

  return (
    <div className="edit-user-modal-overlay">
      <div className="edit-user-modal-content">
        <button className="edit-user-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Edit User</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
