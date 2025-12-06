import React from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>Ładowanie...</p>
    </div>
  );
};

export default LoadingScreen;