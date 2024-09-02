import { combineReducers } from '@reduxjs/toolkit';
import behaviouralChatBotSlice from './BehaviouralChatBot/slice';
import educationalChatBotSlice from './EducationaChatBot/slice';
import homePageSlice from './Home/slice';
import profileSlice from './Profile/slice';
import sessionStoreSlice from './SessionStore/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
  educationalChatBotSlice,
  behaviouralChatBotSlice,
  sessionStoreSlice,
});

export default rootReducer;