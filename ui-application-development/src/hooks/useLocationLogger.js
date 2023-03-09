import { logger } from '@frontrolinc/pace-ui-framework';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export const useLocationLogger = () => {
    const location = useLocation();

    const route = (location.pathname+location.search)

    useEffect(() => {
        // No need for now
        // logger.add({
        //     action: 'Page load',
        //     data: {
        //         path: route,
        //         title: window?.document.title
        //     }
        // })
    },[route]);
}
