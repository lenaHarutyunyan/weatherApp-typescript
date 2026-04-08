import { Link } from "react-router-dom";
import useCurrentLocation from "../hooks/useCurrentLocation.js";
import Page from "../components/layout/Page.jsx";
import Weather from "../components/general/Weather.jsx";
import SearchCity from "../components/layout/SearchCity.js";

function MainPage() {
  useCurrentLocation();

  return (
    <Page title="Weather">
      <SearchCity />
      <Weather />
      <div>
        <Link to="/forecast">View the weather forecast for the week →</Link>
      </div>
    </Page>
  )
};

export default MainPage;
