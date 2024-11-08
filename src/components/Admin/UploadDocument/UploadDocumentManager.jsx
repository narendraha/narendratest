import React from 'react';
import { useSelector } from 'react-redux';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { DocumentViewer } from '../../Utilities/DocumentViewer';
import { UploadDocumentAction } from './UploadDocumentAction';
import { UploadDocumentFilter } from './UploadDocumentFilter';
import { UploadDocumentTableManager } from './UploadDocumentTableManager';

const UploadDocumentManager = () => {

    let actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType);

    return (
        <React.Fragment>
            <div className={"wflexLayout " + (actionType === getActionTypes.ADD ? '' : 'flex-row')}>
                {actionType === getActionTypes.ADD ? <UploadDocumentAction /> :
                    <>
                        <div className="wflexLayout flex-grow-1">
                            <UploadDocumentFilter />
                            <UploadDocumentTableManager />
                        </div>
                        {actionType === getActionTypes.SELECT && <div className={"al_updf_expand al_updf_slide_in"}>
                            <DocumentViewer />
                        </div>}
                    </>}
            </div>
        </React.Fragment>
    )
}

export default UploadDocumentManager;