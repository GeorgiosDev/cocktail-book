import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';
import Cocktail from './components/Cocktail';
import wall from "./assets/images/wall.jpg"
import { AuthContextProvider } from './context/AuthContext';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';

function HomePage() {
  // Modal initial state
  const [showModal, setShowModal] = useState(true);
  // Cocktail initial state
  const [cocktailData, setCocktailData] = useState(null);
  // Buttons initial state for scroll
  const [scroll, setScroll] = useState(false);
  
  // Get the current route location
  const location = useLocation();

  // Function to handle scrolling
  const handleScrolling = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    // Add event listener for scrolling when the component mounts
    window.addEventListener("scroll", handleScrolling);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle the data received from SearchBar
  const handleSearch = (data) => {
    setCocktailData(data);
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-start" style={{ backgroundImage: `url(${wall})` }}>
      {showModal && (
        <Modal closeModal={closeModal} />
      )}
      <SearchBar onSearch={handleSearch} />
      {cocktailData && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cocktailData.drinks.map((cocktail) => (
            <Cocktail key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
