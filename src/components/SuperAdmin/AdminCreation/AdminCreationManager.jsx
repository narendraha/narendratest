import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActionTypes } from "../../../_mock/internalJsControl";
import { setResetAdminCreationSlice } from "../../../store/AdminCreation/slice";
import { AdminCreationAction } from "./AdminCreationAction";
import { AdminCreationFilter } from "./AdminCreationFilter";

const AdminCreationManager = () => {
    const dispatch = useDispatch();

    const actionType = useSelector((state) => (state?.utilityCallFunctionSlice?.actionType)) || getActionTypes.UNSELECT;

    useEffect(() => {
        return () => {
            dispatch(setResetAdminCreationSlice())
        }
    })
    return (
        <React.Fragment>
            <div className="wflexLayout">
                {(actionType === getActionTypes.ADD || actionType === getActionTypes.EDIT) ? <AdminCreationAction /> : <AdminCreationFilter />}
            </div>
        </React.Fragment>
    )
}

export default AdminCreationManager