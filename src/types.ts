export interface forecastWeather {
    cod: number
    dt: number;
    dt_txt: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
};

export interface WeatherData {
    cod: string | number;
    id?: number;
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_max: number;
        temp_min: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
};