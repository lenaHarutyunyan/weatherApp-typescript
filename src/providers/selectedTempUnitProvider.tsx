import { createContext, useContext, useState, type ReactNode } from "react";

interface TempUnitContextType {
    tempUnit: TempUnit;
    tempUnitLabel: string;
    setTempUnit: React.Dispatch<React.SetStateAction<TempUnit>>;
}

interface Props {
    children: ReactNode;
};

type TempUnit = "metric" | "imperial";

const getTempUnitLabel = (unit: TempUnit) =>
    unit === "metric" ? "°C" : "°F";

export const SelectedTempUnit = createContext<TempUnitContextType | undefined>(undefined);
export const useSelectedTempUnit  = () => {
    const context = useContext(SelectedTempUnit);
    if (!context) {
        throw new Error("SelectedTempUnitProvider must be used within a SelectedTempUnitProvider");
    }
    return context;
};

function SelectedTempUnitProvider({ children }: Props) {
    const [tempUnit, setTempUnit] = useState<TempUnit>("metric");
    const tempUnitLabel = getTempUnitLabel(tempUnit);


    return (
        <SelectedTempUnit.Provider value={{ tempUnit, tempUnitLabel, setTempUnit }}>
            {children}
        </SelectedTempUnit.Provider>
    )
};

export default SelectedTempUnitProvider;
