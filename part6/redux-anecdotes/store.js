import { configureStore } from '@reduxjs/toolkit';
import reducer from './src/reducers/anecdoteReducer';
import filterReducer from './src/reducers/filterReducer';
import notificationReducer from './src/reducers/notificationReducer';

const store = configureStore({
    reducer: {
      anecdotes: reducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  });
  
  export default store;