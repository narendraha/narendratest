import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { deleteAdminRequest } from '../../../store/AdminCreation/slice';
import { setActionTypeAndActionData, setConfirmationOpen } from '../../../store/UtilityCallFunction/slice';

export const AdminCreationTableView = React.memo(({ admin }) => {
    const dispatch = useDispatch();

    const { allAdminsList } = useSelector((state) => (state?.adminCreationSlice));
    let selectedAdmin = allAdminsList?.find((x) => x.user_id === admin.user_id);

    const editHandle = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.EDIT, actionData: selectedAdmin }))
    }

    const handleDelete = () => {
        dispatch(deleteAdminRequest(admin.user_id))
    }

    const confirmationHandle = () => {
        dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, message: `Do you want to delete admin ${admin?.name}`, options: ["Yes", "No"], callApi: handleDelete }))
    }

    return (
        <React.Fragment>
            <tr key={admin.user_id} className={admin?.expired ? `al_exp_acc` : ''}>
                <td>
                    {admin?.expired && <i className="icon_alfred_warning blinkanimation ms-1"></i>}
                    {admin?.name}
                </td>
                <td>{admin?.email}</td>
                <td>{admin?.mobile}</td>
                <td>{admin?.designation}</td>
                <td>{moment(admin?.assigned_date).format("MM/DD/yyyy")}</td>
                <td>{moment(admin?.expiry_date).format("MM/DD/yyyy")}</td>
                <td>{admin?.assigned_by}</td>
                <td>
                    <div className='al_cardactions'>
                        <i className='icon_alfred_edit' onClick={editHandle}></i>
                        <i className='icon_alfred_trashbin' onClick={confirmationHandle}></i>
                    </div>
                </td>
            </tr>
        </React.Fragment >
    )
});