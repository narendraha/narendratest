import React, { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Label, FormGroup } from "reactstrap";
import userImg from "../../../images/userprofile.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AxiosInstance } from "../../../_mock/utilities";
import { allowsOnlyNumeric, phoneNumberReg } from "../../../_mock/RegularExp";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import Loading from "../../InnerApp/LoadingComponent";

export default function Profile() {
  const [getProfileDetails, setGetProfileDetails] = useState([]);
  const [formData, setFormData] = useState();
  const [isShowconfirm, setIsShowconfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const profileDetails = async () => {
    setIsLoading(true);
    await AxiosInstance("application/json")
      .get("/userdetails")
      .then((res) => {
        const responseData = res.data?.data;

        if (responseData && responseData?.dob && responseData?.dob !== "NA") {
          // Transform the date format from "YYYY-MM-DD" to "MM/dd/yyyy"
          const formattedDate = new Date(responseData?.dob);
          const formattedDateString = formattedDate.toLocaleDateString(
            "en-US",
            {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }
          );
          responseData.dob = formattedDateString;
        }
        setGetProfileDetails(responseData);
        setIsLoading(false);
      })
      .catch((er) => console.log(er));
  };

  useEffect(() => {
    profileDetails();
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const genderoptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const residenceoptions = [
    { value: "Cohabitant", label: "Cohabitant" },
    { value: "Non-Resident", label: "Non-Resident" },
  ];

  const handleSubmit = (data) => {
    setIsShowconfirm(data);
    if (data) {
      setIsLoading(true);

      AxiosInstance("application/json")
        .put(`/update_details`, formData)
        .then((res) => {
          if (res && res.data && res.status == "200") {
            if (res.data?.statuscode === 200) {
              toast(res.data?.message, {
                position: "top-center",
                type: "success",
              });
              setIsEdit(false);
              profileDetails();
              setIsShowconfirm(!data);
              navigate("/profile");
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            } else {
              toast(res.data?.message, {
                position: "top-center",
                type: "error",
              });
              navigate("/profile");
            }
          }
        })
        .catch((er) => {
          console.log(er);
          toast(er?.response?.data?.message, {
            position: "top-center",
            type: "error",
          });
        });
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <ConfirmationAction newFun={handleSubmit} open={isShowconfirm} />
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-3">Profile</h3>
          <Row className="al_profile_manage">
            <Col xl="3" lg="3" sm="4">
              <div className={"al_profile_photo "}>
                <img src={userImg} alt="profilePhoto" />

                {isEdit && (
                  <>
                    <input
                      type="file"
                      id="uploadPicture"
                      name="uploadProfilePic"
                      onChange={(e) => {}}
                      hidden
                      accept=".jpg,.jpeg,.png"
                    />
                    <Label for="uploadPicture" onClick={() => setIsEdit(true)}>
                      <div className="al_profile-edit-icon">
                        <i className="icon_alfred_edit"></i>
                      </div>
                    </Label>
                  </>
                )}
              </div>
            </Col>
            <Col xl="7" lg="8" md="8" sm="8" className="px-5">
              {!isEdit && (
                <>
                  <h2 className="cs_semibold mb-1">
                    {getProfileDetails?.username}
                  </h2>
                  <h6 className="al_profile_role mb-2">
                    {getProfileDetails?.email}
                  </h6>
                  <div className="al_pointsearned mb-4">Points Earned: 89</div>
                  <Row>
                    <Col>
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.plan || "NA"}</div>
                        <Label>Your Subscription Plan</Label>
                      </div>
                    </Col>
                    <div className="px-3 w-auto">
                      <button type="button" className="al_upgrade_btn al_basic">
                        Upgrade Plan
                      </button>
                    </div>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.height || "NA"}</div>
                        <Label>Height</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.weight || "NA"}</div>
                        <Label>Weight</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.bloodtype || "NA"}</div>
                        <Label>Blood Type</Label>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.rtype || "NA"}</div>
                        <Label>Residence Type</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.education || "NA"}</div>
                        <Label>Education</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.dob || "NA"}</div>
                        <Label>Date of Birth</Label>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.age || "NA"}</div>
                        <Label>Age</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.gender || "NA"}</div>
                        <Label>Gender</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.ssn || "NA"}</div>
                        <Label>SSN</Label>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.mobile || "NA"}</div>
                        <Label>Mobile</Label>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="al_profiledata">
                        <div>{getProfileDetails?.nationality || "NA"}</div>
                        <Label>Nationality</Label>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <h6>KYC Information</h6>
                  <div className="al_profiledata">
                    <Label>PIV ID</Label>
                    <div className="d-flex wrap my-2">
                      <div className="d-flex align-items-center">
                        <i
                          className="icon_alfred_image me-2"
                          style={{ fontSize: "16px", color: "#939BA7" }}
                        ></i>
                        <span style={{ color: "#939BA7" }}>
                          PIV-idfrontside.jpg
                        </span>
                      </div>
                      <a href="#">View</a>
                    </div>

                    <div className="d-flex wrap my-2">
                      <div className="d-flex align-items-center">
                        <i
                          className="icon_alfred_image me-2"
                          style={{ fontSize: "16px", color: "#939BA7" }}
                        ></i>
                        <span style={{ color: "#939BA7" }}>
                          PIV-idbackside.jpg
                        </span>
                      </div>
                      <a href="#">View</a>
                    </div>
                  </div>
                  <hr />
                  <Row>
                    <Col md="6" sm="12">
                      <div className="al_profiledata">
                        <div>
                          {getProfileDetails?.insurance_provider || "NA"}
                        </div>
                        <Label>Name of Insurance Provider</Label>
                      </div>
                    </Col>
                    <Col md="6" sm="12">
                      <div className="al_profiledata">
                        <div>
                          {getProfileDetails?.insurance_policy_no || "NA"}
                        </div>
                        <Label>Insurance Policy / Card Number</Label>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <div className="al_profilebtns">
                    <button type="button" className="mb-3">
                      <i className="icon_alfred_password"></i>Change Password
                    </button>
                    <button type="button" className="mb-3">
                      <i className="icon_alfred_bankcard"></i>Bank Card
                    </button>
                    <button type="button" className="mb-3">
                      <i className="icon_alfred_menu_settings"></i>Settings
                    </button>
                  </div>
                </>
              )}
              {isEdit && (
                <>
                  <Formik
                    initialValues={{
                      username: getProfileDetails?.username || "",
                      email: getProfileDetails?.email || "",
                      dob:
                        getProfileDetails?.dob == "NA"
                          ? new Date()
                          : getProfileDetails?.dob,
                      gender: getProfileDetails?.gender || "",
                      mobile: getProfileDetails?.mobile || "",
                      rtype: getProfileDetails?.rtype || "",
                      education: getProfileDetails?.education || "",
                      ssn: getProfileDetails?.ssn || "",
                      height: getProfileDetails?.height || "",
                      weight: getProfileDetails?.weight || "",
                      age: getProfileDetails?.age || "",
                      bloodtype: getProfileDetails?.bloodtype || "",
                    }}
                    validationSchema={Yup.object().shape({
                      username: Yup.string()
                        .min(2, "Too Short!")
                        .max(50, "Too Long!")
                        .required("This field is required"),
                      email: Yup.string()
                        .email("Invalid email")
                        .required("This field is required"),
                      mobile: Yup.string()
                        .matches(phoneNumberReg, "Invalid phone number")
                        .required("This field is required"),
                      dob: Yup.string().required("This field is required"),
                      gender: Yup.string().required("This field is required"),
                      bloodtype: Yup.string().required(
                        "This field is required"
                      ),
                      rtype: Yup.string().required("This field is required"),
                      education: Yup.string().required(
                        "This field is required"
                      ),
                      ssn: Yup.string()
                        .min(2, "Too Short!")
                        .max(50, "Too Long!")
                        .required("This field is required"),
                      height: Yup.string()
                        .min(1, "Too Short!")
                        .max(3, "Too Long!")
                        .required("This field is required"),
                      weight: Yup.string()
                        .min(1, "Too Short!")
                        .max(3, "Too Long!")
                        .required("This field is required"),
                      age: Yup.string()
                        .min(1, "Too Short!")
                        .max(3, "Too Long!")
                        .required("This field is required"),
                    })}
                    onSubmit={(values) => {
                      // Handle form submission here
                      setIsShowconfirm(true);
                      let data = {
                        ...values,
                        dob: moment(values.dob).format("YYYY-MM-DD"),
                      };
                      setFormData(data);
                    }}
                  >
                    {({
                      values,
                      setFieldValue,
                      errors,
                      touched,
                      setFieldTouched,
                    }) => {
                      return (
                        <Form>
                          <Row>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Height</Label>
                                <Field
                                  type="text"
                                  name="height"
                                  placeholder="Enter Height"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="height"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Weight</Label>
                                <Field
                                  type="text"
                                  name="weight"
                                  placeholder="Enter Weight"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="weight"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Blood Type</Label>
                                <Field
                                  type="text"
                                  name="bloodtype"
                                  placeholder="Enter Blood Type"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="bloodtype"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>

                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Full Name</Label>
                                <Field
                                  type="text"
                                  name="username"
                                  placeholder="Enter Name"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="username"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Age</Label>
                                <Field
                                  type="text"
                                  name="age"
                                  placeholder="Enter Age"
                                  className="form-control"
                                  onKeyPress={(e) => allowsOnlyNumeric(e)}
                                />
                                <ErrorMessage
                                  name="age"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Gender</Label>
                                <Select
                                  options={genderoptions}
                                  name="gender"
                                  value={genderoptions?.find(
                                    (option) => option.value === values?.gender
                                  )}
                                  onChange={(selectedOption) =>
                                    setFieldValue(
                                      "gender",
                                      selectedOption?.value
                                    )
                                  }
                                  onBlur={() => setFieldTouched("gender", true)}
                                  className="inputSelect"
                                />
                                <ErrorMessage
                                  name="gender"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Date of Birth</Label>
                                <DatePicker
                                  className="form-control al_calendarIcon"
                                  name="dob"
                                  placeholderText="Select DOB"
                                  popperPlacement="auto"
                                  popperModifiers={{
                                    flip: {
                                      behavior: ["bottom"],
                                    },
                                    preventOverflow: {
                                      enabled: false,
                                    },
                                  }}
                                  selected={
                                    values?.dob
                                      ? new Date(values?.dob)
                                      : values?.dob == "NA"
                                      ? new Date()
                                      : new Date()
                                  }
                                  onChange={(e) => {
                                    setFieldValue("dob", e);
                                  }}
                                  dateFormat={"MM/dd/yyyy"}
                                  maxDate={new Date()}
                                  onBlur={() => setFieldTouched("dob", true)}
                                  autoComplete="off"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                />
                                <ErrorMessage
                                  name="dob"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Mobile</Label>
                                <Field
                                  type="text"
                                  name="mobile"
                                  placeholder="Enter Mobile"
                                  className="form-control"
                                  onKeyPress={(e) => allowsOnlyNumeric(e)}
                                />
                                <ErrorMessage
                                  name="mobile"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>SSN</Label>
                                <Field
                                  type="password"
                                  name="ssn"
                                  placeholder="Enter SSN"
                                  className="form-control"
                                  onKeyPress={(e) => allowsOnlyNumeric(e)}
                                />
                                <ErrorMessage
                                  name="ssn"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Resident Type</Label>
                                <Select
                                  className="inputSelect"
                                  options={residenceoptions}
                                  name="rtype"
                                  value={residenceoptions?.find(
                                    (option) => option.value === values?.rtype
                                  )}
                                  onChange={(selectedOption) =>
                                    setFieldValue(
                                      "rtype",
                                      selectedOption?.value
                                    )
                                  }
                                  onBlur={() => setFieldTouched("rtype", true)}
                                />
                                <ErrorMessage
                                  name="rtype"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Education</Label>
                                <Field
                                  type="text"
                                  name="education"
                                  placeholder="Enter Education"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="education"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4" sm="12">
                              <FormGroup>
                                <Label><span className='requiredLabel'>*</span>Email</Label>
                                <Field
                                  type="text"
                                  name="email"
                                  placeholder="Enter Email"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="email"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6" sm="12">
                              <FormGroup>
                                <Label>Name of Insurance Provider</Label>
                                <Field
                                  type="text"
                                  name="insurance_provider"
                                  placeholder="Enter Name of Insurance Provider"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="insurance_provider"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6" sm="12">
                              <FormGroup>
                                <Label>Insurance Policy / Card Number</Label>
                                <Field
                                  type="text"
                                  name="insurance_policy_no"
                                  placeholder="Enter Insurance Policy / Card Number"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="insurance_policy_no"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <div className="mt-3">
                            <button type="submit" className="al_savebtn">
                              Save
                            </button>
                            <button
                              type="button"
                              className="al_cancelbgbutton mx-3"
                              onClick={() => setIsEdit(!isEdit)}
                            >
                              Cancel
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </>
              )}
              {!isEdit && (
                <div className="mt-3">
                  <button
                    type="submit"
                    className="al_savebtn"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
