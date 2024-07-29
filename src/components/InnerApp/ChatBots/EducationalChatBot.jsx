import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap";
import { getProfilePictureByGender } from '../../../_mock/helperIndex';
import Chatbot from "../../../images/alfredicon.svg";
import { getChatStreamRequest, setChatHistoryRequest, setInputDisableRequest } from "../../../store/EducationaChatBot/slice";
import { getPatientDetailsRequest } from '../../../store/UtilityCallFunction/slice';
import ChatBotMsgInterface from '../../Utilities/ChatBotMsgInterface';
import ChatBotSearchArea from '../../Utilities/ChatBotSearchArea';

const EducationalChatBot2 = (props) => {
    const dispatch = useDispatch();

    const { chatHistory, isInputDisable, isChatBotLoading } = useSelector((state) => state?.educationalChatBotSlice);
    const { getProfileDetails } = useSelector((state) => state?.utilityCallFunctionSlice);
    const profilePicture = getProfilePictureByGender(getProfileDetails);

    useEffect(() => {
        dispatch(getPatientDetailsRequest())
    }, []);

    const handleFormSubmit = (e) => {
        // e.preventDefault();
        let inputValue = e?.target?.value || e;
        if (!inputValue.trim()) return; // Do not submit empty input
        dispatch(setInputDisableRequest(true))
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        dispatch(getChatStreamRequest({ inputValue, innerBot: true }))
    };

    const botCloseHandle = () => {
        props.setBotIsOpen(!props.botisOpen)
        dispatch(setChatHistoryRequest(null))
    }


    return (
        <React.Fragment>
            <div className="al_chatbot">
                <Card>
                    <CardBody className="d-flex flex-column">
                        <div className="d-flex align-items-center py-1" style={{ backgroundColor: "#ffffff" }}>
                            <div className="d-flex align-items-center">
                                <img src={Chatbot} alt="botimage" className="ps-3" />
                                <div className="ps-2" style={{ lineHeight: 1.1 }}>
                                    <div className="fw-medium">ChatBot</div>
                                    <small className="text-success text-small">Online</small>
                                </div>
                            </div>
                            <Button
                                id="homechatclose"
                                type="button"
                                onClick={() => botCloseHandle()}
                                className="mt-2"
                            >
                                <i className="icon_alfred_close"></i>
                            </Button>
                        </div>
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
                                    return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index: index, profilePicture }} />
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
                            style={{ backgroundColor: "#E2E5ED" }}
                        >
                            <ChatBotSearchArea
                                handleFormSubmit={handleFormSubmit}
                                isInputDisable={isInputDisable}
                            />
                            <div className="al_note pt-1">
                                Disclaimer: Not a medical advice
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </React.Fragment>
    )
}

export default EducationalChatBot2