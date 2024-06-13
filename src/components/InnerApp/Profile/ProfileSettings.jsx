import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';

export const ProfileSettings = ({ props }) => {

    const [isOpenModel, setOpenModel] = useState(true);

    const handleClose = () => {
        setOpenModel(false)
        props(isOpenModel)
    }

    return (
        <>
            <Modal isOpen={isOpenModel ? true : false} className="al_confirm_modal" wrapClassName="al_outerparentwp">
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
