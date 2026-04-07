import { useEffect, useState } from "react";

import type { forecastWeather } from "../../types";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useWeatherData } from "../../providers/dataProvider";
import SelectedDayComponent from "./SelectedDayComponent";

function Forecast() {
    const { data } = useWeatherData();
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    interface IWeatherGroup {
        [key: string]: forecastWeather[];
    };

    const groupByDay = (list: forecastWeather[]): IWeatherGroup => {
        return list.reduce((group: IWeatherGroup, item: forecastWeather) => {
            const date = item.dt_txt.split(" ")[0];
            if (!group[date]) group[date] = [];
            group[date].push(item);

            return group;
        }, {});
    };

    useEffect(() => {
        if (data?.forecastData?.list) {
            const grouped = groupByDay(data.forecastData.list);
            const firstDay = Object.keys(grouped)[0];

            setSelectedDay(firstDay);
        }
    }, [data]);

    if (data.error) {
        return "City not found, try again";
    };

    if (!data?.forecastData?.list) {
        return <LoadingSpinner title="Loading forecast..." color="transparent" />;
    };

    const days = Object.entries(groupByDay(data.forecastData.list));

    return (
        <div className="w-full h-screen pt-[8vh] flex flex-col items-center gap-5">
            <h2 className="text-3xl">City : {data.forecastData?.city?.name}</h2>
            <div className="flex gap-3 flex-wrap justify-center">
                {days.map(([date]) => (
                    <button
                        key={date}
                        onClick={() => {
                            setSelectedDay(date);
                        }}
                        className={`p-2 rounded bg-white/10 cursor-pointer ${selectedDay === date ? "bg-white/40 text-black" : ""}`}
                    >
                        {date}
                    </button>
                ))}
            </div>

            {selectedDay &&
                <SelectedDayComponent
                    groupByDay={groupByDay}
                    selectedDay={selectedDay}
                />
            }
        </div>
    );
};

export default Forecast;
