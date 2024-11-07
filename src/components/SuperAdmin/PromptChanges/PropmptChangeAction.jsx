import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormGroup, Label } from 'reactstrap';

export const PromptChangesAction = React.memo(() => {
    return (
        <React.Fragment>
            <div className="wflexScroll d-flex flex-column align-items-start al-pad">
                <div className='d-flex w-100'>
                    <Formik
                        initialValues={{
                            promptText: ""
                        }}
                        onSubmit={(values) => {
                            console.log("Submit=>", values)
                        }}
                    >{({ values }) => (
                        <>
                            {/* // add design for this form tag also  */}
                            <Form className="w-100">
                                <div className="d-flex flex-grow-1 align-items-center gap-4 ">
                                    <FormGroup className='flex-grow-1'>
                                        <Label><span className='requiredLabel'>*</span>Prompt1</Label>
                                        <Field
                                            as='textarea'
                                            rows={3}
                                            name="prompt"
                                            placeholder="Enter Prompt"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="prompt"
                                            component={"div"}
                                            className="text-danger"
                                        />
                                    </FormGroup>
                                    <div className='al_actions d-flex flex-column gap-3 mt-3'>
                                        {/* <span><i className='icon_alfred_edit'></i></span> */}
                                        <span><i className='icon_alfred_save'></i></span>
                                        <span><i className='icon_alfred_clear'></i></span>
                                        <span><i className='icon_alfred_close'></i></span>
                                    </div>
                                </div>
                            </Form>
                        </>
                    )}
                    </Formik>
                </div>
            </div>
        </React.Fragment>
    )
});