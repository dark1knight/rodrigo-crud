import React from 'react';
import './userCard.css';
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  handleRemoveUser: (id: number) => void;
  handleEditUser: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, handleRemoveUser, handleEditUser }) => {
  return (
    <div className="user-card">
      <img src="https://via.placeholder.com/80" alt="User Avatar" className="user-avatar" />
      <div className="user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="user-actions">
        <button onClick={() => handleRemoveUser(user.id)} className="remove-button">
          <FaTrash style={{ marginRight: '5px' }} />
          Remover</button>
        <button onClick={() => handleEditUser(user.id)} className="edit-button">
          <FaPencilAlt style={{ marginRight: '5px' }} />
          Editar</button>
      </div>
    </div>
  );
};

export default UserCard;