import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelectors } from '../redux/auth';

export default function PublicRoute() {
  const isLogged = useSelector(authSelectors.getIsLoggedIn);

  return isLogged ? <Navigate to="contacts" /> : <Outlet />;
}
