import { Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import { checkAuth, getAllGames, getGameWithKeys } from '../../services/api';
import { closeSnackBar, login } from '../../services/slices/appSlice';
import Admin from '../Admin/Admin';
import Auth from '../Auth/Auth';
import { Footer } from '../Footer/Footer';
import { Header } from '../Headers/Header';
import { Lk } from '../Lk/Lk';
import { Main } from '../Main/Main';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import './App.scss';
import { loadGames } from '../../services/slices/gameSlice';
import GamePage from '../GamePage/GamePage';
import NotFound from '../NotFound/NotFound';

function App() {
  const { snackBar } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    getAllGames()
      .then((res) => dispatch(loadGames(res)))
      .catch(handleError);
  }, []);

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
          path={'/admin/*'}
          element={
            <ProtectedRoute adminRequire>
              <Admin />
            </ProtectedRoute>
          }></Route>

        <Route path="/auth" element={<Auth />} />
        <Route path="/games/:id" element={<GamePage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
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
