import React from 'react';
import { useSelector } from 'react-redux';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { UploadDocumentAction } from './UploadDocumentAction';
import { UploadDocumentFilter } from './UploadDocumentFilter';

const UploadDocumentManager = () => {

    let actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType);

    console.log("actionTypeactionType",actionType)
    return (
        <React.Fragment>
            <div className="wflexLayout">
                {actionType === getActionTypes.ADD ? <UploadDocumentAction /> : <UploadDocumentFilter />}
            </div>
        </React.Fragment>
    )
}

export default UploadDocumentManager;