import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { setActionTypeAndActionData } from '../../../store/Profile/slice';

export const BankDetails = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }

    return (
        <>
            <Modal isOpen={true} className="al_confirm_modal" wrapClassName="al_outerparentwp">
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll text-center'>
                        <h6>This feature will come soon</h6>
                        <button type="submit" className="btn al_button_add" onClick={handleClose}>
                            OK
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}
