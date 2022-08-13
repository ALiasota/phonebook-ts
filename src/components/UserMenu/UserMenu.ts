import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';
import SignedIn from './signedIn';
import SignedOut from './signedOut';

export default function UserMenu() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return <>{isLoggedIn ? <SignedIn /> : <SignedOut />}</>;
}
