import { useLocalStorage } from "./useLocalStorage";

export const LOGIN_MODE = {
    SSO: 'SSO',
    LOGIN: 'LOGIN'
}

export const LOGIN_MODE_KEY = 'login-mode';

export const useLoginMode = () => {
    const [loginMode, setLoginMode] = useLocalStorage(LOGIN_MODE_KEY, process.env.REACT_APP_DEFAULT_LOGIN_MODE || LOGIN_MODE.LOGIN);

    const clearLoginMode = () => window.localStorage.removeItem(LOGIN_MODE_KEY)

    return { loginMode, setLoginMode, clearLoginMode }
}