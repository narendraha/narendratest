import React from 'react';
import { useSelector } from 'react-redux';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { UploadDocumentAction } from './UploadDocumentAction';
import { UploadDocumentFilter } from './UploadDocumentFilter';
import { UploadDocumentTableManager } from './UploadDocumentTableManager';

const UploadDocumentManager = () => {

    let actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType);

    return (
        <React.Fragment>
            <div className="wflexLayout">
                {actionType === getActionTypes.ADD ? <UploadDocumentAction /> :
                    <>
                        <div className="wflexLayout">
                            <UploadDocumentFilter />
                            <UploadDocumentTableManager />
                        </div>
                    </>}
            </div>
        </React.Fragment>
    )
}

export default UploadDocumentManager;