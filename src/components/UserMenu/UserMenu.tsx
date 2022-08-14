// import { useSelector } from 'react-redux';
import React from 'react';
import { authSelectors } from '../../redux/auth';
import { useAppSelector } from '../../redux/hooks';
import SignedIn from './signedIn';
import SignedOut from './signedOut';

const UserMenu: React.FC = () => {
  const isLoggedIn = useAppSelector(authSelectors.getIsLoggedIn);

  return <>{isLoggedIn ? <SignedIn /> : <SignedOut />}</>;
}

export default UserMenu;
