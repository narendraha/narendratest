import { combineReducers } from '@reduxjs/toolkit';
import adminCreationSlice from './AdminCreation/slice';
import approveUsersSlice from './ApproveUsers/slice';
import educationalChatBotSlice from './EducationaChatBot/slice';
import homePageSlice from './Home/slice';
import profileSlice from './Profile/slice';
import sessionStoreSlice from './SessionStore/slice';
import uploadDocumentSlice from './UploadDocument/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
  educationalChatBotSlice,
  sessionStoreSlice,
  adminCreationSlice,
  approveUsersSlice,
  uploadDocumentSlice
});

export default rootReducer;