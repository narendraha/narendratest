import React from 'react';
import { useDispatch } from 'react-redux';
import { getActionTypes, getAdminUserStatus } from '../../../_mock/helperIndex';
import { setUserStatusRequest } from '../../../store/ApproveUsers/slice';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

export const ApproveUsersTableView = ({ users }) => {
    const dispatch = useDispatch();

    let checkStatus = (status) => {
        return users?.user_status === status
    }
    const setStatusHandle = (status) => {
        dispatch(setUserStatusRequest({ patient_id: users?.patient_id, status }))
    }

    const selectUserHandle = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: users }))
    }

    return (
        <React.Fragment>
            <tr>
                <td><div className={(!checkStatus(getAdminUserStatus.APPROVE) && !checkStatus(getAdminUserStatus.PENDING)) ? 'al_text_link d-inline-block' : ''} onClick={selectUserHandle}>{users?.username}</div></td>
                <td>{users?.email}</td>
                <td>{users?.gender}</td>
                <td>{users?.mobile}</td>
                <td>{users?.dob}</td>
                {!checkStatus(getAdminUserStatus.PENDING) &&
                    <>
                        <td>{users?.updated_by || "NA"}</td>
                        <td>{users?.updated_date || "NA"}</td>
                    </>
                }
                <td>
                    <div className='d-flex gap-2'>
                        {checkStatus(getAdminUserStatus.PENDING) ?
                            <>
                                <button type="button" className='al_button_sm al_savebtn' onClick={() => setStatusHandle(getAdminUserStatus.APPROVE)}>Approve</button>
                                <button type="button" className='al_button_sm al_testbtn' onClick={() => setStatusHandle(getAdminUserStatus.HOLD)}>Hold</button>
                                <button type="button" className='al_button_sm al_cancelbgbutton' onClick={() => setStatusHandle(getAdminUserStatus.REJECT)}>Reject</button>
                            </>
                            :
                            <button type="button" className='al_button_sm al_testbtn' onClick={() => setStatusHandle(getAdminUserStatus.UNDO)}>Undo</button>
                        }
                    </div>
                </td>
            </tr>
        </React.Fragment >
    )
}
