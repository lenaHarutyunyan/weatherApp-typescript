import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import type { WeatherData } from "../../types";
import LoadingSpinner from "../ui/LoadingSpinner";
import CollapsiblePanel from "../ui/CollapsiblePanel";
import { useSelectedTempUnit } from "../../providers/selectedTempUnitProvider";
import { useFavCitiesList, type FavoriteCity } from "../../providers/favCitiesListsProvider";
import { useWeatherData } from "../../providers/dataProvider";

function Weather() {
  const { data } = useWeatherData();
  const { weatherInfoItem } = useSelectedTempUnit();
  const { usersfavoriteCities, setUsersfavoriteCities } = useFavCitiesList();

  if (data.error) {
    return <div className="text-red-500 font-bold p-5 bg-white/10">{data.error}</div>;
  };

  if (!data.weatherData?.main) {
    return <LoadingSpinner title="Loading weather..." color="transparent" />;
  };

  const weather = data.weatherData as WeatherData;

  const isFavorite = usersfavoriteCities.some(
    (city: FavoriteCity) => city.name === weather.name
  );

  const saveCity = () => {
    setUsersfavoriteCities((prev) => {
      if (isFavorite) {
        return prev.filter((item) => item.name !== weather.name);
      }

      return [
        ...prev,
        { id: weather.id || Date.now(), name: weather.name },
      ];
    });
  };

  return (
    <div className="flex flex-col bg-white/10  text-white min-w-70 min-h-45 gap-2 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">City: {weather.name}</h1>
        <button onClick={saveCity} className="text-xl cursor-pointer">
          {isFavorite ? <FaStar className="text-yellow-300" /> : <CiStar />}
        </button>
      </div>
      <p>
        {weatherInfoItem(weather.main.temp)}
      </p>
      <p>
        Feels like
        {weatherInfoItem(weather.main.feels_like)}
      </p>
      <p>{weather.weather?.[0]?.description}</p>
      <CollapsiblePanel title="More">
        <div className="flex flex-col">
          <span>
            max temp:
            {weatherInfoItem(weather.main.temp_max)}
          </span>
          <span>
            min temp: {weatherInfoItem(weather.main.temp_min)}
          </span>
          <span>humidity: {weather.main.humidity}%</span>
        </div>
      </CollapsiblePanel>
    </div>
  );
}

export default Weather;
