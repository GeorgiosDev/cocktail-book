import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Saved({ cocktail, onRemove }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div className="p-10">
      <div className="max-w-sm overflow-hidden shadow-lg text-center text-gray-800 rounded-2xl bg-yellow-400 relative">
        <h2 className="font-bold text-xl mb-2">{cocktail.title}</h2>
        <div className="heart-icon">
          <img className="w-full" src={cocktail.img} alt={cocktail.title} />
        </div>
        <div className="px-6 py-2 cursor-pointer" onClick={toggleInstructions}>
          <h4 className="text-lg font-semibold mt-2">
            Instructions{' '}
            {showInstructions ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          {showInstructions ? (
            <p className="text-gray-700 text-base">{cocktail.instructions}</p>
          ) : null}
        </div>
        <div className="px-6 py-2 cursor-pointer" onClick={toggleIngredients}>
          <h4 className="text-lg font-semibold mt-2">
            Ingredients{' '}
            {showIngredients ? <FaChevronUp /> : <FaChevronDown />}
          </h4>
          {showIngredients ? (
            <ul className="list-disc list-inside ml-4">
              {cocktail.ingredients.map((ingredient, index) => (
                <li key={`ingredient-${index}`}>
                  <span className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #{ingredient.name} - {ingredient.measure}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div
          className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
          onClick={() => onRemove(cocktail.id)}
        >
          <AiFillHeart />
        </div>
      </div>
    </div>
  );
}

export default Saved;
