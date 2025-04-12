import React, { useEffect } from 'react';
import { useTheme } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterUsers } from './SearchBar';
import { fetchUsers, removeUser, setPage } from './usersSlice';
import { User } from './types';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import { Paper } from '@mui/material';
import UserTableHeader from './components/UserTableHeader';
import UserTableBody from './components/UserTableBody';
import LoadingIndicator from './components/LoadingIndicator';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';

const UsersTable: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { data: users, loading, error, page, per_page, total } = useAppSelector(state => state.users);
  
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const sortableKeys = ['id', 'first_name', 'last_name', 'email'] as const;
  type SortableKey = typeof sortableKeys[number];
  
  const [sortConfig, setSortConfig] = React.useState<{key: SortableKey; direction: 'asc' | 'desc'}>({
    key: 'id',
    direction: 'asc'
  });

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

  const handleSort = (key: SortableKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({key, direction});
  };

  const sortedUsers = React.useMemo(() => {
    const sortableItems = [...filteredUsers];
    if (sortConfig.key) {
      const key = sortConfig.key;
      sortableItems.sort((a, b) => {
        if (key === 'id') {
          const aVal = Number(a[key]);
          const bVal = Number(b[key]);
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aVal = String(a[key]).toLowerCase();
        const bVal = String(b[key]).toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredUsers, sortConfig]);

  return (
    <Paper sx={{ 
      width: '100%', 
      p: 2,
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <UserTableHeader
        title="Пользователи"
        mode={mode}
        onToggleTheme={toggleTheme}
        onAddUser={() => setAddModalOpen(true)}
        onSearch={setSearchTerm}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <UserTableBody
          users={sortedUsers}
          loading={loading}
          error={error}
          page={page}
          per_page={per_page}
          total={total}
          sortConfig={sortConfig}
          onPageChange={handlePageChange}
          onSort={handleSort}
          onEdit={(user) => {
            setSelectedUser(user);
            setEditModalOpen(true);
          }}
          onDelete={(user) => {
            setSelectedUser(user);
            setDeleteDialogOpen(true);
          }}
        />
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

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => selectedUser && handleDelete(selectedUser.id)}
        user={selectedUser}
      />
    </Paper>
  );
};

export default UsersTable;
