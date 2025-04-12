import React, { useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Box, IconButton, TablePagination,
  CircularProgress, Alert, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Typography
} from '@mui/material';
import SearchBar, { filterUsers } from './SearchBar';
import { Edit, Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers, addUser, updateUser, removeUser, setPage } from './usersSlice';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import { User } from './types';

const UsersTable: React.FC = () => {
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

  const handlePageChange = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage + 1));
  };

  return (
    <Paper sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Пользователи</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
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
                  <TableCell>ID</TableCell>
                  <TableCell>Аватар</TableCell>
                  <TableCell>Имя</TableCell>
                  <TableCell>Фамилия</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
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
