import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchKey: "",
    allAdminsList: undefined
}

const adminCreationSlice = createSlice({
    name: "adminCreationSlice",
    initialState,
    reducers: {
        setResetAdminCreationSlice: () => {
            return initialState
        },
        setSearchKey: (state, action) => {
            state.searchKey = action?.payload
        },
        getAllAdminsListRequest: () => { },
        getAllAdminsListResponse: (state, action) => {
            state.allAdminsList = action?.payload
        },
        addOrUpdateAdminRequest: () => { },
        deleteAdminRequest: () => { }
    }
});

let { actions, reducer } = adminCreationSlice;

export const {
    setResetAdminCreationSlice,
    setSearchKey,
    getAllAdminsListRequest, getAllAdminsListResponse,
    addOrUpdateAdminRequest,
    deleteAdminRequest,
} = actions;

export default reducer