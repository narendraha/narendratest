import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Col, Label } from 'reactstrap';
import { uploadProfileImageRequest } from '../../../store/Profile/slice';
import { toast } from "react-toastify";
import { AxiosInstance } from "../../../_mock/utilities";
import { useSelector } from 'react-redux';
import maleuserImg from "../../../images/userprofile.jpg";
import femaleuserImg from "../../../images/femaleuserImg.jpg";

const ProfileImageUpload = () => {

    // const uploadedFileData = useSelector((state) => (state?.profileSlice?.images));

    // const [getProfileDetails, setGetProfileDetails] = useState([]);

    // const profileDetails = async () => {
    //     await AxiosInstance("application/json")
    //         .get("/userdetails")
    //         .then((res) => {
    //             const responseData = res.data?.data;
    //             setGetProfileDetails(responseData);
    //         })
    //         .catch((er) => { });
    // };

    // useEffect(() => {
    //     profileDetails()
    // }, [])

    const dispatch = useDispatch();

    const getFileSizeInMb = (fileSize = 0) => (fileSize ? fileSize / 1024 / 1024 : 0);

    const onFileUpload = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            let isValidFileSize = getFileSizeInMb(file.size) <= 200;
            let isValidFileExtention = ['jpg', 'jpeg', 'png']?.includes(file?.name?.split(".")?.pop()?.toLowerCase())

            if (isValidFileSize && isValidFileExtention) {
                const formData = new FormData();
                formData.append('file_', file);
                // dispatch(uploadProfileImageRequest({ file: URL.createObjectURL(file), formData }))
            } else {
                toast(!isValidFileSize ? "Please Select file less than 200 MB" : "Please Upload Valid file type", {
                    position: "top-right",
                    type: "error",
                });
            }
        }
    }

    // const profilePicture = uploadedFileData === "" ? ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? femaleuserImg : maleuserImg) : getProfileDetails?.profile_url) : uploadedFileData?.file;

    return (
        <></>
        // <React.Fragment>
        //     <div className={"al_profile_photo "}>
        //         <img src={profilePicture} alt="profilePhoto" />
        //     </div>
        //     {(
        //         <>
        //             <div className="al_note"><span className="text-warning fw-medium">*Note: </span>Only jpeg, jpg, and png image formats are allowed</div>

        //             <div className="d-flex justify-content-center mt-3">
        //                 <input
        //                     type="file"
        //                     id="uploadPicture"
        //                     name="uploadProfilePic"
        //                     onChange={(e) => onFileUpload(e)}
        //                     hidden
        //                     accept=".jpg,.jpeg,.png"
        //                 />
        //                 <Label
        //                     for="uploadPicture"
        //                 // onClick={() => setIsEdit(true)}
        //                 >
        //                     <div className="al_profile-edit-icon">
        //                         <i className="icon_alfred_edit"></i>
        //                     </div>
        //                 </Label>
        //                 {/* {updatedFile && <div className="al_profile-edit-icon ms-3" onClick={() => setUpdatedFile("")}>
        //                         <i className="icon_alfred_trashbin"></i>
        //                     </div>} */}
        //             </div>
        //         </>
        //     )}
        // </React.Fragment>
    )
}

export default ProfileImageUpload