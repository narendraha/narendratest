import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { Label } from 'reactstrap';
import { getActionTypes } from '../../../_mock/internalJsControl';
import { addProfileImageRequest } from '../../../store/Profile/slice';

const ProfileImageUpload = () => {
    const dispatch = useDispatch();

    const { actionType, profilePicture, uploadedProfileImage } = useSelector((state) => state?.profileSlice);
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


    return (
        <React.Fragment>
            <div className={"al_profile_photo "}>
                <img src={profilePictureData} alt="profilePhoto" />
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
                        <Label
                            for="uploadPicture"
                        // onClick={() => (true)}
                        >
                            <div className="al_profile-edit-icon">
                                <i className="icon_alfred_edit"></i>
                            </div>
                        </Label>
                        {/* {updatedFile && <div className="al_profile-edit-icon ms-3" onClick={() => setUpdatedFile("")}>
                            <i className="icon_alfred_trashbin"></i>
                        </div>} */}
                    </div>
                </>
            )}
        </React.Fragment>
    )
}

export default ProfileImageUpload;