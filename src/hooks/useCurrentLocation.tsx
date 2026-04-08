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
                    .catch(() => { throw new Error("Failed to fetch location data") })
            },
            (err) => {
                console.error("Unable to access your city ", err);
                throw err;
            }
        )
    }, [setCity]);
};

export default useCurrentLocation;
