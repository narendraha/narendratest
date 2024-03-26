import React, { useState } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

// const actionClasses = [
//     { name: 'Yes', className: ' al_button_add' },
//     { name: 'No', className: ' al_button_cancel' },
//     { name: 'copy', className: ' al_button_info' },
//     { name: 'cancel', className: ' al_button_cancel' },
// ];

export default function ConfirmationAction() {

    const [closeconfirmModal, setCloseconfirmModal] = useState(true);
    return (
        <>
            {<Modal isOpen={closeconfirmModal ? true : false} className='al_confirm_modal' wrapClassName='al_outerparentwp'>
                <ModalBody>
                    <h5 className="text-center text-wrap al_modal_heading">Confirmation</h5>
                    <h5 className="text-center text-wrap al_modal_subheading">Do you want to save this data</h5>
                </ModalBody>

                <div className="modelFooter text-center mb-3">
                    <Button type="button" className="text-capitalize btn al_button_add" onClick={() => setCloseconfirmModal(!closeconfirmModal)}>OK</Button>
                </div>
            </Modal>}
        </>
    )
}