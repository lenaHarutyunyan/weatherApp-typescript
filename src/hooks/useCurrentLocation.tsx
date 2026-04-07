import { useEffect } from "react";
import { useCity } from "../providers/cityProvider";
import { getLocation } from "../api/getWeatherData";

function useCurrentLocation(): void {
    const { setCity } = useCity() as { setCity: (city: string) => void };
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getLocation(lat, lon)
                    .then((data: { name: string }) => setCity(data.name))
                    .catch(() => setCity("yerevan"));
            },
            () => setCity("yerevan"));
    }, [setCity]);
};

export default useCurrentLocation;
