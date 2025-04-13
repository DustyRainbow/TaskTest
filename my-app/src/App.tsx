import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import UsersTable from './features/users/UsersTable';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UsersTable />
    </ThemeProvider>
  );
};

export default App;