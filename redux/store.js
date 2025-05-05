import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice'; 

const store = configureStore({
  reducer: {
    livros: bookReducer, 
  },
});

export default store;