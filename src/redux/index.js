import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './Initial'
export default configureStore({
  reducer: {
    movies: moviesReducer

  },
})