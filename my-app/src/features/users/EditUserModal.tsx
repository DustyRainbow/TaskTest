import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateUser } from './usersSlice';
import { User } from './types';
import BaseModal from '../../shared/components/BaseModal';
import UserForm from './components/UserForm';
import { Button } from '@mui/material';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<User>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateUser(formData));
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Редактировать пользователя"
      actions={
        <>
          <Button onClick={onClose}>Отмена</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
          >
            Сохранить
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

export default EditUserModal;
