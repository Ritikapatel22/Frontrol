import { useEffect, useMemo } from 'react';
import { updateAuthState } from '../slices/authslice';
import { setDefaultPortfolio } from '../slices/portfolioslice';
import { setDefaultView } from '../slices/viewslice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    setAuthToken,
    useQueryString,
    withErrorHandler,
} from "@frontrolinc/pace-ui-framework";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { triggerTimeInMins } from '../components/OktaExpiryManagement/OktaExpiryManagementProvider';
import { TOKEN_RENEWAL_TIME_KEY } from '../helpers/constants';
import { LOGIN_MODE, useLoginMode } from '../hooks/useLoginMode';

const SSO = () => {
    const [tokenRenewalTime, setTokenRenewalTime] = useLocalStorage(TOKEN_RENEWAL_TIME_KEY, null);
    const [, setPortfolio] = useQueryString("portfolio");
    const [cloudToken] = useQueryString("cloudToken");

    const { setLoginMode, clearLoginMode } = useLoginMode()

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const portfolio = useSelector((state) => state.portfolio.selectedPortfolio?.portfolio_id);

    const isInIframe = useMemo(() => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }, [window]);

    const calculateAndSetExpiry = () => {
        const now = new Date();
        const newExpiry = now.setMinutes(now.getMinutes() + triggerTimeInMins);
        setTokenRenewalTime(new Date(newExpiry));
    }

    const shouldSetExpiry = !Boolean(tokenRenewalTime) && !isInIframe

    useEffect(() => {
        dispatch(setAuthToken({ token: cloudToken }));
        
        if (shouldSetExpiry) {
            calculateAndSetExpiry()
        }

        if (!isInIframe) {
            clearLoginMode()

            dispatch(updateAuthState(true));
            setLoginMode(LOGIN_MODE.SSO);

            setTimeout(() => {
                dispatch(updateAuthState(false));
            }, 4000);


            dispatch(setDefaultPortfolio());
            dispatch(setDefaultView());
    
            if (location.state) {
                navigate(location.state.path);
            } else {
                navigate("/");
            }
            if (!window.location.href.split("/project/")[1]) {
                setPortfolio(portfolio);
            }
        }
        

    }, [cloudToken, isInIframe])

    return null;
}

export default withErrorHandler(SSO)