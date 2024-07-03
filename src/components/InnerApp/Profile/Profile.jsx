import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getActionTypes, getProfileTabs } from '../../../_mock/helperIndex';
import { getPatientDetailsRequest } from "../../../store/Profile/slice";
import Loading from "../LoadingComponent";
import { ProfileSettings } from "./ProfileSettings";
import { BankDetails } from "./bankDetails";
import { ChangeProfilePassword } from "./changeProfilePassword";
import { ProfileEditAction } from "./profileEditAction";
import ProfileImageUpload from './profileImageUpload';
import { ProfileViewDetails } from './profileViewDetails';

export default function Profile() {
  const dispatch = useDispatch();

  const { isLoading, actionType, actionData } = useSelector((state) => state?.profileSlice)

  useEffect(() => {
    dispatch(getPatientDetailsRequest())
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-3">Profile</h3>
          <Row className="al_profile_manage">
            <Col xl="3" lg="3" sm="4">
              <ProfileImageUpload />
            </Col>
            <Col xl="7" lg="8" md="8" sm="8" className="px-5">
              {actionType === getActionTypes.EDIT ? <ProfileEditAction /> : <ProfileViewDetails />}
            </Col>
          </Row>
        </div>
      </div>

      {actionType === getActionTypes.SELECT && actionData === getProfileTabs.CHANGEPASSWORD && <ChangeProfilePassword />}
      {actionType === getActionTypes.SELECT && actionData === getProfileTabs.BANKDETAILS && <BankDetails />}
      {actionType === getActionTypes.SELECT && actionData === getProfileTabs.SETTINGS && <ProfileSettings />}
    </>
  );
}
