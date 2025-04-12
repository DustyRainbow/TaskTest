import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addUser } from './usersSlice';
import { User } from './types';
import BaseModal from '../../shared/components/BaseModal';
import UserForm from './components/UserForm';
import { Button } from '@mui/material';

const AddUserModal: React.FC<{ 
  open: boolean; 
  onClose: () => void 
}> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.data);
  
  const [formData, setFormData] = useState<Omit<User, 'id'>>({ 
    first_name: '',
    last_name: '',
    email: '',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newUser: User = {
      ...formData,
      id: Math.max(0, ...users.map(u => u.id)) + 1
    };
    dispatch(addUser(newUser));
    onClose();
    setFormData({ 
      first_name: '',
      last_name: '',
      email: '',
      avatar: 'https://reqres.in/img/faces/1-image.jpg'
    });
  };

  const isFormValid = formData.first_name && formData.last_name && formData.email;

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Добавить нового пользователя"
      actions={
        <>
          <Button onClick={onClose}>Отмена</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!isFormValid}
          >
            Добавить
          </Button>
        </>
      }
    >
      <UserForm 
        user={formData} 
        onChange={handleChange}
      />
    </BaseModal>
  );
};

export default AddUserModal;
