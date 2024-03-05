import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../services/api';
import { login } from '../../services/slices/appSlice';
import { ROLES } from '../../utils/types';

interface IProtectedRoute {
  adminRequire?: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ children, adminRequire }: IProtectedRoute) {
  const { loggedIn, user } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth()
      .then((userData) => {
        if (adminRequire && userData.role !== ROLES.ADMIN) {
          return navigate('/auth');
        } else {
          return dispatch(login(userData));
        }
      })
      .catch(() => {
        navigate('/auth');
      });
  }, []);

  return <>{children}</>;
}
