import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getActionTypes, getProfileTabs, loginRoles, pageTitle } from '../../../_mock/helperIndex';
import { setResetProfileSliceData } from "../../../store/Profile/slice";
import { getUsersDetailsRequest, setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";
import { ProfileSettings } from "./ProfileSettings";
import { AdminProfileEditAction } from "./adminProfileEditAction";
import { BankDetails } from "./bankDetails";
import { ChangeProfilePassword } from "./changeProfilePassword";
import { ProfileEditAction } from "./profileEditAction";
import ProfileImageUpload from './profileImageUpload';
import { ProfileViewDetails } from './profileViewDetails';

export default function ProfileManager() {
  pageTitle("Profile")
  const dispatch = useDispatch();

  const actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType);
  const actionData = useSelector((state) => state?.utilityCallFunctionSlice?.actionData);
  const getProfileDetails = useSelector((state) => state?.utilityCallFunctionSlice?.getProfileDetails);

  useEffect(() => {
    dispatch(getUsersDetailsRequest())
    return () => {
      dispatch(setResetProfileSliceData())
      dispatch(setActionTypeAndActionData(""))
    }
  }, [dispatch]);

  return (
    <>
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-3">Profile</h3>
          <Row className="al_profile_manage">
            <Col xl="3" lg="3" sm="4">
              <ProfileImageUpload />
            </Col>
            <Col xl="7" lg="8" md="8" sm="8" className="px-5">
              {actionType === getActionTypes.EDIT ?
                (getProfileDetails?.role_id == loginRoles.ADMIN ? <AdminProfileEditAction /> : <ProfileEditAction />) :
                <ProfileViewDetails />}
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
