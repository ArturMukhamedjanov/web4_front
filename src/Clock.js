import React, { useState, useEffect } from 'react';

export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 6000);

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleTimeString();

    return (
        <div>
            <h1>Текущее время:</h1>
            <p>{formattedTime}</p>
        </div>
    );
};
