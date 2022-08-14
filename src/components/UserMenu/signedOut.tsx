import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

const SignedOut: React.FC = () => {
  return (
    <nav className="rounded border border-1 navbar navbar-expand-lg navbar-light  justify-content-between bg-light bg-white ">
      <LinkContainer style={{ marginLeft: '10px' }} to="login">
        <Button>Login</Button>
      </LinkContainer>

      <LinkContainer style={{ marginRight: '10px' }} to="register">
        <Button>Register</Button>
      </LinkContainer>
    </nav>
  );
}

export default SignedOut;
