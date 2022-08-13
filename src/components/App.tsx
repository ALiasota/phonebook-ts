import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authOperations, authSelectors } from '../redux/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UserMenu from './UserMenu';

const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./LogIn'));
const Contacts = lazy(() => import('./Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container
      className="p-3 rounded border border-1 bg-light mt-2"
      style={{ maxWidth: '500px' }}
    >
      {isFetchingCurrentUser ? (
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <>
          <UserMenu />
          <Suspense fallback={<h1>Loading....</h1>}>
            <Routes>
              <Route path="/" element={<PublicRoute />}>
                <Route path="/" element={<Navigate replace to="login" />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Navigate replace to="contacts" />} />
                <Route path="contacts" element={<Contacts />} />
              </Route>
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Suspense>
        </>
      )}
    </Container>
  );
};

export default App;
