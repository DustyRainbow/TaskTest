import { User } from '../features/users/types';

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  per_page: number;
}

export const fetchUsers = async (page: number = 1, per_page: number = 5): Promise<UsersResponse> => {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${per_page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    return {
      data: data.data,
      total: data.total,
      page: data.page,
      per_page: data.per_page
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData: { 
  first_name: string; 
  last_name: string; 
  email: string 
}) => {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: { 
  first_name: string; 
  last_name: string; 
  email: string 
}) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
