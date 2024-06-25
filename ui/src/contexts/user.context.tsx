import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { clearLocalStorage, getLocalToken, storeLocalToken } from '../helpers';
import { TOKEN_EXPIRY } from '../constants';
import { attemptLogin } from '../services/auth.service';
import { getUser } from '../services/user.service';

export const UserContext = createContext(null as any);

type Props = {
    children: ReactNode
}

export function UserContextProvider({ children }: Props) {
    const authHandler = useProvideUser();
    return <UserContext.Provider value={authHandler}>{children}</UserContext.Provider>;
}

function useProvideUser() {
    const [token, setToken] = useState<string | undefined>();
    const [userId, setUserId] = useState<string | undefined>();
    const [user, setUser] = useState<any | undefined>();

    const login = async (username: string, password: string) => {
        const result = await attemptLogin(username, password);
        if (result && result.token) {
            setToken(result.token);
            storeLocalToken(result.token);
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setToken(undefined);
        clearLocalStorage();
    };

    const getUserDetails = useCallback(
        async (userId: string, token: string) => {
            const result = await getUser(userId, token);
            if (result && result.user) {
                setUser(result.user);
            } else {
                // cannot find user, log them out, token malformed
                logout();
            }
        },
        [],
    )



    useEffect(() => {
        const localToken = getLocalToken();
        if (localToken) {
            console.log('token found');
            const jwt: JwtPayload & { userId?: string } = jwtDecode(localToken);
            if (
                !!jwt.exp &&
                new Date(jwt.exp * 1000).getTime() > new Date().getTime() - TOKEN_EXPIRY
            ) {
                setUserId(jwt?.userId);
                setToken(localToken);
            } else {
                console.log('outdated token');
                clearLocalStorage();
            }
        }
    }, []);

    useEffect(() => {
        if (token && userId && !user) {
            getUserDetails(userId, token)
        }
    }, [token, userId, user, getUserDetails])




    return {
        token,
        login,
        logout,
        user,
    };
}

export function useLogin() {
    const { login } = useContext(UserContext);
    return login;
}

export function useToken() {
    const { token } = useContext(UserContext);
    return token;
}

export function useUser() {
    const { user } = useContext(UserContext);
    return user
}