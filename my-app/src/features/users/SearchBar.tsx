import React from 'react';
import { TextField, Box } from '@mui/material';
import { User } from './types';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Box sx={{ minWidth: 300 }}>
      <TextField
        fullWidth
        label="Поиск по имени/email"
        variant="outlined"
        size="small"
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
};

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  const searchLower = searchTerm.toLowerCase();
  return users.filter(user => (
    user.first_name.toLowerCase().includes(searchLower) ||
    user.last_name.toLowerCase().includes(searchLower) ||
    user.email.toLowerCase().includes(searchLower)
  ));
};

export default SearchBar;
