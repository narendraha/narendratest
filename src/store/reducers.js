import { combineReducers } from '@reduxjs/toolkit';
import adminCreationSlice from './AdminCreation/slice';
import approveUsersSlice from './ApproveUsers/slice';
import educationalChatBotSlice from './EducationaChatBot/slice';
import homePageSlice from './Home/slice';
import profileSlice from './Profile/slice';
import promptChangesSlice from './PromptChanges/slice';
import sessionStoreSlice from './SessionStore/slice';
import uploadDocumentSlice from './UploadDocumnet/slice';
import utilityCallFunctionSlice from './UtilityCallFunction/slice';

const rootReducer = combineReducers({
  utilityCallFunctionSlice,
  profileSlice,
  homePageSlice,
  educationalChatBotSlice,
  sessionStoreSlice,
  adminCreationSlice,
  approveUsersSlice,
  uploadDocumentSlice,
  promptChangesSlice
});

export default rootReducer;