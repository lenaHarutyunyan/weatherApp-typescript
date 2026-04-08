import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityProvider from "./providers/cityProvider";
import DataProvider from "./providers/dataProvider";
import FavCitiesProvider from "./providers/favCitiesListsProvider";
import SelectedTempUnitProvider from "./providers/selectedTempUnitProvider";
import MainPage from "./pages/mainPage";
import FavoriteCitiesPage from "./pages/favoriteCitiesPage";
import ForecastPage from "./pages/forecastPage";

function App() {
  return (
    <FavCitiesProvider>
      <SelectedTempUnitProvider>
        <CityProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/favoriteCitiesPage" element={<FavoriteCitiesPage />}></Route>
                <Route path="/forecast" element={<ForecastPage />}></Route>
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </CityProvider>
      </SelectedTempUnitProvider>
    </FavCitiesProvider>
  )
};

export default App;
