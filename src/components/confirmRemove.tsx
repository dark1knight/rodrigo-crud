// src/components/ConfirmRemoveModal.tsx
import React from 'react';
import './confirmRemove.css';
import { FaTrashAlt } from 'react-icons/fa';
import { Car } from '../model/car';

interface ConfirmRemoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  car: Car | null;
}

const ConfirmRemoveModal: React.FC<ConfirmRemoveModalProps> = ({ isOpen, onClose, onConfirm, car }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-remove-modal-overlay">
      <div className="confirm-remove-modal-content">
        <button className="confirm-remove-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="confirm-remove-icon-container">
          <div className="confirm-remove-icon-circle">
            <FaTrashAlt className="confirm-remove-icon" />
          </div>
        </div>
        <h2>Excluir</h2>
        <p> CERTEZA QUE DESEJA EXCLUIR?</p>
        <div className="confirm-remove-modal-buttons">
          <button onClick={onConfirm} className="confirm-remove-button">Confirm</button>
          <button onClick={onClose} className="cancel-remove-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRemoveModal;
