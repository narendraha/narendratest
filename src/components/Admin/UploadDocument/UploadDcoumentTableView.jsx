import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getActionTypes } from "../../../_mock/internalJsControl";
import { deleteUploadedDocumentRequest } from "../../../store/UploadDocumnet/slice";
import { setActionTypeAndActionData, setConfirmationOpen } from "../../../store/UtilityCallFunction/slice";

const UploadDocumentTableView = React.memo(({ props }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteUploadedDocumentRequest(props.id))
    }

    const deletConfirmationHandle = () => {
        dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, message: `Do you want to delete admin ${props?.fileName}`, options: ["Yes", "No"], callApi: handleDelete }))
    }

    const hanldeDocumentView = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: { link: props?.fileUrl, fileType: props?.type } }))
    }

    return (
        <React.Fragment>
            <tr>
                <td>{props?.fileName || "N/A"}</td>
                <td>{props.updatedBy}</td>
                <td>{moment(props.updatedOn)?.format("MM/DD/yyyy")}</td>
                <td>{props.size}</td>
                <td>{props.type}</td>
                <td>
                    <div className='al_cardactions'>
                        <i className='icon_alfred_document text-info' onClick={hanldeDocumentView}></i>
                        <i className='icon_alfred_trashbin' onClick={deletConfirmationHandle}></i>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    );
});

export default UploadDocumentTableView;
