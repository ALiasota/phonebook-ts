import type { RootState } from '../store';

const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

const getUsername = (state: RootState) => state.auth.user.name;

const getError = (state: RootState) => state.auth.error;

const getIsFetchingCurrent = (state: RootState) => state.auth.isFetchingCurrentUser;

const authSelectors = {
  getIsLoggedIn,
  getUsername,
  getIsFetchingCurrent,
  getError,
};
export default authSelectors;
