import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from 'react-redux';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import * as Yup from 'yup';
import { customContentValidation } from '../../_mock/coreHelperHA';
import { contactUsRequest } from '../../store/UtilityCallFunction/slice';

export default function ContactForm() {
  const dispatch = useDispatch();

  return (
    <div className="cs_contact_form cs_style_1 cs_white_bg cs_radius_30">
      <Formik
        initialValues={{
          name: "",
          user_email: "",
          subject: "",
          message: ""
        }}
        validationSchema={Yup.object().shape({
          name: customContentValidation('Full Name is required', { patternType: 'alphaspace', message: 'alphaspace' }, 50, 2),
          user_email: Yup.string()
            .trim()
            .max(50, "Maximum 50 characters are allowed")
            .email("Invalid email")
            .required("Email is required"),
          subject: Yup.string().required("Subject is required")
        })
        }
        onSubmit={(values, { resetForm }) => {
          console.log("submit=>", values)
          dispatch(contactUsRequest({ values, resetForm }))
        }}
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
                      name="name"
                      placeholder="David John"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component={"div"}
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" sm="12">
                  <FormGroup>
                    <Label><span className='requiredLabel'>*</span>Email</Label>
                    <Field
                      type="text"
                      name="user_email"
                      placeholder="example@gmail.com"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="user_email"
                      component={"div"}
                      className="text-danger"
                    />
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
                    <ErrorMessage
                      name="subject"
                      component={"div"}
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Message</Label>
                    <Field
                      name="message"
                      as="textarea"
                      type="text"
                      placeholder="Write something..."
                      className="form-control"
                    />
                    <ErrorMessage
                      name="message"
                      component={"div"}
                      className="text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <div className="cs_height_18" />
                  <button type='submit' className="cs_btn cs_style_1">
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
