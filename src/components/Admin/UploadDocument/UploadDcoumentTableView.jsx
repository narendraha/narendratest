import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteUploadedDocumentRequest } from "../../../store/UploadDocumnet/slice";

const UploadDocumentTableView = React.memo(({ props }) => {
    const dispatch = useDispatch();

    const handleDeletsFile = () => {
        dispatch(deleteUploadedDocumentRequest(props.id))
    }

    // const deleteCon

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
                        <i className='icon_alfred_document text-info' onClick={handleDeletsFile}></i>
                        <i className='icon_alfred_trashbin'></i>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    );
});

export default UploadDocumentTableView;
