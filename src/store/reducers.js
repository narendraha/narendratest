import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';


const rootReducer = combineReducers({
  profileSlice
});

export default rootReducer;