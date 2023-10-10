// Modal.js
import React from 'react';
import cover from "../assets/images/cover.jpg"
import "../index.css"
import wallpaper from "../assets/images/wallpaper.jpg"


function Modal({ closeModal }) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center z-50 bg-gray-400  " style={{ backgroundImage: `url(${wallpaper})` }}>
      <div className="bg-gray-400 p-4  w-2/3 max-h-2/3 overflow-hidden flex flex-col items-center rounded-2xl"> 
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-4">The Cocktail Book</h1>
          <img
            src={cover}
            alt="Cover"
            className="max-w-full h-auto rounded-lg mx-auto"
          />
        </div>
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/4 modal-btn" 
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Modal;

