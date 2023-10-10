import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';

function SearchBar({ onSearch }) {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search button click
  const handleSearch = async () => {
    try {
      const response = await axios.get('https://the-cocktail-db.p.rapidapi.com/search.php', {
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
        },
        params: {
          s: searchTerm,
        },
      });
  
      // Check if there are no search results
      if (!response.data.drinks) {
        alert("No results. Please enter a valid cocktail name.");
        return;
      }
  
      onSearch(response.data);
    } catch (error) {
      console.log(error);
      alert("An error occurred while fetching data. Please try again later.");
    }
  };
  
  // Handle Enter key press for search
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full mt-10 sm:mt-50">
      <div className="flex items-center justify-end w-full mb-4">
        {user ? (
          // User is logged in
          <div className="flex items-center space-x-4 mr-4">
            <Link to="/account">
              <button className="text-black text-xl font-blod pr-4 hover:underline">
                Account {user.email} {/* Display user's email */}
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-full cursor-pointer text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          // User is not logged in
          <div className="flex items-center space-x-4 mr-4">
            <Link to="/login">
              <button className="text-black px-4 py-2 bg-cyan-200 rounded-full border border-gray-600 hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500 focus:text-white">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-gray-700 px-4 py-2 rounded-full bg-lime-300 border border-gray-600 hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500 focus:text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      <h2 className="font-bold text-xl mb-2">Search cocktail by name</h2>
      <input
        type="text"
        placeholder="Search cocktails by name"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleEnterKeyPress}
        className="w-3/4 h-12 p-2 rounded-full border border-gray-600 focus:outline-none focus:border-blue-500 mt-2 sm:mt-0 text-center"
      />

      <button
        onClick={handleSearch}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
