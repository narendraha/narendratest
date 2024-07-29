import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import { pageTitle } from "../../_mock/internalJsControl";
import Chatbot from "../../images/alfredicon.svg";
import homebotimg from '../../images/doctorbot.png';
import homeleftmobile from '../../images/homeleftmobile.gif';
import homeright from '../../images/homeright.gif';
import { getChatStreamRequest, setChatHistoryRequest, setInputDisableRequest } from "../../store/EducationaChatBot/slice";
import { getAssetsRequest } from "../../store/UtilityCallFunction/slice";
import ChatBotMsgInterface from "../Utilities/ChatBotMsgInterface";
import ChatBotSearchArea from "../Utilities/ChatBotSearchArea";

// let homeleftmobile = 'homeleftmobile.gif'

const HomeEducationalBot = () => {
    pageTitle("Home")
    const dispatch = useDispatch();

    const [openChatUI, setOpenChatUI] = useState(false);

    const { chatHistory, isInputDisable, isChatBotLoading } = useSelector((state) => state?.educationalChatBotSlice);

    useEffect(() => {
        dispatch(getAssetsRequest(homeleftmobile))
    }, []);


    const handleFormSubmit = (e) => {
        // e.preventDefault();
        let inputValue = e?.target?.value || e;
        if (!inputValue.trim()) return; // Do not submit empty input
        setOpenChatUI(true)
        dispatch(setInputDisableRequest(true))
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        dispatch(getChatStreamRequest(inputValue))
    };


    return (
        <React.Fragment>
            <div className="cs_homepage">
                {openChatUI ?
                    <div className="w-50 al_chatbotauth">
                        <div className="d-flex flex-column">
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
                                        return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index: index }} />
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
                                <ChatBotSearchArea
                                    handleFormSubmit={handleFormSubmit}
                                    isInputDisable={isInputDisable}
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <Row className="w-75 align-items-center wflexLayout">
                        <Col sm="4" className="h-100 d-flex align-items-center d-xs-none">
                            <img src={homeleftmobile} alt="chatbot" className="mobileanim" />
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
                        </Col>
                    </Row>
                }
            </div>
        </React.Fragment>
    )
}

export default HomeEducationalBot;