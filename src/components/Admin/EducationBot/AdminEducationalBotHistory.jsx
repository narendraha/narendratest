import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getTruncateString } from "../../../_mock/internalJsControl";
import nodata from '../../../images/nodata.svg';
import { setMenuOrPdfExpend } from "../../../store/EducationaChatBot/slice";
import { setAuthSessionIdRequest, setSelectedConversationSessionIdForEducationalBot } from "../../../store/SessionStore/slice";
import { ChatBotShareModal } from "../../Utilities/ChatBotShareModal";
import EducationalBotHTMLcontent from "../../Utilities/EducationalBotHTMLcontent";

export const AdminEducationalBotHistory = React.memo(() => {
    const dispatch = useDispatch();

    const [shareModelObj, setShareModelObj] = useState(null);

    const isMenuExpand = useSelector((state) => (state?.educationalChatBotSlice?.isMenuExpand));
    const groupedConversationByDate = useSelector((state) => (state?.educationalChatBotSlice?.groupedConversationByDate) || undefined);
    const selectedConvoSessionId = useSelector((state) => (state?.sessionStoreSlice?.selectedConvoSessionId) || null);
    const newSessionId = useSelector((state) => (state?.sessionStoreSlice?.sessionId) || null);
    const isInputDisable = useSelector((state) => state?.educationalChatBotSlice?.isInputDisable);

    const menuExpandHandle = (status) => {
        dispatch(setMenuOrPdfExpend({ isMenuExpand: status }))
    }

    const getConversationDaysgap = (cdate) => {
        const currentDate = new Date();
        const conversationDate = new Date(cdate);
        const differenceInDays = Math.floor((currentDate - conversationDate) / (1000 * 60 * 60 * 24));
        // return differenceInDays === 0 ? 'Today' : differenceInDays === 1 ? 'Yesterday' : differenceInDays <= 7 ? 'Past 7 Days' : moment(conversationDate.toLocaleDateString()).format("DD/MM/yyyy");
        return differenceInDays === 0 ? 'Today' : differenceInDays === 1 ? 'Yesterday' : 'Past 7 Days';
    }

    const handleConversationView = (selectedSessionId = null) => {
        let convo_session_id = selectedSessionId ? selectedSessionId : newSessionId;
        dispatch(setSelectedConversationSessionIdForEducationalBot(convo_session_id));
    };

    const handleNewSessionOpen = async () => {
        if (!isInputDisable) {
            let randomId = nanoid();
            await dispatch(setAuthSessionIdRequest(randomId));
            handleConversationView();
        }
    }

    const shareActionHandle = (status, session_id) => {
        setShareModelObj({ isModelOpen: status, session_id })
    }

    return (
        <React.Fragment>
            <nav className={"al_edbot_expand pt-3 " + (!isMenuExpand ? " al_ed_slide_out " : "")}>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                    <i
                        className="icon_alfred_menucollapse pointer"
                        onClick={() => menuExpandHandle(!isMenuExpand)}
                    ></i>
                    <i
                        className={`icon_alfred_circle_plus pe-3 ${isInputDisable ? 'disabled' : 'pointer'}`}
                        style={{ fontSize: "20px" }}
                        onClick={handleNewSessionOpen}
                    ></i>
                </div>
                <div className='al_left_data pb-3'>
                    {groupedConversationByDate && Object.keys(groupedConversationByDate).length > 0 && (
                        Object.keys(groupedConversationByDate).map((date) => (
                            <div key={date}>
                                <p className="text-grey">{getConversationDaysgap(date)}</p>
                                <hr />
                                <ul style={{ paddingLeft: "10px" }}>
                                    {groupedConversationByDate[date].map((convo) => (
                                        <li key={convo.session_id} className={convo.session_id === selectedConvoSessionId ? "active" : ""} >
                                            <div className="pointer" onClick={() => handleConversationView(convo.session_id)} ><EducationalBotHTMLcontent props={{ content: getTruncateString(convo?.conversation_history?.[0]?.content, 15) }} /></div>
                                            <UncontrolledDropdown className='al_filterdropdown al_vmoredropdown' direction="left">
                                                <DropdownToggle id="filter">
                                                    <i className="icon_alfred_vmore" style={{ fontSize: "14px" }}></i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem onClick={() => shareActionHandle(true, convo.session_id)}><i className="icon_alfred_share me-1" style={{ fontSize: "12px" }}></i>Share</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}

                    {/* sharemodel */}
                    {shareModelObj?.isModelOpen && <ChatBotShareModal props={{ shareActionHandle, shareModelObj }} />}

                    {/* no history available */}
                    {groupedConversationByDate && Object.keys(groupedConversationByDate).length === 0 && < div className="d-flex flex-column align-items-center pt-5">
                        <img src={nodata} alt="" style={{ width: "120px" }} />
                        <h6 className="my-3">No entries to display</h6>
                        <button type="button" className='al_button px-3 al_cancelbgbutton'
                            onClick={handleConversationView}>
                            <i className="icon_alfred_plus me-2"></i>
                            Start Chat
                        </button>
                    </div>}

                </div>
            </nav>
        </React.Fragment >
    );
});
