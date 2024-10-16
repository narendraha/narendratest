import React, { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from 'reactstrap';
import { getActionTypes, pageTitle } from "../../_mock/internalJsControl";
import Chatbot from "../../images/alfredicon.svg";
import homebotimg from '../../images/doctorbot.png';
import homeleftmobileLocal from "../../images/homeleftmobile.gif";
import homeright from '../../images/homeright.gif';
import { getChatStreamRequest, setChatHistoryRequest, setInputDisableRequest, setResetPendingEducationalBotRequest } from "../../store/EducationaChatBot/slice";
import { setNonAuthSessionIdReuqest } from "../../store/SessionStore/slice";
import { getAssetsRequest } from "../../store/UtilityCallFunction/slice";
import ChatBotMsgInterface from "../Utilities/ChatBotMsgInterface";
import ChatBotSearchArea from "../Utilities/ChatBotSearchArea";
import HomeEducationalBotPrompt from "./HomeEducationalBotPrompt";

let homeleftmobile = 'homeleftmobile.gif'

const HomeEducationalBot = () => {
    pageTitle("Home")
    const dispatch = useDispatch();

    const [openChatUI, setOpenChatUI] = useState(false);

    const chatHistory = useSelector((state) => state?.educationalChatBotSlice?.chatHistory || undefined);
    const isInputDisable = useSelector((state) => state?.educationalChatBotSlice?.isInputDisable);
    const isChatBotLoading = useSelector((state) => state?.educationalChatBotSlice?.isChatBotLoading);
    const regenerateResponse = useSelector((state) => state?.educationalChatBotSlice?.regenerateResponse);

    const actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType || getActionTypes.UNSELECT);
    const assetUrl = useSelector((state) => state?.utilityCallFunctionSlice?.assetUrl);
    const nonAuthSessionId = useSelector((state) => (state?.sessionStoreSlice?.nonAuthSessionId))

    let generateNonAuthSessionId = useCallback(() => {
        let sessionId;
        if (!nonAuthSessionId)
            sessionId = nanoid()
        else
            sessionId = nonAuthSessionId
        return sessionId;
    }, [nonAuthSessionId]);

    useEffect(() => {
        dispatch(getAssetsRequest(homeleftmobile))
        dispatch(setNonAuthSessionIdReuqest(generateNonAuthSessionId()))
        return () => {
            dispatch(setResetPendingEducationalBotRequest())
        }
    }, [dispatch, generateNonAuthSessionId]);

    console.log("assetUrlassetUrl", assetUrl?.["homeleftmobile"])
    const handleFormSubmit = (e) => {
        // e.preventDefault();
        let inputValue = e?.target?.value || e;
        if (!inputValue.trim()) return; // Do not submit empty input
        setOpenChatUI(true)
        dispatch(setInputDisableRequest(true))
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        dispatch(getChatStreamRequest(inputValue))
    };

    const handleRegenerateResponse = () => {
        // sending last user input text
        handleFormSubmit(chatHistory?.[chatHistory?.length - 2]?.content)
    }

    return (
        <React.Fragment>
            <div className="cs_homepage">
                {openChatUI ?
                    <div className="w-50 al_chatbotauth">
                        <div className="d-flex flex-column">
                            <div className="flex-grow-1">
                                <div className="scrolldiv">
                                    {chatHistory?.length > 0 && chatHistory?.map((x, index) => {
                                        return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index, isInputDisable, actionType }} />
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
                            <div className="cs_mainsearch mb-2">
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
                    :
                    <Row className="w-75 align-items-center wflexLayout">
                        <Col sm="4" className="h-100 d-flex align-items-center d-xs-none">
                            {/* <img src={assetUrl?.["homeleftmobile"]} alt="chatbot" className="mobileanim" /> */}
                            <img src={homeleftmobileLocal} alt="chatbot" className="mobileanim" />
                        </Col>
                        <Col sm="8" className="h-100 d-flex flex-column justify-content-center">
                            <Row className="al_hometop">
                                <Col className="d-flex justify-content-end">
                                    <img src={homeright} alt="typing" />
                                </Col>
                                <div className="w-auto w-max-40 pe-5">
                                    <img src={homebotimg} alt="homebot" />
                                </div>
                            </Row>
                            {chatHistory?.length > 0 && chatHistory?.map((x, index) => {
                                return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index: index }} />
                            })}
                            <div className="cs_mainsearch mb-2">
                                <ChatBotSearchArea
                                    handleFormSubmit={handleFormSubmit}
                                    isInputDisable={isInputDisable}
                                />
                            </div>

                            {/* Educational Bot Prompts */}
                            <HomeEducationalBotPrompt props={{ handleFormSubmit }} />
                        </Col>
                    </Row>
                }
            </div>
        </React.Fragment>
    )
}

export default HomeEducationalBot;