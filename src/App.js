import './styles/style.css';
import { Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider, Typography } from '@mui/material';
import HomePage from './pages/HomePage';
import theme from './themes/Theme';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ p: 4 }} className="app-container">
        <header className="app-header">
          <Typography sx={{ pb: 2, fontWeight: 'bold', fontSize: 42 }} variant="h1">Pokedex</Typography>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
