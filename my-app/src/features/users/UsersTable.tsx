import React, { useEffect } from 'react';
import { useTheme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SearchBar, { filterUsers } from './SearchBar';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Box, IconButton, TablePagination,
  CircularProgress, Alert, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Typography
} from '@mui/material';
import { Brightness4, Brightness7, Edit, Delete } from '@mui/icons-material';
import { fetchUsers, removeUser, setPage } from './usersSlice';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import { User } from './types';

const UsersTable: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  
  const dispatch = useAppDispatch();
  const { data: users, loading, error, page, per_page, total } = useAppSelector(state => state.users);
  
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = filterUsers(users, searchTerm);

  useEffect(() => {
    dispatch(fetchUsers({page, per_page}));
  }, [dispatch, page, per_page]);

  const handleDelete = (id: number) => {
    dispatch(removeUser(id));
    setDeleteDialogOpen(false);
  };

  const [sortConfig, setSortConfig] = React.useState<{key: SortableKey; direction: 'asc' | 'desc'}>({key: 'id', direction: 'asc'});

  const handlePageChange = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1));
  };

  const handleSort = (key: SortableKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({key, direction});
  };

  const sortableKeys = ['id', 'first_name', 'last_name', 'email'] as const;
  type SortableKey = typeof sortableKeys[number];

  const sortedUsers = React.useMemo(() => {
    const sortableItems = [...filteredUsers];
    if (sortConfig.key) {
      const key = sortConfig.key;
      sortableItems.sort((a, b) => {
        // Special case for numeric ID comparison
        if (key === 'id') {
          const aVal = Number(a[key]);
          const bVal = Number(b[key]);
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        // Standard string comparison for other fields
        const aVal = String(a[key]).toLowerCase();
        const bVal = String(b[key]).toLowerCase();
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredUsers, sortConfig]);

  const getSortIndicator = (key: SortableKey) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <Paper sx={{ 
      width: '100%', 
      p: 2,
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Пользователи</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <SearchBar onSearch={setSearchTerm} />
          <Button 
            variant="contained" 
            onClick={() => setAddModalOpen(true)}
          >
            Добавить пользователя
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell 
                    onClick={() => handleSort('id')}
                    style={{cursor: 'pointer'}}
                  >
                    ID {getSortIndicator('id')}
                  </TableCell>
                  <TableCell>Аватар</TableCell>
                  <TableCell 
                    onClick={() => handleSort('first_name')}
                    style={{cursor: 'pointer'}}
                  >
                    Имя {getSortIndicator('first_name')}
                  </TableCell>
                  <TableCell 
                    onClick={() => handleSort('last_name')}
                    style={{cursor: 'pointer'}}
                  >
                    Фамилия {getSortIndicator('last_name')}
                  </TableCell>
                  <TableCell 
                    onClick={() => handleSort('email')}
                    style={{cursor: 'pointer'}}
                  >
                    Email {getSortIndicator('email')}
                  </TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <img 
                        src={user.avatar} 
                        alt={`${user.first_name} ${user.last_name}`}
                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                      />
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => {
                          setSelectedUser(user);
                          setEditModalOpen(true);
                        }}
                      >
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton 
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
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
            onPageChange={handlePageChange}
          />
        </>
      )}

      <AddUserModal 
        open={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
      />

      {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить пользователя {selectedUser?.first_name} {selectedUser?.last_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
          <Button 
            onClick={() => selectedUser && handleDelete(selectedUser.id)} 
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UsersTable;