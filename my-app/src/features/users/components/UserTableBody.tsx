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
  Alert,
  Box
} from '@mui/material';
import { User } from '../types';
import UserTableRow from './table/UserTableRow';
import SortIndicator from './table/SortIndicator';

type UserTableBodyProps = {
  users: User[];
  loading: boolean;
  error: string | null;
  page: number;
  per_page: number;
  total: number;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onPageChange: (event: unknown, newPage: number) => void;
  onSort: (key: 'id' | 'first_name' | 'last_name' | 'email' | 'avatar') => void;
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
  const sortableKeys = ['id', 'avatar', 'first_name', 'last_name', 'email'] as const;
  type SortableKey = typeof sortableKeys[number];

  return (
    <Box sx={{ 
      maxWidth: 1200,
      mx: 'auto',
      p: 3
    }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer 
        component={Paper}
        sx={{ 
          maxWidth: '90%',
          mx: 'auto',
          overflowX: 'auto'
        }}
      >
        <Table sx={{ 
          minWidth: 650,
          '& .MuiTableCell-root': {
            px: 3,
            py: 2
          }
        }}>
          <TableHead>
            <TableRow>
              {sortableKeys.map((key) => (
                <TableCell 
                  key={key}
                  onClick={() => key !== 'avatar' ? onSort(key as SortableKey) : null}
                  sx={{ 
                    cursor: key !== 'avatar' ? 'pointer' : 'default',
                    fontWeight: 'bold'
                  }}
                >
                  {key === 'id' ? 'ID' : 
                   key === 'avatar' ? 'Аватар' :
                   key === 'first_name' ? 'Имя' : 
                   key === 'last_name' ? 'Фамилия' : 'Email'}
                  <SortIndicator 
                    isActive={sortConfig.key === key}
                    direction={sortConfig.direction}
                  />
                </TableCell>
              ))}
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
        sx={{ 
          justifyContent: 'center',
          mt: 2
        }}
      />
    </Box>
  );
};

export default UserTableBody;