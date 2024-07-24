import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './Profile/slice';
import homePageSlice from './Home/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';
import patientRegisterSlice from "./PatientRegisterFlow/slice";
import educationalChatBotSlice from './EducationaChatBot/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
  patientRegisterSlice,
  educationalChatBotSlice,

});

export default rootReducer;