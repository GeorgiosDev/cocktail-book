// Import the necessary dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Saved from '../components/Saved';

const Account = () => {
  const { user } = UserAuth();
  const [savedCocktails, setSavedCocktails] = useState([]);

  
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
        setSavedCocktails(doc.data()?.savedCocktails || []);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const cocktailRef = doc(db, 'users', `${user?.email}`);

  const removeSavedCocktail = async (cocktailId) => {
    try {
      const result = savedCocktails.filter((item) => item.id !== cocktailId);
      await updateDoc(cocktailRef, {
        savedCocktails: result,
      });

      console.log("Cocktail removed successfully.");
    } catch (error) {
      console.error("Error removing cocktail:", error);
    }
  };
  return (
    <div className="text-center">
      <Link to="/" className="absolute top-4 right-8 border border-amber-300 bg-slate-500">
        Go to Homepage
      </Link>
      <h2 className="font-bold text-xl mt-20">Favourite cocktails</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {savedCocktails.map((cocktail) => (
          <Saved
            key={cocktail.id}
            cocktail={cocktail}
            onRemove={() => removeSavedCocktail(cocktail.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Account;
