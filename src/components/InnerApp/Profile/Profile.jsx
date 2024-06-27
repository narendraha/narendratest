import React, { Suspense, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import Select from "react-select";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Row, UncontrolledTooltip } from "reactstrap";
import * as Yup from "yup";
import { allowsOnlyNumeric, allowsOnlyNumericOnly2Digit, allowsOnlyNumericOnly4Digit, allowsOnlyNumericOnlysingleDigit, phoneNumberReg } from "../../../_mock/RegularExp";
import { AxiosInstance } from "../../../_mock/utilities";
import maleuserImg from "../../../images/userprofile.jpg";
import femaleuserImg from "../../../images/femaleuserImg.jpg";
import Loading from "../../InnerApp/LoadingComponent";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import { createResource } from "../createResource"; //Suspense loading
import { ProfileSettings } from "./ProfileSettings";
import { BankDetails } from "./bankDetails";
import { ChangeProfilePassword } from "./changeProfilePassword";
import { getGenderoptions, getResidenceoptions, getEductaionOptions } from '../../../_mock/helperIndex';

export const EProfileButton = {
  CHANGEPASSWORD: 1,
  BANKDETAILS: 2,
  SETTINGS: 3
}

export default function Profile() {
  const [getProfileDetails, setGetProfileDetails] = useState([]);
  const [formData, setFormData] = useState();
  const [isShowconfirm, setIsShowconfirm] = useState(false);
  const [resource, setResource] = useState(null); //Suspense loading
  const [isOpenModel, setOpenModel] = useState({ profileButton: 0, isOpen: false }); // To handle Modals
  const [updatedFile, setUpdatedFile] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loading status of api call

  const closeProfileButtonModal = (data) => {
    setOpenModel({ profileButton: 0, isOpen: data })
  }

  const navigate = useNavigate();
  const profileDetails = async () => {
    await AxiosInstance("application/json")
      .get("/userdetails")
      .then((res) => {
        const responseData = res.data?.data;
        setGetProfileDetails(responseData);
      })
      .catch((er) => { });
  };

  useEffect(() => {
    setResource(createResource(profileDetails())); //Suspense loading with actual component
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const genderoptions = getGenderoptions;
  const residenceoptions = getResidenceoptions;
  const educationOptions = getEductaionOptions;

  const bloodTypes = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "A Unknown", label: "A Unknown" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "B Unknown", label: "B Unknown" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "AB Unknown", label: "AB Unknown" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "O Unknown", label: "O Unknown" },
    { value: "Unknown", label: "Unknown" },
  ];
  function maskssn(input) {
    if (input !== "NA" && input !== undefined && input?.length < 2) {
      return input;
    }
    const lastTwoChars = input?.slice(-3);
    const maskedPart = "*".repeat(input?.length - 3);
    return `${maskedPart}${lastTwoChars}`;
  }

  const reLoadWindow = () => {
    let isWinowLoaded = false
    window.location.reload()
    return isWinowLoaded = true
  }
  const handleSubmit = (data) => {
    setIsShowconfirm(!data);
    if (data) {
      setIsLoading(true)
      const uploadProfileImageRequest = AxiosInstance("multipart/form-data").post("/upload-profile-image", updatedFile?.formData);
      const updateProfileDatialsRequest = AxiosInstance("application/json").put("/update_details", formData);
      let requestMethods = [updateProfileDatialsRequest]
      if (updatedFile?.formData)
        requestMethods?.push(uploadProfileImageRequest)
      Promise.all(requestMethods)
        .then((requestMethods) => {
          let updateProfileDatialsResponse = requestMethods?.[0];
          let uploadProfileImageResponse = requestMethods?.length > 1 ? requestMethods?.[1] : false;
          let isProfileImageUpdate = !uploadProfileImageResponse ? true : reLoadWindow()?.isWinowLoaded;
          if (isProfileImageUpdate) {
            setIsLoading(false)
            if (!uploadProfileImageResponse || uploadProfileImageResponse.data && uploadProfileImageResponse.status === 200 && uploadProfileImageResponse.data.statuscode === 200) {
              if (updateProfileDatialsResponse && updateProfileDatialsResponse.data && updateProfileDatialsResponse.status === 200) {
                if (updateProfileDatialsResponse.data?.statuscode === 200) {
                  toast(updateProfileDatialsResponse.data?.message, {
                    position: "top-right",
                    type: "success",
                  });
                  setIsEdit(false);
                  if (!uploadProfileImageResponse)
                    profileDetails();
                  navigate("/profile");
                } else {
                  toast(updateProfileDatialsResponse.data?.message, {
                    position: "top-right",
                    type: "error",
                  });
                  navigate("/profile");
                }
              } else {
                toast(updateProfileDatialsResponse.data?.message, {
                  position: "top-right",
                  type: "error",
                });
                navigate("/profile");
              }
            } else {
              toast(uploadProfileImageResponse.data.message, {
                position: "top-right",
                type: "error",
              });
            }
          }
        })
        .catch((er) => {
          toast(er?.response?.data?.detail, {
            position: "top-right",
            type: "error",
          });
        });
    }
  };

  const openModelHandle = (activeProfileButton) => {
    setOpenModel({ profileButton: activeProfileButton, isOpen: true })
  }


  const getFileSizeInMb = (fileSize = 0) => (fileSize ? fileSize / 1024 / 1024 : 0);

  const onFileUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let isValidFileSize = getFileSizeInMb(file.size) <= 200;
      let isValidFileExtention = ['jpg', 'jpeg', 'png']?.includes(file?.name?.split(".")?.pop()?.toLowerCase())

      if (isValidFileSize && isValidFileExtention) {
        const formData = new FormData();
        formData.append('file_', file);
        setUpdatedFile({ file: URL.createObjectURL(file), formData })
      } else {
        toast(!isValidFileSize ? "Please Select file less than 200 MB" : "Please Upload Valid file type", {
          position: "top-right",
          type: "error",
        });
      }
    }
  }


  const profilePicture = updatedFile === "" ? ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : getProfileDetails?.profile_url) : updatedFile;

  // Suspense loading with fallback icon
  if (resource) {
    return (
      <Suspense fallback={<Loading />}>
        <ResourceLoader resource={resource} />
      </Suspense>
    );
  }
  function ResourceLoader({ resource }) {
    resource.read(); // This will throw a promise that Suspense will catch
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
                  <img src={profilePicture} alt="profilePhoto" />
                </div>
                {isEdit && (
                  <>
                    <div className="al_note"><span className="text-warning fw-medium">*Note: </span>Only jpeg, jpg, and png image formats are allowed</div>

                    <div className="d-flex justify-content-center mt-3">
                      <input
                        type="file"
                        id="uploadPicture"
                        name="uploadProfilePic"
                        onChange={(e) => onFileUpload(e)}
                        hidden
                        accept=".jpg,.jpeg,.png"
                      />
                      <Label
                        for="uploadPicture"
                        onClick={() => setIsEdit(true)}
                      >
                        <div className="al_profile-edit-icon">
                          <i className="icon_alfred_edit"></i>
                        </div>
                      </Label>
                      {updatedFile && <div className="al_profile-edit-icon ms-3" onClick={() => setUpdatedFile("")}>
                        <i className="icon_alfred_trashbin"></i>
                      </div>}
                    </div>
                  </>
                )}
              </Col>
              <Col xl="7" lg="8" md="8" sm="8" className="px-5">
                {!isEdit && (
                  <>
                    <h2 className="cs_semibold mb-1 text-capitalize">
                      {getProfileDetails?.username}
                    </h2>
                    <h6 className="al_profile_role mb-2">
                      {getProfileDetails?.email}
                    </h6>
                    <div className="al_pointsearned mb-4">
                      Points Earned: 89
                    </div>
                    <Row>
                      <Col>
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.subscription === "NA" ? "No Plan is Available" : "N/A"}</div>
                          <Label>Your Subscription Plan</Label>
                        </div>
                      </Col>
                      <div className="px-3 w-auto">
                        <button
                          type="button"
                          className="al_upgrade_btn al_basic"
                          disabled={true}
                        >
                          Upgrade Plan
                          <i className="ps-1 icon_alfred_password"></i>
                        </button>
                      </div>
                    </Row>
                    <hr />
                    <Row>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.feet > 0 ? `${getProfileDetails?.feet}.${getProfileDetails?.inch !== "NA" ? getProfileDetails?.inch : "00"}` : "N/A"}</div>
                          <Label>Height (ft)</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.weight || "N/A"}</div>
                          <Label>Weight (lbs)</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.bloodtype || "N/A"}</div>
                          <Label>Blood Type</Label>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.rtype || "N/A"}</div>
                          <Label>Residence Type</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.education || "N/A"}</div>
                          <Label>Highest Education</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.dob || "N/A"}</div>
                          <Label>Date of Birth</Label>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.age || "N/A"}</div>
                          <Label>Age</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.gender || "N/A"}</div>
                          <Label>Gender</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.ssn !== "NA" && getProfileDetails?.ssn !== undefined ? maskssn(getProfileDetails?.ssn) : "N/A"}</div>
                          <Label>SSN</Label>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.mobile || "N/A"}</div>
                          <Label>Mobile</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.nationality === "NA" ? "United State" : getProfileDetails?.nationality}</div>
                          <Label>Nationality</Label>
                        </div>
                      </Col>
                      <Col md="4" sm="12">
                        <div className="al_profiledata">
                          <div>{getProfileDetails?.bmi || "N/A"}</div>
                          <Label>BMI<i className="icon_alfred_info ms-2" style={{ verticalAlign: "middle" }} id="bmiinfo"></i></Label>
                          <UncontrolledTooltip
                            placementPrefix="al_bs_tooltip"
                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                            placement='bottom' target="bmiinfo">
                            BMI will be updated automatically when height and weight are changed
                          </UncontrolledTooltip>
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
                        <a href="/#" className="text-grey" style={{ pointerEvents: "none" }}>View<i className="ps-1 icon_alfred_password"></i></a>
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
                        <a href="/#" className="text-grey" style={{ pointerEvents: "none" }}>View<i className="ps-1 icon_alfred_password"></i></a>
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col md="6" sm="12">
                        <div className="al_profiledata">
                          <div>
                            {getProfileDetails?.insurance_provider || "N/A"}
                          </div>
                          <Label>Name of Insurance Provider</Label>
                        </div>
                      </Col>
                      <Col md="6" sm="12">
                        <div className="al_profiledata">
                          <div>
                            {getProfileDetails?.insurance_policy_no || "N/A"}
                          </div>
                          <Label>Insurance Policy / Card Number</Label>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <div className="al_profilebtns">
                      <button type="button" className="mb-3" onClick={() => openModelHandle(EProfileButton.CHANGEPASSWORD)}>
                        <i className="icon_alfred_password"></i>Change Password
                      </button>
                      <button type="button" className="mb-3" onClick={() => openModelHandle(EProfileButton.BANKDETAILS)}>
                        <i className="icon_alfred_bankcard"></i>Bank Card
                      </button>
                      <button type="button" className="mb-3" onClick={() => openModelHandle(EProfileButton.SETTINGS)}>
                        <i className="icon_alfred_menu_settings"></i>Settings
                      </button>
                    </div>
                  </>
                )}
                {isEdit && (
                  <>
                    <Formik
                      enableReinitialize
                      initialValues={{
                        username: getProfileDetails?.username !== "NA" ? getProfileDetails?.username : "",
                        email: getProfileDetails?.email !== "NA" ? getProfileDetails?.email : "",
                        dob:
                          getProfileDetails?.dob !== "NA"
                            ? getProfileDetails?.dob
                            : new Date(),
                        // gender: getProfileDetails?.gender !== "NA" ? getProfileDetails?.gender : "",
                        gender: getProfileDetails?.gender !== "NA" ? getProfileDetails?.gender : "",
                        mobile: getProfileDetails?.mobile !== "NA" ? getProfileDetails?.mobile : "",
                        rtype: getProfileDetails?.rtype !== "NA" ? getProfileDetails?.rtype : "",
                        education: getProfileDetails?.education !== "NA" ? getProfileDetails?.education : "",
                        ssn: getProfileDetails?.ssn !== "NA" ? getProfileDetails?.ssn : "",
                        feet: getProfileDetails?.feet !== "NA" ? getProfileDetails?.feet : '',
                        inch: getProfileDetails?.inch !== "NA" ? getProfileDetails?.inch : '',
                        weight: getProfileDetails?.weight !== "NA" ? getProfileDetails?.weight : "",
                        // age: getProfileDetails?.age || "",
                        bloodtype: getProfileDetails?.bloodtype !== "NA" ? getProfileDetails?.bloodtype : "",
                        nationality: getProfileDetails?.nationality !== "NA" ? getProfileDetails?.nationality : "",
                        profile_url: profilePicture || ""
                      }}
                      validationSchema={Yup.object().shape({
                        username: Yup.string()
                          .min(2, "Too Short!")
                          .max(50, "Too Long!")
                          .required("This field is required"),
                        // email: Yup.string()
                        //   .email("Invalid email")
                        //   .required("This field is required"),
                        mobile: Yup.string()
                          .matches(phoneNumberReg, "Invalid phone number")
                          .required("This field is required"),
                        dob: Yup.date()
                          .max(
                            new Date(Date.now() - 567648000000),
                            "You must be at least 18 years old"
                          )
                          .min(
                            new Date(
                              Date.now() - 120 * 365.25 * 24 * 60 * 60 * 1000
                            ),
                            "You must be below 120 years old"
                          )
                          .required("Required"),
                        gender: Yup.string().required("This field is required"),
                        bloodtype: Yup.string().required(
                          "This field is required"
                        ),
                        rtype: Yup.string().required("This field is required"),
                        education: Yup.string().required(
                          "This field is required"
                        ),
                        // ssn: Yup.string()
                        //   .min(2, "Too Short!")
                        //   .max(50, "Too Long!")
                        //   .required("This field is required"),
                        feet: Yup.string()
                          .test(
                            'is-greater-than-one',
                            'Height must be greater than 1',
                            value => value && parseFloat(value) >= 1
                          )
                          .min(1, "Too Short!") // Minimum length of 1 character
                          .max(3, "Too Long!")  // Maximum length of 3 characters
                          .required("This field is required"),
                        weight: Yup.number()
                          .min(22, "Weight must be at least 22 lbs")
                          .max(1400, "Weight is too high!")
                          .required("This field is required"),
                        // age: Yup.string()
                        //   .min(1, "Too Short!")
                        //   .max(3, "Too Long!")
                        //   .required("This field is required"),
                      })}
                      onSubmit={(values) => {
                        // Handle form submission here
                        setIsShowconfirm(true);
                        let data = {
                          ...values,
                          dob: moment(values.dob).format("YYYY-MM-DD"),
                          nationality: "United State"
                        };
                        setFormData(data);
                        setGetProfileDetails(data);
                        updatedFile("")
                      }}
                    >
                      {({
                        values,
                        setFieldValue,
                        errors,
                        touched,
                        setFieldTouched,
                        dirty
                      }) => {
                        return (
                          <Form>
                            <Row>
                              <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Height (ft)
                                  </Label>
                                  <div className="d-flex gap-2">
                                    <div>
                                      <Field
                                        type="text"
                                        name="feet"
                                        placeholder="Feet"
                                        className="form-control"
                                        onKeyPress={(e) =>
                                          allowsOnlyNumericOnlysingleDigit(e)
                                        }
                                      />
                                      <ErrorMessage
                                        name="feet"
                                        component={"div"}
                                        className="text-danger"
                                      />
                                    </div>
                                    <div className="mt-2"></div>
                                    <div>
                                      <Field
                                        type="text"
                                        name="inch"
                                        placeholder="Inch"
                                        className="form-control"
                                        onKeyPress={(e) =>
                                          allowsOnlyNumericOnly2Digit(e)
                                        }
                                      />
                                      <ErrorMessage
                                        name="inch"
                                        component={"div"}
                                        className="text-danger"
                                      />
                                    </div>
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Weight (lbs)
                                  </Label>
                                  <Field
                                    type="text"
                                    name="weight"
                                    placeholder="Enter Weight"
                                    className="form-control"
                                    onKeyPress={(e) =>
                                      allowsOnlyNumericOnly4Digit(e)
                                    }
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
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Blood Type
                                  </Label>
                                  <Select
                                    className="inputSelect"
                                    options={bloodTypes}
                                    name="bloodtype"
                                    value={bloodTypes?.find(
                                      (option) =>
                                        option.value === values?.bloodtype
                                    )}
                                    onChange={(selectedOption) =>
                                      setFieldValue(
                                        "bloodtype",
                                        selectedOption?.value
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("bloodtype", true)
                                    }
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
                                  <Label>
                                    <span className="requiredLabel">*</span>Full
                                    Name
                                  </Label>
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
                              {/* <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>Age
                                  </Label>
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
                              </Col> */}
                              <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Gender
                                  </Label>
                                  <Select
                                    options={genderoptions}
                                    name="gender"
                                    value={genderoptions?.find(
                                      (option) =>
                                        option.value === values?.gender
                                    )}
                                    onChange={(selectedOption) =>
                                      setFieldValue(
                                        "gender",
                                        selectedOption?.value
                                      )
                                    }
                                    onBlur={() =>
                                      setFieldTouched("gender", true)
                                    }
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
                                  <Label>
                                    <span className="requiredLabel">*</span>Date
                                    of Birth
                                  </Label>
                                  <DatePicker
                                    className="form-control al_calendarIcon"
                                    name="dob"
                                    placeholderText="Select DOB"
                                    popperPlacement="auto"
                                    popperModifiers={[{
                                      flip: {
                                        behavior: ["bottom"],
                                      },
                                      preventOverflow: {
                                        enabled: false,
                                      },
                                    }]}
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
                                    dateFormat={"yyyy/MM/dd"}
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
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Mobile
                                  </Label>
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        +1
                                      </span>
                                    </div>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      name="mobile"
                                      placeholder="Enter Mobile Number"
                                      onKeyPress={(e) => allowsOnlyNumeric(e)}
                                      aria-describedby="basic-addon1"
                                    />
                                  </div>
                                  <ErrorMessage
                                    name="mobile"
                                    component={"div"}
                                    className="text-danger"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    SSN
                                  </Label>
                                  <Field
                                    type="text"
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
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Resident Type
                                  </Label>
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
                                    onBlur={() =>
                                      setFieldTouched("rtype", true)
                                    }
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
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Highest Education
                                  </Label>
                                  {/* <Field
                                    type="text"
                                    name="education"
                                    placeholder="Enter Education"
                                    className="form-control"
                                  /> */}
                                  <Select
                                    options={educationOptions}
                                    name="education"
                                    className="inputSelect"
                                    value={educationOptions.find(
                                      (option) => option.value === values.education
                                    )}
                                    onChange={(selectedOption) => {
                                      setFieldValue(
                                        "education",
                                        selectedOption ? selectedOption.value : ""
                                      );
                                    }}
                                  />
                                  <ErrorMessage
                                    name="education"
                                    component={"div"}
                                    className="text-danger"
                                  />
                                </FormGroup>
                              </Col>
                              {/* <Col md="4" sm="12">
                                <FormGroup>
                                  <Label>
                                    <span className="requiredLabel">*</span>
                                    Email
                                  </Label>
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
                              </Col> */}
                              <Col md="8" sm="12">
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
                              <button type="submit" disabled={!dirty && !updatedFile} className="al_savebtn">
                                Save
                              </button>
                              <button
                                type="button"
                                className="al_cancelbgbutton mx-3"
                                onClick={() => {
                                  setIsEdit(!isEdit)
                                  setUpdatedFile("")
                                }}
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

        {isOpenModel.profileButton === EProfileButton.CHANGEPASSWORD && isOpenModel.isOpen && <ChangeProfilePassword props={closeProfileButtonModal} />}
        {isOpenModel.profileButton === EProfileButton.BANKDETAILS && isOpenModel.isOpen && <BankDetails props={closeProfileButtonModal} />}
        {isOpenModel.profileButton === EProfileButton.SETTINGS && isOpenModel.isOpen && <ProfileSettings props={closeProfileButtonModal} />}
      </>
    );
  }
}
