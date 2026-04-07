import { Link } from "react-router-dom";
import useCurrentLocation from "../hooks/useCurrentLocation.js";
import Page from "../components/layout/Page.jsx";
import Weather from "../components/general/Weather.jsx";
import SearchTown from "../components/layout/SearchTown.js";

function MainPage() {
  useCurrentLocation();
  return (
    <Page title="Weather">
      <SearchTown />
      <Weather />
      <div>
        <Link to="/forecast">View the weather forecast for the week →</Link>
      </div>
    </Page>
  )
};

export default MainPage;
