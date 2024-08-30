import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { FormGroup, Modal, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
import { customContentValidation } from '../../_mock/coreHelperHA';
import { getActionTypes } from '../../_mock/internalJsControl';
import { setChatFeedBackCommentRequest } from '../../store/EducationaChatBot/slice';

export const ChatBotFeedBackModal = ({ props }) => {
    const dispatch = useDispatch();

    let { commentModalHandle, botResponse } = props

    const moalCloseHandle = () => {
        commentModalHandle(getActionTypes.UNSELECT)
    }

    return (
        <>
            <Formik
                initialValues={{
                    comment: ""
                }}
                validationSchema={Yup.object().shape({
                    comment: customContentValidation('Comment is required', { patternType: 'alphaNumeric', message: 'alphaNumeric' },),
                })}
                onSubmit={(values) => {
                    dispatch(setChatFeedBackCommentRequest({ comment: values?.comment, botResponse }))
                }}
            >{({ values, setFieldValue }) => (
                <Modal className='modal-sm detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                    <div className='d-flex align-items-center justify-content-between p-4'>
                        <h6 className='mb-0'>Submit Feedback to Hello Alfred</h6>
                        {/* <i className="icon_alfred_close pointer" title="Close" onClick={() => { }}></i> */}
                    </div>
                    <ModalBody className="wflexLayout p-0">
                        <Form>
                            <div className='wflexScroll px-4 my-4'>
                                <FormGroup>
                                    <Field
                                        as="textarea"
                                        name="comment"
                                        value={values?.comment}
                                        placeholder='Enter Remarks'
                                        className='form-control'
                                        rows="4"
                                        onChange={(e) => setFieldValue("comment", e?.target?.value)}
                                    />
                                    <ErrorMessage
                                        name="comment"
                                        component={"div"}
                                        className="text-danger"
                                    />
                                </FormGroup>
                                <div className='mt-4'>
                                    <button
                                        type="submit"
                                        className="al_button_add me-3"
                                    >Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="al_button_cancel"
                                        onClick={moalCloseHandle}
                                    >Cancel
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            )}
            </Formik>
        </>
    )
}