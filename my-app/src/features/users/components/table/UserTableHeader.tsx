import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import SearchBar from '../../SearchBar';

type UserTableHeaderProps = {
  title: string;
  mode: 'light' | 'dark';
  onToggleTheme: () => void;
  onAddUser: () => void;
  onSearch: (term: string) => void;
};

const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  title,
  mode,
  onToggleTheme,
  onAddUser,
  onSearch
}) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 2 
    }}>
      <Typography variant="h4" component="h1">{title}</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <IconButton onClick={onToggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <SearchBar onSearch={onSearch} />
        <Button 
          variant="contained" 
          onClick={onAddUser}
        >
          Добавить пользователя
        </Button>
      </Box>
    </Box>
  );
};

export default UserTableHeader;
