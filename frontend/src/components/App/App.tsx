import { Snackbar } from '@mui/material';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import {
  getAllGameSelections,
  getAllGames,
  getAllSliders,
  getAllTags,
  getLastSales
} from '../../services/api';
import { closeSnackBar } from '../../services/slices/appSlice';
import { loadGameSelections } from '../../services/slices/gameSelectionSlice';
import { loadGames, loadSaledGames } from '../../services/slices/gameSlice';
import { loadSliders } from '../../services/slices/sliderSlice';
import { loadTags } from '../../services/slices/tagSlice';
import { INFOCHAPTER } from '../../utils/config';
import Admin from '../Admin/Admin';
import AdminLink from '../AdminLink/AdminLink';
import Auth from '../Auth/Auth';
import { Footer } from '../Footer/Footer';
import GamePage from '../GamePage/GamePage';
import { Header } from '../Header/Header';
import InfoChapter from '../InfoChapter/InfoChapter';
import { Lk } from '../Lk/Lk';
import { Main } from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import ReviewsPage from '../ReviewsPage/ReviewsPage';
import SupportForm from '../SupportForm/SupportForm';
import './App.scss';

function App() {
  const { snackBar } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    //cache
    const cacheSaledGames = localStorage.getItem('saledGames');
    const cacheGames = localStorage.getItem('games');
    const cacheTags = localStorage.getItem('tags');
    if (cacheSaledGames) {
      dispatch(loadSaledGames(JSON.parse(cacheSaledGames)));
    }

    if (cacheGames) {
      dispatch(loadGames(JSON.parse(cacheGames)));
    }

    if (cacheTags) {
      dispatch(loadTags(JSON.parse(cacheTags)));
    }
    //api
    getAllGames()
      .then((res) => {
        localStorage.setItem('games', JSON.stringify(res));
        dispatch(loadGames(res));
      })
      .catch(handleError);
    getAllTags()
      .then((tags) => {
        localStorage.setItem('tags', JSON.stringify(tags));
        dispatch(loadTags(tags));
      })
      .catch(handleError);
    getAllSliders()
      .then((res) => dispatch(loadSliders(res)))
      .catch(handleError);
    getAllGameSelections()
      .then((res) => dispatch(loadGameSelections(res)))
      .catch(handleError);
    getLastSales()
      .then((res) => {
        localStorage.setItem('saledGames', JSON.stringify(res));
        dispatch(loadSaledGames(res));
      })
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
          }
        ></Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/games/:id" element={<GamePage />} />
        {INFOCHAPTER.map((item, index) => (
          <Route
            key={index}
            path={`/${item.link}`}
            element={<InfoChapter heading={item.name} link={item.link} />}
          />
        ))}
        <Route path="/support" element={<SupportForm />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackBar.isOpened}
        autoHideDuration={5000}
        onClose={() => dispatch(closeSnackBar())}
        message={snackBar.message}
      />
      {localStorage.getItem('admin') && <AdminLink />}
    </>
  );
}

export default App;
