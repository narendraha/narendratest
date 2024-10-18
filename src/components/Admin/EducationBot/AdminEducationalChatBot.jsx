import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { getActionTypes, getProfilePictureByGender } from '../../../_mock/helperIndex';
import Chatbot from "../../../images/alfredicon.svg";
import botIcon from "../../../images/botIcon.png";
import {
    getChatStreamRequest,
    setChatHistoryRequest,
    setInputDisableRequest,
    setMenuOrPdfExpend
} from "../../../store/EducationaChatBot/slice";
import { setResetSessionState, setSelectedConversationSessionIdForEducationalBot } from '../../../store/SessionStore/slice';
import ChatBotMsgInterface from '../../Utilities/ChatBotMsgInterface';
import ChatBotSearchArea from '../../Utilities/ChatBotSearchArea';

const AdminEducationBot = (props) => {
    const dispatch = useDispatch();

    const isInputDisable = useSelector((state) => state?.educationalChatBotSlice?.isInputDisable);
    const isChatBotLoading = useSelector((state) => state?.educationalChatBotSlice?.isChatBotLoading);
    const getProfileDetails = useSelector((state) => state?.utilityCallFunctionSlice?.getProfileDetails || undefined);
    const actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType || getActionTypes.UNSELECT);
    const chatHistory = useSelector((state) => state?.educationalChatBotSlice?.chatHistory || undefined);
    const regenerateResponse = useSelector((state) => state?.educationalChatBotSlice?.regenerateResponse);
    const feedBackAlert = useSelector((state) => state?.educationalChatBotSlice?.feedBackAlert);
    const selectedConvoSessionId = useSelector((state) => state?.sessionStoreSlice?.selectedConvoSessionId);
    const conversationList = useSelector((state) => state?.educationalChatBotSlice?.conversationList);

    const profilePicture = getProfilePictureByGender(getProfileDetails);
    const isMenuExpand = useSelector((state) => (state?.educationalChatBotSlice?.isMenuExpand));
    const isPdfViewExpand = useSelector((state) => (state?.educationalChatBotSlice?.isPdfViewExpand));
    const newSessionId = useSelector((state) => (state?.sessionStoreSlice?.sessionId) || null);

    const handleRegenerateResponse = () => {
        handleFormSubmit(chatHistory?.[chatHistory?.length - 2]?.content)
    }

    const handleFormSubmit = (e) => {
        let inputValue = e?.target?.value || e;
        if (inputValue && !inputValue.trim()) return; // Do not submit empty input
        dispatch(setInputDisableRequest(true))
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        dispatch(getChatStreamRequest({ inputValue, innerBot: true }))
    };

    const menuExpandHandle = (status) => {
        dispatch(setMenuOrPdfExpend({ isMenuExpand: status, isPdfViewExpand }))
    }

    const handleConversationView = (selectedSessionId = null) => {
        let convo_session_id = selectedSessionId ? selectedSessionId : newSessionId
        dispatch(setSelectedConversationSessionIdForEducationalBot(convo_session_id));
    };

    useEffect(() => {
        let selectedSessionConvo = conversationList?.find((x) => x.session_id === selectedConvoSessionId)?.conversation_history;
        dispatch(setChatHistoryRequest(selectedSessionConvo))
    }, [selectedConvoSessionId, conversationList, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(setSelectedConversationSessionIdForEducationalBot(null))
        }
    }, []);

    console.log("isPdfViewExpandisPdfViewExpand", { selectedConvoSessionId })

    return (
        <React.Fragment>
            <div className="cs_homepage mt-0 h-100">
                <div className={"w-100 mb-2" + (isMenuExpand ? " ps-4" : "")}>
                    <div className="d-flex align-items-center gap-2 mb-2 py-2 px-3 al_chatonlineheader">
                        {!isMenuExpand && <> <i
                            className="icon_alfred_menuexpand pointer me-3"
                            onClick={() => menuExpandHandle(!isMenuExpand)}
                        ></i>
                            <i
                                className="icon_alfred_circle_plus pointer me-3"
                                style={{ fontSize: "20px" }}
                                onClick={handleConversationView}
                            ></i>
                        </>}
                        <img src={botIcon} alt="Bot" />
                        <div style={{ lineHeight: 1.1 }}>
                            <div className="fw-medium">Alfred</div>
                            <small className="text-success text-small">Online</small>
                        </div>
                    </div>
                </div>
                <div className="w-75 al_chatbotauth pt-1 wflexLayout">
                    <div className="d-flex flex-column gap-3">
                        <div className="flex-grow-1">
                            <div className="scrolldiv">
                                <Row className="mb-4 al_chatcontent">
                                    <div>
                                        <img src={Chatbot} alt="Bot" id="botinitialimage" />
                                        <UncontrolledTooltip
                                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                                            placement='bottom' target="botinitialimage">
                                            Alfred
                                        </UncontrolledTooltip>
                                    </div>
                                    <Col>
                                        <div>Hello, I am Alfred! How can i assist you today?</div>
                                    </Col>
                                </Row>
                                {chatHistory?.length > 0 && chatHistory?.map((x, index) => {
                                    return <ChatBotMsgInterface key={index} props={{
                                        chatHistory: x,
                                        index,
                                        profilePicture,
                                        getProfileDetails,
                                        isInputDisable,
                                        actionType,
                                        feedBackAlert,
                                        toatlHistory: chatHistory
                                    }} />
                                })}
                                {isChatBotLoading &&
                                    <Row className="mb-4 al_chatcontent al_bot-reply">
                                        <div>
                                            <img src={Chatbot} alt="Bot" id="botimageed" />
                                        </div>
                                        <Col>
                                            <div>
                                                <div className="al_chatloading my-1"></div>
                                            </div>
                                        </Col>
                                    </Row>}
                            </div>
                        </div>
                        <div
                            className="cs_mainsearch al_chatfooter p-3"
                        >
                            {regenerateResponse ?
                                <div className='text-center'>
                                    <button type="button" className='al_savebtn' onClick={handleRegenerateResponse}><i className="icon_alfred_sync me-2" style={{ verticalAlign: "middle", fontSize: "16px" }}></i>Regenerate</button>
                                </div>
                                :
                                <>
                                    <ChatBotSearchArea
                                        handleFormSubmit={handleFormSubmit}
                                        isInputDisable={isInputDisable}
                                    />
                                    <div className="al_note pt-1">
                                        Disclaimer: Not a medical advice
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminEducationBot