import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getEducationalBotConversationRequest,
    setResetPendingEducationalBotRequest
} from "../../../store/EducationaChatBot/slice";
import { AdminEducationalBotHistory } from "./AdminEducationalBotHistory";
import { AdminEducationalBotPdfViewer } from "./AdminEducationalBotPdfViewer";
import AdminEducationalChatBot from "./AdminEducationalChatBot";

const AdminEducationalBotManager = () => {
    const dispatch = useDispatch();

    const isPdfViewExpand = useSelector((state) => (state?.educationalChatBotSlice?.isPdfViewExpand))

    useEffect(() => {
        dispatch(getEducationalBotConversationRequest())
        return () => {
            dispatch(setResetPendingEducationalBotRequest())
        }
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className='al_edbot_expcon pt-1 pb-3'>
                <div className='al_edbot_container ms-4'>
                    <AdminEducationalBotHistory />
                    <AdminEducationalChatBot />
                    {isPdfViewExpand && <AdminEducationalBotPdfViewer />}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminEducationalBotManager