import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { DocumentViewer } from '../../Utilities/DocumentViewer';
import { UploadDocumentAction } from './UploadDocumentAction';
import { UploadDocumentFilter } from './UploadDocumentFilter';
import { UploadDocumentTableManager } from './UploadDocumentTableManager';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

const UploadDocumentManager = () => {
    const dispatch = useDispatch();
    const [isShowexpandmenu, setIsShowexpandmenu] = useState(false);
    let actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType);
    const menuExpandHandle = () => {
        setIsShowexpandmenu(false);
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }))
    };
    return (
        <React.Fragment>
            <div className={"wflexLayout " + (actionType === getActionTypes.ADD ? '' : 'flex-row')}>
                {actionType === getActionTypes.ADD ? <UploadDocumentAction /> :
                    <>
                        <div className="wflexLayout flex-grow-1">
                            <UploadDocumentFilter />
                            <UploadDocumentTableManager />
                        </div>
                        <div className={"al_updf_expand" + (isShowexpandmenu ? " al_updf_slide_in" : " al_updf_slide_out")}>
                             {actionType === getActionTypes.SELECT && <><i
                                                    className="icon_alfred_close pointer text-end"
                                                    onClick={menuExpandHandle}
                                                ></i>
                                <DocumentViewer /></>}
                        </div>
                    </>}
            </div>
        </React.Fragment>
    )
}

export default UploadDocumentManager;