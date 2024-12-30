import exp from "constants";
import { useEffect, useRef } from "node_modules/@types/react";

const useAutoFocus = (): any => {
    const inputRef = useRef<HTMLElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
};

export default useAutoFocus;