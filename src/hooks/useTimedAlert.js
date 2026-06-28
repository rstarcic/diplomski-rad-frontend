import { useEffect, useRef, useState } from "react";

export function useTimedAlert(initial = null, duration = 5000) {
    const [message, setMessage] = useState(initial ?? null);
    const timer = useRef(null);

    useEffect(() => {
        if (!message) return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setMessage(null), duration);
        return () => clearTimeout(timer.current);
    }, [message, duration]);

    return [message, setMessage];
}
