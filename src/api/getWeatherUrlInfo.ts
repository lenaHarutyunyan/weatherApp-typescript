import type { getWeatherUrlInfoParams } from "../types";

const API_KEY: string = "03ac09d52da80833826aa4f0a085f8d2";
const OPEN_WEATHER_MAP_LINK = "https://api.openweathermap.org/data/2.5";

function getWeatherUrlInfo<T>({ tempUnit, city, lat, lon, type }: getWeatherUrlInfoParams
): Promise<T> {
    let url = `${OPEN_WEATHER_MAP_LINK}/${type}?appid=${API_KEY}`;

    if (lat !== undefined && lon !== undefined) {
        url += `&lat=${lat}&lon=${lon}`;
    }
    else if (city) {
        url += `&q=${city}`;
    }

    if (tempUnit) {
        url += `&units=${tempUnit}`;
    }

    return fetch(url).then((res) => res.json());
}

export default getWeatherUrlInfo;
