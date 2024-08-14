import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { Label } from 'reactstrap';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { addProfileImageRequest, deleteProfileImageRequest } from '../../../store/Profile/slice';
import { setConfirmationOpen } from '../../../store/UtilityCallFunction/slice';

const ProfileImageUpload = () => {
    const dispatch = useDispatch();

    const { uploadedProfileImage } = useSelector((state) => state?.profileSlice);
    const { profilePicture, actionType, isProfileImageEnableToDelete } = useSelector((state) => state?.utilityCallFunctionSlice);
    const profilePictureData = (!uploadedProfileImage && uploadedProfileImage === "") ? profilePicture : uploadedProfileImage?.file;

    const getFileSizeInMb = (fileSize = 0) => (fileSize ? fileSize / 1024 / 1024 : 0);

    const onFileUpload = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            let isValidFileSize = getFileSizeInMb(file.size) <= 5;
            let isValidFileExtention = ['jpg', 'jpeg', 'png']?.includes(file?.name?.split(".")?.pop()?.toLowerCase())

            if (isValidFileSize && isValidFileExtention) {
                const formData = new FormData();
                formData.append('file_', file);
                dispatch(addProfileImageRequest({ file: URL.createObjectURL(file), formData }))
            } else {
                toast(!isValidFileSize ? "Please Select file less than 200 MB" : "Please Upload Valid file type", {
                    position: "top-right",
                    type: "error",
                });
            }
        }
    }

    const handleSubmit = () => {
        dispatch(deleteProfileImageRequest())
    }

    const deleteProfileImageHandle = () => {
        dispatch(setConfirmationOpen({ actionType: getActionTypes.ISCONFIRM, message: "Are you sure, you want to delete your profile picture?", callApi: handleSubmit }))
    }


    return (
        <React.Fragment>
            <div className={"al_profile_photo "}>
                <img src={profilePictureData} alt="profilePhoto" loading='eager' />
            </div>
            {actionType === getActionTypes.EDIT && (
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
                        <Label for="uploadPicture">
                            <div className="al_profile-edit-icon">
                                <i className="icon_alfred_edit"></i>
                            </div>
                        </Label>
                        {isProfileImageEnableToDelete && <div className="al_profile-edit-icon ms-3" onClick={deleteProfileImageHandle}>
                            <i className="icon_alfred_trashbin"></i>
                        </div>}
                    </div>
                </>
            )}
        </React.Fragment>
    )
}

export default ProfileImageUpload;