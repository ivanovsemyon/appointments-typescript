import {
  applyMiddleware,
  combineReducers,
  configureStore,
  createStore,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import appointmentSlice from './appointmentSlice';

export default configureStore({
  reducer: {
    appointments: appointmentSlice,
  },
});

export const store = createStore(combineReducers(), applyMiddleware(thunk));
