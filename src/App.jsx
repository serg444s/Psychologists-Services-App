import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation.jsx";
import NotFoundPage from "./pages/NotFound/NotFound.jsx";
import Loader from "./components/Loader/Loader.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function App() {
  const Home = lazy(() => import("./pages/Home/Home.jsx"));
  const Psychologists = lazy(() =>
    import("./pages/Psychologists/Psychologists.jsx")
  );
  const Favorites = lazy(() => import("./pages/Favorites/Favorites.jsx"));

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoritesItemsArray")) || []
  );

  function addToFaforites(newItem) {
    const index = favorites.findIndex((item) => item.name === newItem.name);
    console.log(index);

    if (index === -1) {
      favorites.push(newItem);
    } else {
      setFavorites(favorites.splice(index, 1));
    }

    const items = JSON.parse(localStorage.getItem("favoritesItemsArray")) || [];
    console.log(newItem);
    setFavorites((prevItems) => [...prevItems, newItem]);
    items.push(newItem);
    localStorage.setItem("itemsArray", JSON.stringify(favorites));
  }

  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/psychologists"
            element={<Psychologists addToFaforites={addToFaforites} />}
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites favorites={favorites} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
