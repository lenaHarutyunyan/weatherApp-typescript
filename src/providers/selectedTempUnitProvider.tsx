import { createContext, useContext, useState, type ReactNode } from "react";

interface TempUnitContextType {
    tempUnit: string;
    setTempUnit: React.Dispatch<React.SetStateAction<string>>
};

interface Props {
    children: ReactNode;
};

export const SelectedTempUnit = createContext<TempUnitContextType | undefined>(undefined);
export const selectedTempUnitProvider = () => {
    const context = useContext(SelectedTempUnit);
    if (!context) {
        throw new Error("SelectedTempUnitProvider must be used within a SelectedTempUnitProvider");
    }
    return context;
};

function SelectedTempUnitProvider({ children }: Props) {
    const [tempUnit, setTempUnit] = useState("metric");
    return (
        <SelectedTempUnit.Provider value={{ tempUnit, setTempUnit }}>
            {children}
        </SelectedTempUnit.Provider>
    )
};

export default SelectedTempUnitProvider;
