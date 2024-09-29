import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation.jsx';
import Loader from './components/Loader/Loader.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-db';
import NotFoundPage from 'pages/NotFound/NotFound';

function App() {
  const Home = lazy(() => import('./pages/Home/Home.jsx'));
  const Psychologists = lazy(() =>
    import('./pages/Psychologists/Psychologists.jsx')
  );
  const Favorites = lazy(() => import('./pages/Favorites/Favorites.jsx'));
  const [authUser, setAuthUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser(user);
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } else {
        setAuthUser(null);
        setFavorites([]);
      }
    });

    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, authUser]);

  function addToFaforites(newItem) {
    if (!authUser) {
      toast.error('Please Sign In');
      return;
    }

    const index = favorites.findIndex(item => item.name === newItem.name);
    let updatedFavorites;

    if (index === -1) {
      updatedFavorites = [...favorites, newItem];
      setFavorites(updatedFavorites);
    } else {
      updatedFavorites = favorites.filter(item => item.name !== newItem.name);
      setFavorites(updatedFavorites);
    }
  }

  return (
    <div>
      <Navigation authUser={authUser} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/psychologists"
            element={
              <Psychologists
                addToFaforites={addToFaforites}
                authUser={authUser}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites
                  favorites={favorites}
                  addToFaforites={addToFaforites}
                  authUser={authUser}
                />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
