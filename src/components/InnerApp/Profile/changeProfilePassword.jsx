import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { AxiosInstance } from "../../../_mock/utilities";
import { passwordReg } from "../../../_mock/RegularExp";

export const ChangeProfilePassword = ({ props }) => {

    const [isOpenModel, setOpenModel] = useState(true);

    const handleSubmit = (formData) => {
        let reqObj = {
            old_password: formData?.currentPassword,
            new_password: formData?.newPassword
        }
        AxiosInstance("application/json")
            .put(`/update_details`, reqObj)
            .then((res) => {
                if (res && res.data && res.status === 200) {
                    setOpenModel(false)
                    props(isOpenModel)
                    if (res.data?.statuscode === 200) {
                        toast(res.data?.message, {
                            position: "top-right",
                            type: "success",
                        });
                    } else {
                        toast(res.data?.message, {
                            position: "top-right",
                            type: "error",
                        });
                    }
                }
            })
            .catch((er) => {
                toast(er?.response?.data?.message, {
                    position: "top-right",
                    type: "error",
                });
            });
    }

    const handleClose = () => {
        setOpenModel(false)
        props(isOpenModel)
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                }}
                validationSchema={Yup.object().shape({
                    currentPassword: Yup.string().required("Current Password is required"),
                    newPassword: Yup.string()
                        .matches(passwordReg, "Please enter a valid password")
                        .required("New Password is required"),
                    confirmPassword: Yup.string().when("newPassword", {
                        is: val => (val && val.length > 0 ? true : false),
                        then: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("newPassword")], 'Password must match')
                    })
                }
                )}
                onSubmit={(values) => {
                    console.log("submit=>", values)
                    handleSubmit(values)
                }}
            >{({ values }) => (
                <div style={{ padding: "10px" }}>
                    <Form>
                        <Row>
                            <Col md="4" sm="12">
                                <FormGroup>
                                    <Label>
                                        <span className="requiredLabel">*</span>
                                        Current Password
                                    </Label>
                                    <Field name="currentPassword" type="password" className="form-control" />
                                    <ErrorMessage name="currentPassword" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" sm="12">
                                <FormGroup>
                                    <Label>
                                        <span className="requiredLabel">*</span>
                                        New Password
                                    </Label>
                                    <Field name="newPassword" type="password" className="form-control" />
                                    <ErrorMessage name="newPassword" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4" sm="12">
                                <FormGroup>
                                    <Label>
                                        <span className="requiredLabel">*</span>
                                        Confirm Password
                                    </Label>
                                    <Field name="confirmPassword" type="password" className="form-control" />
                                    <ErrorMessage name="confirmPassword" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <button type="submit" className="al_savebtn">
                                Update
                            </button>
                            <button type="submit" className="al_savebtn" onClick={handleClose}>
                                Cancel
                            </button>
                        </div>
                    </Form>
                </div>
            )}
            </Formik>
        </React.Fragment >
    )
}