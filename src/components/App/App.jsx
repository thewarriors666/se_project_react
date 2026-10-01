import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import {
  getWeather,
  filterWeatherData,
  getUserCoordinates,
} from "../../utils/weatherAPI";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { getItems, addItem, removeItem, updateUser } from "../../utils/api.js";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");

    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    token

      .then((savedItem) => {
        setClothingItems((items) => [savedItem.data, ...items]);
        closeActiveModal();
      })
      .catch(console.error);

    return addItem(newCardData, token)
      .then((savedItem) => {
        setClothingItems((items) => [savedItem ?? newCardData, ...items]);
        closeActiveModal();
        resetForm();
      })
      .catch(console.error);
  };

  const onDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");

    removeItem(id, token)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleRegister = (values) => {
    return signup(values)
      .then((user) => {
        console.log(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (values) => {
    return signin(values)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleUpdateUser = (values) => {
    const token = localStorage.getItem("jwt");

    const handleCardLike = ({ id, isLiked }) => {
      const token = localStorage.getItem("jwt");

      !isLiked
        ? api
            .addCardLike(id, token)
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item)),
              );
            })
            .catch((err) => console.log(err))
        : api
            .removeCardLike(id, token)
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item)),
              );
            })
            .catch((err) => console.log(err));
    };

    return updateUser(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getUserCoordinates()
      .then((coordinates) => getWeather(coordinates, apiKey))
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        data.data.reverse();
        setClothingItems(data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  onSignOut={handleSignOut}
                />
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={onDeleteItem}
          />
          <RegisterModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />
          <LoginModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
          />
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page"></div>
          </CurrentUserContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
