import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { checkAuth } from '../../services/api';
import { login } from '../../services/slices/appSlice';
import { ROLES } from '../../utils/types';

interface IProtectedRoute {
  adminRequire?: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ children, adminRequire }: IProtectedRoute) {
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
