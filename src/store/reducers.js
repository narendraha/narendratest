import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';
import homePageSlice from './Home/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';


const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
});

export default rootReducer;