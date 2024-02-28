import './App.scss';
import { Header } from '../Headers/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Lk } from '../Lk/Lk';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Auth from '../Auth/Auth';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Snackbar } from '@mui/material';
import { closeSnackBar, login } from '../../services/slices/appSlice';
import { checkAuth } from '../../services/api';
import { useEffect } from 'react';
import Admin from '../Admin/Admin';

function App() {
  const { snackBar } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkAuth(token)
        .then((res) => {
          dispatch(login(res));
        })
        .catch(console.log);
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} element={<Main />} />
        <Route
          path={'/lk'}
          element={
            <ProtectedRoute>
              <Lk />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/admin'}
          element={
            <ProtectedRoute adminRequire>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackBar.isOpened}
        autoHideDuration={5000}
        onClose={() => dispatch(closeSnackBar())}
        message={snackBar.message}
      />
    </>
  );
}

export default App;
