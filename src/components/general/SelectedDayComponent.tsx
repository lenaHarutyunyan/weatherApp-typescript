import { useEffect, useState } from "react";
import { useSelectedTempUnit } from "../../providers/selectedTempUnitProvider";
import type { forecastWeather } from "../../types";
import { useWeatherData } from "../../providers/dataProvider";

interface SelectedDayComponentProps {
    selectedDay: string | null;
    groupByDay: (list: forecastWeather[]) => Record<string, forecastWeather[]>;
};

function SelectedDayComponent({ selectedDay, groupByDay }: SelectedDayComponentProps) {
    const { data } = useWeatherData();
    const { tempUnit } = useSelectedTempUnit();
    const [selectedTime, setSelectedTime] = useState<forecastWeather | null>(null);
    const selectedDayData = selectedDay ? groupByDay(data.forecastData.list)[selectedDay] : [];

    const getTempUnit = () => (tempUnit === "metric" ? " °C" : " F");

    interface WeatherItem {
        dt: number;
        dt_txt: string;
        main: { temp: number };
        weather: { icon: string }[];
    };

    const getIcon = (item: WeatherItem) => {
        const iconData = item.weather[0]?.icon;
        return `https://openweathermap.org/img/wn/${iconData}@2x.png`;
    };

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDay]);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2 justify-center">
                {selectedDayData.map((item) => {
                    const iconUrl = getIcon(item);
                    return (
                        <div key={item.dt} className="flex flex-col border justify-center cursor-pointer bg-white/10"
                            onClick={() => setSelectedTime(item)}>
                            <span className="px-2">{item.main.temp}
                                {getTempUnit()}
                            </span>
                            <img src={iconUrl} alt="weather icon" />
                            <button
                                className={`p-2 rounded bg-white/10 cursor-pointer ${selectedTime?.dt === item.dt ? "bg-white/40 text-black" : ""}`}
                            >
                                {item.dt_txt.split(" ")[1].slice(0, 5)}
                            </button>
                        </div>
                    )
                })}
            </div>

            {selectedTime && (
                <div className="p-5 bg-white/10 text-white rounded self-center">
                    <p className="font-bold">{selectedTime.weather?.[0]?.description}</p>
                    <p>Temp: {selectedTime.main.temp}
                        {getTempUnit()}
                    </p>
                    <p>Feels like: {selectedTime.main.feels_like}
                        {getTempUnit()}
                    </p>
                    <p>Humidity: {selectedTime.main.humidity}</p>
                    <p>Wind: {selectedTime.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
};

export default SelectedDayComponent;
