import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  arrayUnion,
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
} from 'firebase/firestore';

function Cocktail({ cocktail }) {
  // State variables
  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [heart, setHeart] = useState(true);
  const { user } = UserAuth();
  const [saved, setSaved] = useState(false);

  // Function to save or remove a cocktail
  const savedCocktail = async () => {
    if (user?.email) {
      const cocktailRef = doc(db, "users", user.email);

      // Check if the cocktail is already saved
      const savedCocktailData = (await getDoc(cocktailRef)).data();
      const savedCocktails = savedCocktailData?.savedCocktails || [];

      const isCocktailSaved = savedCocktails.some(
        (savedCocktail) => savedCocktail.id === cocktail.idDrink
      );

      if (isCocktailSaved) {
        // If the cocktail is already saved, remove it from the array using arrayRemove
        await updateDoc(cocktailRef, {
          savedCocktails: savedCocktails.filter(
            (savedCocktail) => savedCocktail.id !== cocktail.idDrink
          ),
        });
        alert("Removed from saved cocktails");
      } else {
        // If the cocktail is not saved, add it to the array using arrayUnion
        const ingredientsArray = Array.from({ length: 15 }, (_, i) => {
          if (cocktail[`strIngredient${i + 1}`]) {
            return {
              name: cocktail[`strIngredient${i + 1}`],
              measure: cocktail[`strMeasure${i + 1}`],
            };
          }
          return null;
        }).filter(Boolean);

        await updateDoc(cocktailRef, {
          savedCocktails: arrayUnion({
            id: cocktail.idDrink,
            title: cocktail.strDrink,
            img: cocktail.strDrinkThumb,
            instructions: cocktail.strInstructions,
            ingredients: ingredientsArray,
          }),
        });
        alert("Saved");
      }
    } else {
      alert("You have to log in to save cocktails");
    }
  };

  // Function to toggle heart icon
  const toggleHeart = () => {
    setHeart(!heart);
  };

  // Function to toggle instructions visibility
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  // Function to toggle ingredients visibility
  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className="p-10">
      {/* Cocktail Card */}
      <div className="max-w-sm overflow-hidden shadow-lg text-center text-gray-800 rounded-2xl bg-yellow-400 relative">
        {/* Heart Icon */}
        <div
          className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
          onClick={() => {
            toggleHeart();
            savedCocktail();
          }}
        >
          {heart ? <AiOutlineHeart /> : <AiFillHeart />}
        </div>

        <h2 className="font-bold text-xl mb-2">{cocktail.strDrink}</h2>
        <div className="heart-icon">
          <img
            className="w-full"
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
          />
        </div>
        {/* Show/Hide Instructions */}
        <div className="px-6 py-2 cursor-pointer" onClick={toggleInstructions}>
          <h4 className="text-lg font-semibold mt-2">
            Instructions{' '}
            {showInstructions ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          {showInstructions ? (
            <p className="text-gray-700 text-base">
              {cocktail.strInstructions}
            </p>
          ) : null}
        </div>

        {/* Show/Hide Ingredients */}
        <div className="px-6 py-2 cursor-pointer" onClick={toggleIngredients}>
          <h4 className="text-lg font-semibold mt-2">
            Ingredients{' '}
            {showIngredients ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          {showIngredients ? (
            <ul className="list-disc list-inside ml-4">
              {Array.from({ length: 15 }, (_, i) =>
                cocktail[`strIngredient${i + 1}`] ? (
                  <li key={`ingredient-${i}`}>
                    <span className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{cocktail[`strIngredient${i + 1}`]} -{' '}
                      {cocktail[`strMeasure${i + 1}`]}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          ) : null}
        </div>
      </div>
      {/* End Cocktail Card */}
    </div>
  );
}

export default Cocktail;
