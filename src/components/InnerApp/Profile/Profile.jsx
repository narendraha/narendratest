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
import ProfileImageUpload from './profileImageUpload';
import { useSelector } from "react-redux";

export const EProfileButton = {
  CHANGEPASSWORD: 1,
  BANKDETAILS: 2,
  SETTINGS: 3
}

export default function Profile() {

  // const uploadedFileData = useSelector((state) => (state?.profileSlice?.images));

  // console.log("uploadedFileDatauploadedFileData", uploadedFileData)
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
    // if (data) {
    //   setIsLoading(true)
    //   const uploadProfileImageRequest = AxiosInstance("multipart/form-data").post("/upload-profile-image", uploadedFileData?.formData);
    //   const updateProfileDatialsRequest = AxiosInstance("application/json").put("/update_details", formData);
    //   let requestMethods = [updateProfileDatialsRequest]
    //   if (uploadedFileData?.formData)
    //     requestMethods?.push(uploadProfileImageRequest)
    //   Promise.all(requestMethods)
    //     .then((requestMethods) => {
    //       let updateProfileDatialsResponse = requestMethods?.[0];
    //       let uploadProfileImageResponse = requestMethods?.length > 1 ? requestMethods?.[1] : false;
    //       let isProfileImageUpdate = !uploadProfileImageResponse ? true : reLoadWindow()?.isWinowLoaded;
    //       if (isProfileImageUpdate) {
    //         setIsLoading(false)
    //         if (!uploadProfileImageResponse || uploadProfileImageResponse.data && uploadProfileImageResponse.status === 200 && uploadProfileImageResponse.data.statuscode === 200) {
    //           if (updateProfileDatialsResponse && updateProfileDatialsResponse.data && updateProfileDatialsResponse.status === 200) {
    //             if (updateProfileDatialsResponse.data?.statuscode === 200) {
    //               toast(updateProfileDatialsResponse.data?.message, {
    //                 position: "top-right",
    //                 type: "success",
    //               });
    //               setIsEdit(false);
    //               if (!uploadProfileImageResponse)
    //                 profileDetails();
    //               navigate("/profile");
    //             } else {
    //               toast(updateProfileDatialsResponse.data?.message, {
    //                 position: "top-right",
    //                 type: "error",
    //               });
    //               navigate("/profile");
    //             }
    //           } else {
    //             toast(updateProfileDatialsResponse.data?.message, {
    //               position: "top-right",
    //               type: "error",
    //             });
    //             navigate("/profile");
    //           }
    //         } else {
    //           toast(uploadProfileImageResponse.data.message, {
    //             position: "top-right",
    //             type: "error",
    //           });
    //         }
    //       }
    //     })
    //     .catch((er) => {
    //       toast(er?.response?.data?.detail, {
    //         position: "top-right",
    //         type: "error",
    //       });
    //     });
    // }
  };

  const openModelHandle = (activeProfileButton) => {
    setOpenModel({ profileButton: activeProfileButton, isOpen: true })
  }


  // const profilePicture = uploadedFileData === "" ? ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : getProfileDetails?.profile_url) : uploadedFileData?.file;

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
                <ProfileImageUpload />
              </Col>
              <Col xl="7" lg="8" md="8" sm="8" className="px-5">
                {/* <ProfileEditAction />
                <ProfileViewDetails /> */}
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
