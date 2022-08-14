import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { authSelectors, authOperations } from '../../redux/auth';
import Button from 'react-bootstrap/Button';

import avatar from './default-avatar.png';

const SignedIn: React.FC = () => {
  const userName = useAppSelector(authSelectors.getUsername);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(authOperations.logOut());
  };
  return (
    <nav className="d-flex justify-content-between rounded border border-1 navbar navbar-expand-lg navbar-light bg-light bg-white">
      <div>
        <img
          src={avatar}
          alt="avatar"
          style={{ width: '32px', marginRight: '10px', marginLeft: '10px' }}
        />
        <span style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Welcome {userName}
        </span>
      </div>
      <Button
        style={{ marginRight: '10px' }}
        type="button"
        onClick={handleLogOut}
      >
        Log out
      </Button>
    </nav>
  );
}

export default SignedIn;