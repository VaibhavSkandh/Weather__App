My React App
This project is a React application built with modern tooling. This README provides instructions for setting up and running the project locally, as well as details on the required environment variables.

Table of Contents
Prerequisites

Installation

Environment Variables

Available Scripts

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 14 or higher)

npm or Yarn

Installation
Follow these steps to get the project up and running on your local machine.

Clone the repository:

git clone https://github.com/VaibhavSkandh/Weather__App.git
cd my-react-app

Install dependencies:

npm install
# or
yarn install

Set up environment variables:
Create a .env file in the root directory of the project. Copy the content from the .env.example file (if it exists) and replace the placeholder values with your own.

Environment Variables
This project requires specific environment variables for its Firebase and weather API integrations. These variables should be defined in a .env file in the root directory.

Variable

Description

REACT_APP_FIREBASE_API_KEY

Your Firebase project's API key.

REACT_APP_FIREBASE_AUTH_DOMAIN

Your Firebase project's authentication domain.

REACT_APP_FIREBASE_PROJECT_ID

The ID for your Firebase project.

REACT_APP_FIREBASE_STORAGE_BUCKET

The storage bucket URL for your Firebase project.

REACT_APP_FIREBASE_MESSAGING_SENDER_ID

Your Firebase project's messaging sender ID.

REACT_APP_FIREBASE_APP_ID

The app ID for your Firebase web application.

REACT_APP_WEATHER_API_KEY

Your API key for the weather service.

Available Scripts
In the project directory, you can run:

npm start

Runs the app in development mode.

Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

npm test

Launches the test runner in interactive watch mode.

npm run build

Builds the app for production to the build folder.

It correctly bundles React in production mode and optimizes the build for the best performance.