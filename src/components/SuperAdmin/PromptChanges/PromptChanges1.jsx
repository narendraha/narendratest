import React from 'react';
import Select from "react-select";
import { FormGroup, Label } from 'reactstrap';
import { Form, Formik, Field, ErrorMessage } from "formik";

export default function PromptChanges() {
    const botoptions = [
        { value: "History", label: "History" },
        { value: "Behavior", label: "Behavior" },
        { value: "Education", label: "Education" },
    ];

    return (
        <Formik
            initialValues={{}}
            validationSchema={() => { }}
            onSubmit={() => { }}
        >
            {() => {
                return (
                    <Form className='h-100'>
                        <div className="wflexLayout">
                            <div className="d-flex flex-wrap justify-content-between align-items-center al-pad pb-1 gap-2">
                                <div class="d-flex flex-grow-1 align-items-center">
                                    <h3 class="bc_main_text mb-0 me-4">Prompt's list</h3>
                                    <Select
                                        className="inputSelect w-20"
                                        options={botoptions}
                                        name="bottype"
                                        onChange={() => { }}
                                    />
                                </div>
                                <div class="w-auto">
                                    <div class="al_searchleft px-0">
                                        <input type="text" class="form-control" placeholder="Search" />
                                        <i class="icon_alfred_search"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="wflexScroll d-flex flex-column align-items-start al-pad">
                                <div className='d-flex align-items-center gap-3 w-100'>
                                    <FormGroup className='flex-grow-1'>
                                        <Label><span className='requiredLabel'>*</span>Prompt1</Label>
                                        <Field
                                            as='textarea'
                                            rows={3}
                                            name="comments"
                                            placeholder="Enter Comments"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="comments"
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
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}