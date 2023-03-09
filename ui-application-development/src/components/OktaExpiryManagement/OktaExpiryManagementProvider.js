import { createContext, useEffect, useMemo, useRef, useState } from "react"
import { SSO_PROXY_LOGIN_URL, TOKEN_RENEWAL_TIME_KEY } from "../../helpers/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Iframe } from "../Iframe";

export const OktaExpiryManagement = createContext();

const TRIGGER_BEFORE_EXPIRY_IN_MINS = 5
const OKTA_TOKEN_EXPIRY = 30

export const triggerTimeInMins = (OKTA_TOKEN_EXPIRY - TRIGGER_BEFORE_EXPIRY_IN_MINS)

export const defaultTriggerTime = triggerTimeInMins * 60 * 60 * 1000;

export const OktaExpiryManagementProvider = ({ children }) => {
    const [tokenRenewalTime, setTokenExpiry] = useLocalStorage(TOKEN_RENEWAL_TIME_KEY, null);
    const [timer, setTimer] = useState();

    const dRef = useRef();
    const iframe = <Iframe src={SSO_PROXY_LOGIN_URL} dRef={dRef} />;

    const renewOktaToken = () => dRef.current?.reload()

    // calculate latest expiry and set to localstorage
    const calculateAndSetExpiry = () => {
        const now = new Date();
        const newExpiry = now.setMinutes(now.getMinutes() + triggerTimeInMins);
        setTokenExpiry(new Date(newExpiry));
        clearTimeout(timer);
        setTimer(null);
        return newExpiry;
    }

    // calculate trigger time 
    const triggerTime = useMemo(() => {
        const now = new Date();
        let difference;

        if (!tokenRenewalTime) {
            return difference
        }

        // check if token has expired or not
        if (now > new Date(tokenRenewalTime)){
            calculateAndSetExpiry()
            difference = defaultTriggerTime;
        } else if (now <= new Date(tokenRenewalTime)) {
            difference = new Date(tokenRenewalTime).getTime() - now.getTime();
        }

        return Math.floor(difference);
    }, [tokenRenewalTime])

    useEffect(() => {
        if (!Boolean(timer) && Boolean(tokenRenewalTime) && triggerTime > 0) {
            const runningTimer = setTimeout(() => {
                renewOktaToken()
                calculateAndSetExpiry()
            }, triggerTime);

            console.info(`Timer has been set for ${Math.floor(triggerTime/1000)} seconds`)

            setTimer(runningTimer);
        }

        return () => clearTimeout(timer);
    }, [tokenRenewalTime, timer]);

    return (
        <OktaExpiryManagement.Provider value={{
            tokenRenewalTime,
            calculateAndSetExpiry
        }}>
            {tokenRenewalTime && iframe}
            {children}
        </OktaExpiryManagement.Provider>
    )
}