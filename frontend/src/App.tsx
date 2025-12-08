import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import AllListings from './pages/AllListings';
// Product page replaces the older Detail view — kept Detail.tsx for quick reference
import ProductPage from './pages/ProductPage';
import Profile from './pages/Profile';
import MyListings from './pages/MyListings';
import Favorites from './pages/Favorites';
import AddListingPage from './pages/AddListingPage';
import ClientPanel from './pages/ClientPanel';
import LoadingScreen from './components/common/LoadingScreen';
import './App.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    <Route path="/ogloszenia" element={<AllListings />} />
  <Route path="/ogloszenie/:id" element={<ProductPage />} />
      <Route 
        path="/profil" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/moje-ogloszenia" 
        element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/panel-klienta"
        element={
          <ProtectedRoute>
            <ClientPanel />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/ulubione" 
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dodaj-ogloszenie" 
        element={<AddListingPage />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className="AppRoot">
          <NavBar />
          <main className={`container ${isHome ? 'home-full' : ''}`}>
            <AppRoutes />
          </main>
        </div>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
