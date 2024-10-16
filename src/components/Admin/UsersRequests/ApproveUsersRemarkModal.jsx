import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { FormGroup, Label, Modal, ModalBody } from 'reactstrap';
import { getActionTypes, getAdminUserStatus } from '../../../_mock/internalJsControl';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

export const ApproveUsersRemarkModal = React.memo(() => {
    const dispatch = useDispatch();
    const actionType = useSelector((state) => (state?.utilityCallFunctionSlice?.actionType || getActionTypes.UNSELECT));
    const actionData = useSelector((state) => (state?.utilityCallFunctionSlice?.actionData));

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: undefined }))
    }

    return (
        <React.Fragment>
            <Modal className='modal-sm detailsModal' isOpen={actionType === getActionTypes.SELECT} wrapClassName="al_outerparentwp">
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>{actionData?.user_status === getAdminUserStatus.HOLD ? `Hold` : `Reject`} Reason</h6>
                    <i className="icon_alfred_close pointer" title="Close" onClick={handleClose}></i>
                </div>
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll px-4 mb-4'>
                        <FormGroup>
                            <Label>Reason</Label>
                            <Select
                                className="inputSelect"
                                // options={rejectreasons}
                                menuPortalTarget={document.body}
                                styles={{
                                    menu: styles => ({ ...styles, zIndex: "3", boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);", marginTop: 0 }),
                                    menuList: styles => ({
                                        ...styles, maxHeight: '180px', msOverflowStyle: "auto", wordBreak: "break-word", border: "1px solid #efefef", borderRadius: "4px",
                                        color: "#333333", fontSize: "0.8em", padding: 0, margin: 0,
                                    }),
                                    menuPortal: styles => ({
                                        ...styles,
                                        zIndex: 9999,
                                    }),
                                }}
                                name="reasontype"
                                onChange={() => { }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Enter Remarks</Label>
                            <textarea
                                type="text"
                                name="remarks"
                                className='form-control'
                            />
                        </FormGroup>
                        <div className='mt-2'>
                            <button
                                type="submit"
                                className="al_button_add"
                            >Submit
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
});
