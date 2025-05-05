import { useCallback, useEffect, useRef, useState } from "react";

export const useCountdown = (initialSeconds = 60) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        setIsActive(true);
    }, []);

    const pause = useCallback(() => {
        setIsActive(false);
    }, []);

    const reset = useCallback(() => {
        setIsActive(false);
        setSecondsLeft(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (isActive && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setIsActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, secondsLeft]);

    return { secondsLeft, isActive, start, pause, reset };
};
