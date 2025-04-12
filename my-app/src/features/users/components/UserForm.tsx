import React from 'react';
import {
  TextField,
  Box,
  FormControl
} from '@mui/material';
import { User } from '../types';

type UserFormProps = {
  user?: Partial<User>;
  onChange: (field: keyof User, value: string) => void;
};

const UserForm: React.FC<UserFormProps> = ({ user = {}, onChange }) => {
  return (
    <Box component="form" sx={{ mt: 1 }}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Имя"
          value={user.first_name || ''}
          onChange={(e) => onChange('first_name', e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Фамилия"
          value={user.last_name || ''}
          onChange={(e) => onChange('last_name', e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Email"
          type="email"
          value={user.email || ''}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

export default UserForm;
