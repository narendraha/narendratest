import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';
import homePageSlice from './Home/slice';


const rootReducer = combineReducers({
  profileSlice,
  homePageSlice,
});

export default rootReducer;