import React from 'react';
import { TableCell, TableRow, IconButton, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { User } from '../types';

type UserTableRowProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>
        <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      </TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(user)}>
          <Edit color="primary" />
        </IconButton>
        <IconButton onClick={() => onDelete(user)}>
          <Delete color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
