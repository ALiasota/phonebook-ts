import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelectors } from '../redux/auth';

export default function PrivateRoute() {
  const isLogged = useSelector(authSelectors.getIsLoggedIn);

  return isLogged ? <Outlet /> : <Navigate to="/" />;
}
