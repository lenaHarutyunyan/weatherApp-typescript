import { useEffect, useState } from "react";
import { useSelectedTempUnit } from "../../providers/selectedTempUnitProvider";
import type { ForecastWeather, SelectedDayComponentProps, WeatherItem } from "../../types";
import { useWeatherData } from "../../providers/dataProvider";

function SelectedDayComponent({ selectedDay, groupByDay }: SelectedDayComponentProps) {
    const { data } = useWeatherData();
    const { weatherInfoItem } = useSelectedTempUnit();
    const [selectedTime, setSelectedTime] = useState<ForecastWeather | null>(null);
    const selectedDayData = selectedDay ? groupByDay(data.forecastData.list)[selectedDay] : [];

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
                            <span className="px-2">
                                {weatherInfoItem(item.main.temp)}
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
                    <p>Temp:
                        {weatherInfoItem(selectedTime.main.temp)}
                    </p>
                    <p>Feels like:
                        {weatherInfoItem(selectedTime.main.feels_like)}
                    </p>
                    <p>Humidity: {selectedTime.main.humidity}</p>
                    <p>Wind: {selectedTime.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
};

export default SelectedDayComponent;
