import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';
import homePageSlice from './Home/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';
import patientRegisterSlice from "./PatientRegisterFlow/slice";


const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
  patientRegisterSlice
});

export default rootReducer;