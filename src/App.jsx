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

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addToFaforites(newItem) {
    if (!authUser) {
      toast.error('Please Sign In');
      return;
    }
    const index = favorites.findIndex(item => item.name === newItem.name);
    if (index === -1) {
      const updatedFavorites = [...favorites, newItem];
      favorites.push(newItem);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = favorites.filter(
        item => item.name !== newItem.name
      );
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
            element={<Psychologists addToFaforites={addToFaforites} />}
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites
                  favorites={favorites}
                  addToFaforites={addToFaforites}
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
