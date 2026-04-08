import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelectedTempUnit } from "../../providers/selectedTempUnitProvider";

function Header() {
    const { tempUnit, tempUnitLabel, setTempUnit } = useSelectedTempUnit();

    const handleTempUnitChange = () => {
        setTempUnit(tempUnit === "imperial" ? "metric" : "imperial");
    };

    return (
        <div className={`fixed w-full h-[8vh] bg-gray-800`}>
            <div className="flex h-full items-center justify-between max-w-450 mx-auto">
                <div className="flex h-full items-center gap-2">
                    <TiWeatherPartlySunny className="text-4xl text-cyan-50/50" />
                    <h1 className="inline-block bg-linear-to-b border-white from-cyan-100  bg-clip-text text-transparent text-4xl cursor-pointer">
                        <Link to="/"> WeatherApp</Link>
                    </h1>
                </div>
                <nav className="flex gap-5 text-white">
                    <span
                        className="cursor-pointer bg-white/20 px-2 self-start"
                        onClick={handleTempUnitChange}
                    >
                        Change unit
                        {tempUnitLabel}
                    </span>
                    <Link to="/favoriteCitiesPage" className="hover: shadow-2xl cursor-pointer">Favorite cities list</Link>
                </nav>
            </div>
        </div>
    )
}

export default Header;
