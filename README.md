# The Cocktail Book

![Screenshot](/src/assets/images/screenshot1.png)
![Screenshot2](/src/assets/images/screenshot2.png)




![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API](#cocktail-db-api)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

"The Cocktail Book" is a web application that allows users to discover and explore their favorite cocktails. Users can search for cocktails by name or ingredient, view detailed information, including ingredients and preparation instructions, and even save their favorite cocktails for later. The application utilizes React, Firebase for user authentication and database storage, and the Cocktail DB API for cocktail data.

## Features

- **Cocktail Search**: Easily search for cocktails by name or ingredient.
- **Cocktail Details**: Access detailed information on each cocktail, including ingredients and preparation instructions.
- **User Authentication**: Create an account and securely log in.
- **Favorite Cocktails**: Registered users can save their favorite cocktails for easy access.

## Getting Started

### Prerequisites

Before you replicate this project, make sure you have the following prerequisites:

- Node.js and npm installed on your machine.
- A Firebase project with Authentication and Firestore enabled. Obtain your Firebase configuration.

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/[your-username]/[your-repo].git](https://github.com/GeorgiosDev/cocktail-book/blob/main/README.md)
  
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Configure Firebase:
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication and Firestore in your project.
   - Obtain your Firebase configuration object (apiKey, authDomain, projectId, etc.) from your Firebase project settings.

2. Create a `.env` file in the project root directory and add your Firebase configuration without revealing your environment variables:

   ```env
   REACT_APP_FIREBASE_API_KEY=[Your API Key]
   REACT_APP_FIREBASE_AUTH_DOMAIN=[Your Auth Domain]
   REACT_APP_FIREBASE_PROJECT_ID=[Your Project ID]
   REACT_APP_FIREBASE_STORAGE_BUCKET=[Your Storage Bucket]
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=[Your Messaging Sender ID]
   REACT_APP_FIREBASE_APP_ID=[Your App ID]
   ```

3. Additionally, if you want to use the Cocktail DB API, you can add your API key to the `.env` file:

   ```env
   REACT_APP_RAPIDAPI_KEY=[Your RapidAPI Key]
   ```

## Usage

1. **Cocktail Search**: Enter the name or ingredient of a cocktail in the search bar and click the "Search" button to find cocktails.

2. **Cocktail Details**: Click on a cocktail to view its details, including ingredients and preparation instructions.

3. **User Authentication**: Create an account or log in to save your favorite cocktails.

4. **Save Favorites**: When logged in, click the "Save to Favorites" button on a cocktail detail page to add it to your favorites.

## Cocktail DB API

"The Cocktail Book" can be configured to use the [Cocktail DB API](https://rapidapi.com/thecocktaildb/api/the-cocktail-db) to fetch cocktail data. You can obtain your API key by signing up on the RapidAPI platform and subscribing to the API.

## Technologies Used

- React
- Create React App (CRA)
- Tailwind CSS
- React Icons
- Firebase Authentication
- Firebase Firestore


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
