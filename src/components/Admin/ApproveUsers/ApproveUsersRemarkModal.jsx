import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { FormGroup, Label, Modal, ModalBody } from 'reactstrap';
import * as Yup from 'yup';
import { getAdminUserStatus } from '../../../_mock/internalJsControl';
import { setRemarkOpenModel, setUserStatusRequest } from '../../../store/ApproveUsers/slice';

// Reasons for hold and reject
const reasonOptions = [
    { value: 'Invalid Email', label: 'Invalid Email' },
    { value: 'Invalid Phone Number', label: 'Invalid Phone Number' },
    { value: 'other', label: 'Others' }
];

export const ApproveUsersRemarkModal = React.memo(() => {
    const dispatch = useDispatch();
    const [showRemarks, setShowRemarks] = useState(false);

    const remrkOpenModelObj = useSelector((state) => state?.approveUsersSlice.remrkOpenModelObj);
    let { isRemakrOpen, status, users } = remrkOpenModelObj || "";
    
    useEffect(()=>{
        return()=>{
            setShowRemarks(false)
        }
    },[])

    const handleClose = () => {
        dispatch(setRemarkOpenModel({ isRemakrOpen: false, status: null }));
    };

    const handleSubmit = (values) => {
        let remark = values?.remarks || values?.reason;
        dispatch(setUserStatusRequest({ patient_id: users?.patient_id, status, remark }));
    }

    const validationSchema = Yup.object({
        reason: Yup.string().required('Reason is required'),
        remarks: Yup.string().when('reason', {
            is: 'other',
            then: Yup.string().required('Remark is required')
        })
    });

    return (
        <React.Fragment>
            <Modal
                className="modal-sm detailsModal"
                isOpen={isRemakrOpen}
                wrapClassName="al_outerparentwp"
            >
                <div className="d-flex align-items-center justify-content-between p-4">
                    <h6 className="mb-0">
                        {remrkOpenModelObj?.user_status === getAdminUserStatus.HOLD
                            ? 'Hold Reason'
                            : 'Reject Reason'}
                    </h6>
                    <i
                        className="icon_alfred_close pointer"
                        title="Close"
                        onClick={handleClose}
                    ></i>
                </div>
                <ModalBody className="wflexLayout p-0">
                    <div className="wflexScroll px-4 mb-4">
                        <Formik
                            initialValues={{
                                reason: '',
                                remarks: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                setSubmitting(false);
                                handleSubmit(values);
                            }}
                        >
                            {({ setFieldValue, values, touched, errors, isSubmitting }) => (
                                <Form>
                                    <FormGroup>
                                        <Label>Reason</Label>
                                        <Field
                                            name="reason"
                                            component={({ field, form }) => (
                                                <Select
                                                    {...field}
                                                    options={reasonOptions}
                                                    className="inputSelect"
                                                    menuPortalTarget={document.body}
                                                    styles={{
                                                        menu: (styles) => ({
                                                            ...styles,
                                                            zIndex: '3',
                                                            boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
                                                            marginTop: 0
                                                        }),
                                                        menuList: (styles) => ({
                                                            ...styles,
                                                            maxHeight: '180px',
                                                            msOverflowStyle: 'auto',
                                                            wordBreak: 'break-word',
                                                            border: '1px solid #efefef',
                                                            borderRadius: '4px',
                                                            color: '#333333',
                                                            fontSize: '0.8em',
                                                            padding: 0,
                                                            margin: 0
                                                        }),
                                                        menuPortal: (styles) => ({
                                                            ...styles,
                                                            zIndex: 9999
                                                        })
                                                    }}
                                                    onChange={(option) => {
                                                        setFieldValue('reason', option.value);
                                                        setShowRemarks(option.value === 'other'); // Show textarea if "Others" is selected
                                                    }}
                                                    value={reasonOptions.find((option) => option.value === values.reason)}
                                                />
                                            )}
                                        />
                                        {touched.reason && errors.reason ? (
                                            <div className="text-danger">{errors.reason}</div>
                                        ) : null}
                                    </FormGroup>

                                    {showRemarks && (
                                        <FormGroup>
                                            <Label>Enter Remarks</Label>
                                            <Field
                                                as="textarea"
                                                name="remarks"
                                                className="form-control"
                                                placeholder="Enter remarks here..."
                                            />
                                            {touched.remarks && errors.remarks ? (
                                                <div className="text-danger">{errors.remarks}</div>
                                            ) : null}
                                        </FormGroup>
                                    )}

                                    <div className="mt-2">
                                        <button
                                            type="submit"
                                            className="al_button_add"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
});
