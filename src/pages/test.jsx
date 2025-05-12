import React, { useEffect, useState } from "react";

export const Test = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        console.log('Timer has started');
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 100);
        return () => {
            clearInterval(interval);
            console.log('Timer stopped ( component unmounted )');
        }

    }, []);

    return <h2>Timer: {seconds}seconds</h2>
}
