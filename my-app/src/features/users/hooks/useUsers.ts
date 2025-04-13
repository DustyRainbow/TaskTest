import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchUsers, removeUser, setPage } from '../usersSlice';
import { User } from '../types';
import { filterUsers } from '../SearchBar';
import { RootState } from '../../../app/store';

const useUsers = () => {
  const dispatch = useAppDispatch();
  const { data: users, loading, error, page, per_page, total } = useAppSelector((state: RootState) => state.users);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' }>({
    key: 'id',
    direction: 'asc',
  });

  useEffect(() => {
    dispatch(fetchUsers({ page, per_page }));
  }, [dispatch, page, per_page]);

  const filteredUsers = filterUsers(users, searchTerm);

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (sortConfig.direction === 'asc') {
      return aVal < bVal ? -1 : 1;
    }
    return aVal > bVal ? -1 : 1;
  });

  return {
    users: sortedUsers,
    loading,
    error,
    page,
    per_page,
    total,
    setSearchTerm,
    handleSort,
    setPage: (newPage: number) => dispatch(setPage(newPage)),
    removeUser: (id: number) => dispatch(removeUser(id)),
    sortConfig,
  };
};

export default useUsers;
