import React from 'react';
import { Field, Form, Formik } from "formik";
import { Col, FormGroup, Label, Row } from 'reactstrap';

export default function ContactForm() {
  return (
    <div className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30">
      <Formik
        initialValues={{}}
        // validationSchema={() => { }}
        onSubmit={() => { }}
      >
        {() => {
          return (
            <Form>
              <Row>
                <Col lg="6" sm="12">
                  <FormGroup>
                    <Label><span className='requiredLabel'>*</span>Name</Label>
                    <Field
                      type="text"
                      name="username"
                      placeholder="David John"
                      className="form-control"
                    />
                    {/* <ErrorMessage
                      name="username"
                      component={"div"}
                      className="text-danger"
                    /> */}
                  </FormGroup>
                </Col>
                <Col lg="6" sm="12">
                  <FormGroup>
                    <Label><span className='requiredLabel'>*</span>Email</Label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="example@gmail.com"
                      className="form-control"
                    />
                    {/* <ErrorMessage
                      name="email"
                      component={"div"}
                      className="text-danger"
                    /> */}
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label><span className='requiredLabel'>*</span>Subject</Label>
                    <Field
                      type="text"
                      name="subject"
                      placeholder="Your subject"
                      className="form-control"
                    />
                    {/* <ErrorMessage
                      name="subject"
                      component={"div"}
                      className="text-danger"
                    /> */}
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Message</Label>
                    <textarea
                      type="text"
                      name="message"
                      placeholder="Write something..."
                      className="form-control"
                    />
                    {/* <ErrorMessage
                      name="message"
                      component={"div"}
                      className="text-danger"
                    /> */}
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <div className="cs_height_18" />
                  <button className="cs_btn cs_style_1">
                    <span>Submit</span>
                    <i>
                      <img src="/images/icons/arrow_white.svg" alt="Icon" />
                      <img src="/images/icons/arrow_white.svg" alt="Icon" />
                    </i>
                  </button>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </div>
  );
}
