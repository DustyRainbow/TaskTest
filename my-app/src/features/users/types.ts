export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

export interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: UserFormData) => void;
  initialValues?: UserFormData;
}
