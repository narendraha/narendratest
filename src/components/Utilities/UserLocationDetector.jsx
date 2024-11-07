import React, { useState, useEffect } from 'react';

const UserLocationDetector = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (err) => {
                    setError(err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div>
            <h1>Geolocation Example</h1>
            {error && <p>Error: {error}</p>}
            {location ? (
                <p>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default UserLocationDetector;
