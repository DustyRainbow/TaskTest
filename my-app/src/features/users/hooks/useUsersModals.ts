import { useState } from 'react';
import { User } from '../types';

const useUsersModals = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  return {
    modals: {
      add: {
        open: addModalOpen,
        openModal: openAddModal,
        closeModal: closeAddModal
      },
      edit: {
        open: editModalOpen,
        openModal: openEditModal,
        closeModal: closeEditModal,
        user: selectedUser
      },
      delete: {
        open: deleteDialogOpen,
        openDialog: openDeleteDialog,
        closeDialog: closeDeleteDialog,
        user: selectedUser
      }
    }
  };
};

export default useUsersModals;
