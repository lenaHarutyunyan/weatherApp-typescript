import { createContext, useContext, useState, type ReactNode } from "react";

interface Props {
    children: ReactNode
};

interface selectedCityDataType {
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>
};

export const SelectedСityData = createContext<selectedCityDataType | undefined>(undefined);

export const useCity = () => {
    const context = useContext(SelectedСityData);
    if (!context) {
        throw new Error("cityProvider must be used within a CityProvider");
    }
    return context;
};

function CityProvider({ children }: Props) {
    const [city, setCity] = useState("yerevan");

    return (
        <SelectedСityData.Provider value={{ city, setCity }}>
            {children}
        </SelectedСityData.Provider>
    )
};

export default CityProvider;
