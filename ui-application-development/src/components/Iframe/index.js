
import { useRef } from "react";

export const Iframe = ({ src, dRef }) => {
    const iframeRef = useRef();

    const reload = () => {
        iframeRef.current.src += ''
    }
    
    dRef.current = { reload };
    return (<iframe style={{ display: 'none' }} ref={iframeRef} src={src} />)
}