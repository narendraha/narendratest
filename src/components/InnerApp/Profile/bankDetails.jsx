import React, { useState } from 'react';


export const BankDetails = ({props}) => {

    const [isOpenModel, setOpenModel] = useState(true);

    const handleClose = () => {
        setOpenModel(false)
        props(isOpenModel)
    }

    return (
        <>
            This feature will come soon
            <button type="submit" className="al_savebtn" onClick={handleClose}>
                Cancel
            </button>
        </>
    )
}
