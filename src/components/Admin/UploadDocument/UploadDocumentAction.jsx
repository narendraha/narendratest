import React from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Col, Label, Row } from 'reactstrap';
import { getActionTypes } from "../../../_mock/internalJsControl";
import fileupload from '../../../images/fileupload.svg';
import { setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";
import { UploadDocumentRecentFileView } from "./UploadDocumentRecentView";
import { FileUploadAnimation } from "./fileUploadAnimation";

export const UploadDocumentAction = React.memo(() => {
    const dispatch = useDispatch();

    const DragAndDropHandle = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleFileUploadParent = (setFieldValue) => {
        setFieldValue("uploadedDocument", "")
    }

    const handleCancel = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT }))
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    uploadedDocument: ""
                }}
                onSubmit={(values) => {
                    console.log("Submit=>", values)
                }}
            >{({ values, setFieldValue }) => (
                <>
                    <Form>
                        <div className='wflexScroll d-flex flex-column'>
                            <div className='flex-grow-1'>
                                <div className='al-pad pb-0'>
                                    <h3 className='bc_main_text mb-1 me-4'>Upload Document</h3>
                                    <Label>Upload document to Alfred chatbot for real-time responses.</Label>
                                </div>
                                <Row className='mx-0 al_uploaddoc'>
                                    <Col xl="4" lg="5" md="6" sm="12" className='px-0'>
                                        <div className='al-pad pb-0'>
                                            <div className='al_filedragupload'
                                                onDrop={e => DragAndDropHandle(e)}
                                                onDragOver={e => DragAndDropHandle(e)}
                                                onDragEnter={e => DragAndDropHandle(e)}
                                                onDragLeave={e => DragAndDropHandle(e)}
                                            >
                                                <img src={fileupload} alt="dragfile" />
                                                <div className='mt-2'>Drag & Drop the file</div>
                                                <h6>OR</h6>
                                                <input
                                                    type="file"
                                                    id="document"
                                                    hidden
                                                    onChange={(e) => setFieldValue('uploadedDocument', e?.target?.files)}
                                                />

                                                <div id="al_blockele">
                                                    <label htmlFor="document" className="al_choose">
                                                        Browse File
                                                    </label>
                                                </div>
                                            </div>
                                            {/* File Upload animation */}
                                            <FileUploadAnimation props={{ fileUpload: values?.uploadedDocument, handleFileUpload: () => handleFileUploadParent(setFieldValue) }} />
                                        </div>
                                    </Col>
                                    <UploadDocumentRecentFileView />
                                </Row>
                            </div>
                            <div className='mt-2 al-pad pt-0'>
                                <button
                                    type="button"
                                    className="al_cancelbgbutton me-3"
                                    onClick={handleCancel}
                                >Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="al_savebtn"
                                // onClick={() => setView("view")}
                                >Save
                                </button>
                            </div>
                        </div>
                    </Form>
                </>
            )}
            </Formik>
        </React.Fragment>
    )
});