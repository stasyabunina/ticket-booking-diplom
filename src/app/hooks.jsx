import { useEffect, useRef } from 'react';

const useDidMountEffect = () => {
    const didMount = useRef(false);

    useEffect(() => {
        didMount.current = true;
    }, []);

    return didMount.current;
}

export default useDidMountEffect;