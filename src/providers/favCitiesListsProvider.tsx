import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Props } from "../types";

export type FavoriteCity = {
    id: number;
    name: string;
};

interface FavCitiesContextType {
    usersfavoriteCities: FavoriteCity[];
    setUsersfavoriteCities: React.Dispatch<React.SetStateAction<FavoriteCity[]>>;
};

export const FavCitiesContext = createContext<FavCitiesContextType | undefined>(undefined);
export const useFavCitiesList = () => {
    const context = useContext(FavCitiesContext);
    if (!context) {
        throw new Error("FavCitiesProvider must be used within a CityProvider");
    }
    return context;
};

function FavCitiesProvider({ children }: Props) {
    const [usersfavoriteCities, setUsersfavoriteCities] = useLocalStorage<FavoriteCity[]>("favCitiesContext", []);

    return (
        <FavCitiesContext.Provider value={{ usersfavoriteCities, setUsersfavoriteCities }}>
            {children}
        </FavCitiesContext.Provider>
    );
};

export default FavCitiesProvider;
