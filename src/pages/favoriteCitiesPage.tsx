import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavCitiesList } from "../providers/favCitiesListsProvider";
import Page from "../components/layout/Page";
import DelConfirmModal from "../components/general/DelConfirmModal";
import { useCity } from "../providers/cityProvider";

interface City {
    id: number;
    name: string;
};

function FavoriteCitiesPage() {
    const { usersfavoriteCities, setUsersfavoriteCities } = useFavCitiesList();
    const { setCity } = useCity();

    const [removeCityID, setRemoveCityID] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        setUsersfavoriteCities(prev =>
            prev.filter(city => city.id !== id)
        );
        setIsDeleteModalOpen(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <Page title="Favorite cities list">
            <div className="flex flex-col">
                {usersfavoriteCities.map((city: City) => (
                    <div key={city.id} className="flex w-80 border p-2 bg-white/5">
                        <span
                            className="w-full p-1 cursor-pointer hover:bg-white/20"
                            onClick={() => {
                                setCity(city.name);
                                navigate("/forecast");
                            }}
                        >
                            {city.name}
                        </span>

                        <button
                            onClick={() => {
                                setRemoveCityID(city.id);
                                setIsDeleteModalOpen(true);
                            }}
                            className="cursor-pointer hover:bg-gray-600 px-2"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {isDeleteModalOpen && removeCityID !== null && (
                <DelConfirmModal
                    deleteCity={handleDelete}
                    closeDeleteModal={closeDeleteModal}
                    removeCityID={removeCityID}
                />
            )}
        </Page>
    );
};

export default FavoriteCitiesPage;
