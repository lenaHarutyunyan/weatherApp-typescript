import { createContext, useContext, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type FavoriteCity = {
    id: number;
    name: string;
};

interface favCitiesContextType {
    usersfavoriteCities: FavoriteCity[];
    setUsersfavoriteCities: React.Dispatch<React.SetStateAction<FavoriteCity[]>>;
};

interface Props {
    children: ReactNode;
};

export const FavCitiesContext = createContext<favCitiesContextType | undefined>(undefined);
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
