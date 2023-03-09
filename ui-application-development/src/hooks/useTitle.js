import { updateTitle } from "@frontrolinc/pace-ui-framework";
import { useEffect, useRef } from "react";

export const useTitle = title => {
    const documentDefined = typeof document !== 'undefined';
    const originalTitle = useRef(documentDefined ? document.title : null);

    useEffect(() => {
        setTitle(title)
    }, [title]);

    const setTitle = async (title) => {
        if (!documentDefined) return;

        if (document.title !== title) document.title = title;

        const route = window?.location.pathname + window?.location.search

        updateTitle(route, title)

        return () => {
            document.title = originalTitle.current;
        };
    }

    return [title, setTitle]
};