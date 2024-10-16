import { createSlice } from "@reduxjs/toolkit";
import { getAdminUserStatus, getRole } from "../../_mock/internalJsControl";

const initialState = {
    searchKey: "",
    approveUsersActiveTab: getAdminUserStatus.PENDING,
    approveUserSelection: getRole.PATIENT,
    usersListWithStatus: undefined,
    remrkOpenModelObj: undefined
}

const approveUsersSlice = createSlice({
    name: "approveUsersSlice",
    initialState,
    reducers: {
        setResetApproveUsersSlice: () => {
            return initialState
        },
        setApproveUsersSearchKey: (state, action) => {
            state.searchKey = action?.payload
        },
        setApproveUsersActiveTab: (state, action) => {
            state.approveUsersActiveTab = action?.payload
        },
        setApproveUserSelection: (state, action) => {
            state.approveUserSelection = action?.payload
        },
        getUsersListWithStatusRequest: () => { },
        getUsersListWithStatusResponse: (state, action) => {
            state.usersListWithStatus = action?.payload
        },
        setUserStatusRequest: () => { },
        setUserStatusResponse: () => { },
        setRemarkOpenModel: (state, action) => {
            state.remrkOpenModelObj = action?.payload
        }
    }
});

let { actions, reducer } = approveUsersSlice;

export const {
    setResetApproveUsersSlice,
    setApproveUsersSearchKey,
    setApproveUsersActiveTab,
    setApproveUserSelection,
    getUsersListWithStatusRequest, getUsersListWithStatusResponse,
    setUserStatusRequest, setUserStatusResponse,
    setRemarkOpenModel
} = actions;

export default reducer