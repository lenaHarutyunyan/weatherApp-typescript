import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSelectedTempUnit } from "./selectedTempUnitProvider.js";
import { getForecast, getWeather } from "../api/getWeatherData.js";
import { useCity } from "./cityProvider.js";
import type { Props } from "../types.js";

interface WeatherState {
    weatherData: any | null;
    forecastData: any | null;
    error: string | null;
};

interface WeatherContextType {
    data: WeatherState;
    setData: React.Dispatch<React.SetStateAction<WeatherState>>;
};

const DataOfWeather = createContext<WeatherContextType | undefined>(undefined);

export const useWeatherData = () => {
    const context = useContext(DataOfWeather);
    if (!context) {
        throw new Error("dataProvider must be used within a CityProvider");
    }
    return context;
};

function DataProvider({ children }: Props) {
    const { city } = useCity() as { city: string | null };
    const { tempUnit } = useSelectedTempUnit();
    const [data, setData] = useState<WeatherState>({
        weatherData: {},
        forecastData: {},
        error: null
    });

    const fetchAllWeatherData = useCallback((city: string) => {
        if (!city) return;

        getWeather(city, tempUnit)
            .then((data) => {
                setData(prev => ({ ...prev, error: null }))

                if (data.cod == 404) {
                    throw new Error();
                }

                setData(prev => {
                    return {
                        ...prev,
                        weatherData: data
                    };
                })
                return getForecast(city, tempUnit);
            })
            .then(data =>
                setData(prev => {
                    return {
                        ...prev,
                        forecastData: data
                    };
                })
            )
            .catch(() => {
                setData(prev => ({
                    ...prev,
                    error: "City not found",
                    weatherData: null,
                    forecastData: null
                }));
            });
    }, [tempUnit]);

    useEffect(() => {
        fetchAllWeatherData(city || "");
    }, [city, fetchAllWeatherData]);

    return (
        <DataOfWeather.Provider value={{ data, setData }}>
            {children}
        </DataOfWeather.Provider>
    );
}

export default DataProvider;
