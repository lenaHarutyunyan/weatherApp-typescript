import { useRef } from "react";
import { useCity } from "../../providers/cityProvider.js";

function SearchTown() {
    const searchTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null); 
    const { setCity } = useCity();

    function searchTime(event:React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (searchTimeRef.current) {
            clearTimeout(searchTimeRef.current);
        }
        if (value.trim() !== "") {
            searchTimeRef.current = setTimeout(() => {
                setCity(value);
            }, 1000);
        } else setCity("");
    }
    return (
        <div className="flex border">
            <input onChange={event => searchTime(event)}
                type="search"
                className="border text-white px-2 py-1"
                placeholder="Input city name" />
        </div>
    )
};

export default SearchTown;
