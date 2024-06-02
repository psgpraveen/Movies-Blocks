

# Movies-Blocks Application

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Overview

Movies-Blocks is a web application that allows users to sign up, sign in, create lists, and view a list of movies. The project demonstrates basic CRUD operations and the integration of a backend with a React frontend.

## Features

- User registration and authentication
- Create and manage lists of movies
- Fetch and display lists from a MongoDB database

## Technologies

### Frontend

- React
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:


git clone https://github.com/yourusername/movies-blocks.git
cd movies-blocks


2. Install backend dependencies:


cd Backend
npm install


3. Install frontend dependencies:


cd ../Frontend
npm install

4. Set up MongoDB:

Make sure MongoDB is running on your local machine. By default, the application connects to `mongodb://localhost:27017/Movies-Blocks`.

## Usage

### Running the Backend

1. Start the backend server:


cd Backend
node index.js


Backend Github Repo: https://github.com/psgpraveen/Movies-Blocks-Backend.git

The backend server will run on `http://localhost:5000`.

### Running the Frontend

1. Start the React application:


cd ../Frontend
npm start


The frontend application will run on `http://localhost:3000`.

## API Endpoints

### POST `/signup`

Create a new user.

- **Request Body**: `{ "email": "user@example.com", "password": "password123", "name": "User Name" }`
- **Response**: `{ "success": true, "message": "Account created successfully" }`

### POST `/signin`

Authenticate a user.

- **Request Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `{ "success": true, "message": "Sign in successful", "user": { ...userDetails } }`

### POST `/list`

Create a new list.

- **Request Body**: `{ "id": "uniqueId" }`
- **Response**: `{ "success": true, "message": "List created successfully" }`

### GET `/getlist`

Fetch all lists.

- **Response**: `[{ "da": { ...listDetails } }, ...]`

## Project Structure

movies-blocks/
├── Backend/
│   ├── index.js
│   ├── mongodb.js
│   ├── signin.js
│   ├── list.js
│   ├── Getlist.js
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   └── Index.js
│   │   │   ├── Footer/
│   │   │   │   └── Index.js
│   │   │   ├── Card/
│   │   │   │   └── Index.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── public/
│   │   └── index.html
│   └── ...
├── README.md
└── ...





#
