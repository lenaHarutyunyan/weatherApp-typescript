import { useRef } from "react";
import { useCity } from "../../providers/cityProvider.js";
import useCurrentLocation from "../../hooks/useCurrentLocation.js";

function SearchCity() {
    const searchTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { setCity } = useCity();
    const fetchLocation = useCurrentLocation();

    function searchTime(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        if (searchTimeRef.current) {
            clearTimeout(searchTimeRef.current);
        }

        if (!value.trim()) {
            setCity(null);
            fetchLocation();
            return;
        }

        searchTimeRef.current = setTimeout(() => {
            setCity(value);
        }, 1000);
    }

    return (
        <div className="flex border">
            <input
                onChange={event => searchTime(event)}
                type="search"
                className="border text-white px-2 py-1"
                placeholder="Input city name"
            />
        </div>
    )
};

export default SearchCity;
