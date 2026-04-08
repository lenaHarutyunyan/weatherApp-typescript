import { useEffect } from "react";
import { useCity } from "../providers/cityProvider";
import { getLocation } from "../api/getWeatherData";

function useCurrentLocation() {
    const { setCity } = useCity() as { setCity: (city: string) => void };

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                getLocation(lat, lon)
                    .then((data: { name: string }) => setCity(data.name))
                    .catch((err) => console.error("Failed to fetch location", err));
            },
            (err) => {
                console.error("Unable to access your city", err);
            }
        );
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return fetchLocation;
}

export default useCurrentLocation;
