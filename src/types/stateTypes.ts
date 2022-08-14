export interface IAuth {
        user: { name: null | string, email: null | string };
        token: null | string;
        isLoggedIn: boolean;
        isFetchingCurrentUser: boolean;
        error: null | string;
      };

export interface IUser {
    user:{name: string;
    email: string;};
    token: string;
}

export interface IUserForm {
    name?: string
    email: string;
    password: string;
}