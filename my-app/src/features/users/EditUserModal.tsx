import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Box
} from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { updateUser } from './usersSlice';
import { User } from './types';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateUser(formData));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактировать пользователя</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Имя"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Фамилия"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
