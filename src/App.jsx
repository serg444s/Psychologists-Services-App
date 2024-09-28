import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation.jsx';
import NotFoundPage from './pages/NotFound/NotFound.jsx';
import Loader from './components/Loader/Loader.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebase-db';

function App() {
  const Home = lazy(() => import('./pages/Home/Home.jsx'));
  const Psychologists = lazy(() =>
    import('./pages/Psychologists/Psychologists.jsx')
  );
  const Favorites = lazy(() => import('./pages/Favorites/Favorites.jsx'));

  const [favorites, setFavorites] = useState([]);

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

  function addToFaforites(newItem) {
    if (!authUser) {
      toast.error('Only auth user');
      return;
    }
    const index = favorites.findIndex(item => item.name === newItem.name);
    if (index === -1) {
      favorites.push(newItem);
      console.log('add', index, newItem.name);
    } else {
      setFavorites(favorites.splice(index, 1));
      console.log('delete', index, newItem.name);
    }
    console.log('favorites', favorites);
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
