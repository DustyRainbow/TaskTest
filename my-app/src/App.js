import { Container, CssBaseline } from '@mui/material';
import UsersTable from './features/users/UsersTable';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <UsersTable />
      </Container>
    </>
  );
}

export default App;
