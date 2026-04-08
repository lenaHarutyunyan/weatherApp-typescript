import { createContext, useContext, useState } from "react";
import type { Props, TempUnit, TempUnitSymbols } from "../types";

interface TempUnitContextType {
    tempUnit: TempUnit;
    tempUnitLabel: TempUnitSymbols;
    weatherInfoItem: (data: number | undefined) => string;
    setTempUnit: React.Dispatch<React.SetStateAction<TempUnit>>;
};

const getTempUnitLabel = (unit: TempUnit): TempUnitSymbols => unit === "metric" ? "°C" : "°F";

export const SelectedTempUnit = createContext<TempUnitContextType | undefined>(undefined);

export const useSelectedTempUnit = () => {
    const context = useContext(SelectedTempUnit);
    if (!context) {
        throw new Error("SelectedTempUnitProvider must be used within a SelectedTempUnitProvider");
    }
    return context;
};

function SelectedTempUnitProvider({ children }: Props) {
    const [tempUnit, setTempUnit] = useState<TempUnit>("metric");
    const tempUnitLabel = getTempUnitLabel(tempUnit);

    const weatherInfoItem = (data: number | undefined ) => `${data}${tempUnitLabel}`;

    return (
        <SelectedTempUnit.Provider value={{ tempUnit, tempUnitLabel, weatherInfoItem, setTempUnit }}>
            {children}
        </SelectedTempUnit.Provider>
    )
};

export default SelectedTempUnitProvider;
