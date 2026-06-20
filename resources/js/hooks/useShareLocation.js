import axios from 'axios';
import { useEffect, useRef } from 'react';

export default function useShareLocation(enabled = false, intervalMs = 15000) {
    const timerRef = useRef(null);

    const sendLocation = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                axios.post(route('location.update'), {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                });
            },
            (err) => console.warn('GPS error:', err.message),
            { enableHighAccuracy: true, timeout: 10000 },
        );
    };

    useEffect(() => {
        if (!enabled) return;
        sendLocation();
        timerRef.current = setInterval(sendLocation, intervalMs);
        return () => clearInterval(timerRef.current);
    }, [enabled]);
}
