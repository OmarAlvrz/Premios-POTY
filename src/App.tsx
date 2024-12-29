import React from 'react';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import { useAuth } from './hooks/useAuth';
import VotingSection from './components/VotingSection';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white flex items-center justify-center">
      <div className="loader">
        <div className="loader-spinner">
          <div className="loader-spinner-inner"></div>
        </div>
        <span className="loader-text">Cargando...</span>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-blue-800 text-white">
      {!user ? (
        <LandingHero />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Header />
          <VotingSection />
        </div>
      )}
    </div>
  );
}

export default App;