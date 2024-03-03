import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../services/api';
import { ROLES } from '../../utils/types';
import { login } from '../../services/slices/appSlice';

interface IProtectedRoute {
  adminRequire?: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ children, adminRequire }: IProtectedRoute) {
  const { loggedIn, user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
      .then((userData) => {
        if (!loggedIn) {
          return navigate('/auth');
        } else if (adminRequire && userData.role !== ROLES.ADMIN) {
          return navigate('/auth');
        } else {
          setLoading(false);
          return dispatch(login(userData));
        }
      })
      .catch(() => {
        navigate('/auth');
      });
  }, []);

  if (loading) {
    return null; // Или какой-то компонент загрузки
  }

  if (!loggedIn || (adminRequire && user.role !== ROLES.ADMIN)) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}
