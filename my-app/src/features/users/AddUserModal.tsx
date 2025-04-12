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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addUser } from './usersSlice';
import { User } from './types';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавить нового пользователя</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Имя"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Фамилия"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.first_name || !formData.last_name || !formData.email}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
