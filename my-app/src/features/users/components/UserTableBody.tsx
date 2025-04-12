import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TablePagination,
  Alert
} from '@mui/material';
import { User } from '../types';
import UserTableRow from './UserTableRow';
import SortIndicator from './SortIndicator';

type UserTableBodyProps = {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  per_page: number;
  total: number;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onPageChange: (event: unknown, newPage: number) => void;
  onSort: (key: 'id' | 'first_name' | 'last_name' | 'email') => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

const UserTableBody: React.FC<UserTableBodyProps> = ({
  users,
  loading,
  error,
  page,
  per_page,
  total,
  sortConfig,
  onPageChange,
  onSort,
  onEdit,
  onDelete
}) => {
  const sortableKeys = ['id', 'first_name', 'last_name', 'email'] as const;
  type SortableKey = typeof sortableKeys[number];

  return (
    <>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {sortableKeys.map((key) => (
                <TableCell 
                  key={key}
                  onClick={() => onSort(key as SortableKey)}
                  style={{ cursor: 'pointer' }}
                >
                  {key === 'id' ? 'ID' : 
                   key === 'first_name' ? 'Имя' : 
                   key === 'last_name' ? 'Фамилия' : 'Email'}
                  <SortIndicator 
                    isActive={sortConfig.key === key}
                    direction={sortConfig.direction}
                  />
                </TableCell>
              ))}
              <TableCell>Аватар</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[per_page]}
        component="div"
        count={total}
        rowsPerPage={per_page}
        page={page - 1}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default UserTableBody;
