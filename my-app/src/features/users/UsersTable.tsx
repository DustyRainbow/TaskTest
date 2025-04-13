import React from 'react';
import { User } from './types';
import { useTheme } from '../../theme';
import useUsers from './hooks/useUsers';
import useUsersModals from './hooks/useUsersModals';
import { Paper } from '@mui/material';
import UserTableHeader from './components/table/UserTableHeader';
import UserTableBody from './components/UserTableBody';
import LoadingIndicator from './components/LoadingIndicator';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';

const UsersTable: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const {
    users,
    loading,
    error,
    page,
    per_page,
    total,
    setSearchTerm,
    handleSort,
    setPage,
    removeUser,
    sortConfig
  } = useUsers();
  
  const { modals } = useUsersModals();
  
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleDelete = (id: number) => {
    removeUser(id);
    modals.delete.closeDialog();
  };

  return (
    <Paper sx={{ 
      width: '95%', 
      maxWidth: 1200,
      p: 2,
      bgcolor: 'background.default',
      color: 'text.primary',
      mx: 'auto'
    }}>
      <UserTableHeader
        title="Пользователи"
        mode={mode}
        onToggleTheme={toggleTheme}
        onAddUser={modals.add.openModal}
        onSearch={setSearchTerm}
      />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <UserTableBody
          users={users}
          loading={loading}
          error={error}
          page={page}
          per_page={per_page}
          total={total}
          sortConfig={sortConfig}
          onPageChange={handlePageChange}
          onSort={handleSort}
          onEdit={modals.edit.openModal}
          onDelete={modals.delete.openDialog}
        />
      )}

      <AddUserModal 
        open={modals.add.open} 
        onClose={modals.add.closeModal} 
      />

      {modals.edit.user && (
        <EditUserModal
          open={modals.edit.open}
          onClose={modals.edit.closeModal}
          user={modals.edit.user}
        />
      )}

      {modals.delete.user && (
        <DeleteConfirmationDialog
          open={modals.delete.open}
          onClose={modals.delete.closeDialog}
          onConfirm={() => modals.delete.user && handleDelete(modals.delete.user.id)}
          user={modals.delete.user}
        />
      )}
    </Paper>
  );
};

export default UsersTable;