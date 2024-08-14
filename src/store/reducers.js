import { combineReducers } from '@reduxjs/toolkit';
import educationalChatBotSlice from './EducationaChatBot/slice';
import homePageSlice from './Home/slice';
import patientRegisterSlice from "./PatientRegisterFlow/slice";
import profileSlice from './Profile/slice';
import sessionStoreSlice from './SessionStore/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
  patientRegisterSlice,
  educationalChatBotSlice,
  sessionStoreSlice,
});

export default rootReducer;