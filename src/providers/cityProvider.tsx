import { createContext, useContext, useState } from "react";
import type { Props } from "../types";

interface SelectedCityDataType {
    city: string | null;
    setCity: React.Dispatch<React.SetStateAction<string | null>>
};

export const SelectedCityData = createContext<SelectedCityDataType | undefined>(undefined);

export const useCity = () => {
    const context = useContext(SelectedCityData);
    if (!context) {
        throw new Error("cityProvider must be used within a CityProvider");
    }
    return context;
};

function CityProvider({ children }: Props) {
    const [city, setCity] = useState<string | null>(null);
    return (
        <SelectedCityData.Provider value={{ city, setCity }}>
            {children}
        </SelectedCityData.Provider>
    )
};

export default CityProvider;
