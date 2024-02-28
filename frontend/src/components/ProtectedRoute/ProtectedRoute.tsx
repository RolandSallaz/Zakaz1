import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { ROLES } from '../../utils/types';

interface IProtectedRoute {
  adminRequire?: boolean;
  children: React.ReactNode;
}

export function ProtectedRoute({ children, adminRequire }: IProtectedRoute) {
  const { loggedIn, user } = useAppSelector((state) => state.app);
  if (adminRequire && !(user.role == ROLES.ADMIN)) {
    return <Navigate to="/auth" />;
  }
  return loggedIn ? <>{children}</> : <Navigate to="/auth" />;
}
