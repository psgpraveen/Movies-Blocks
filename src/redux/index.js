import { configureStore } from '@reduxjs/toolkit';
// Import the configureStore function from Redux Toolkit

import moviesReducer from './Initial';
// Import the movies reducer from the specified path

export default configureStore({
  // Configure the Redux store

  reducer: {
    // Define the reducer for the store

    movies: moviesReducer
    // Assign the movies reducer to the movies slice of the state
  },
});
