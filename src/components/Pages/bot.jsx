import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import homebotimg from '../../images/doctorbot.png';
import homeleftmobile from '../../images/homeleftmobile.gif';
import homeright from '../../images/homeright.gif';
import { setChatHistoryRequest } from "../../store/EducationaChatBot/slice";
import { getAssetsRequest, setLoading } from "../../store/UtilityCallFunction/slice";
import ChatBotMsgInterface from "../Utilities/ChatBotMsgInterface";
import ChatBotSearchArea from "../Utilities/ChatBotSearchArea";

// let homeleftmobile = 'homeleftmobile.gif'

const HomeEducationalBot = () => {
    const dispatch = useDispatch();

    const [isInputDisable, setinputDiable] = useState(false);
    const [randomId, setRandomId] = useState(null);
    const [openChatUI, setOpenChatUI] = useState(false)

    const { assetUrl, chatHistory } = useSelector((state) => state?.educationalChatBotSlice);

    useEffect(() => {
        dispatch(getAssetsRequest(homeleftmobile))
    }, []);

    useEffect(() => {
        setRandomId(uuidv4().slice(0, 5))
    }, [randomId === null])


    const handleFormSubmit = (e) => {
        // e.preventDefault();
        let inputValue = e?.target?.value || e;
        if (!inputValue.trim()) return; // Do not submit empty input
        setOpenChatUI(true)
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        let data = {
            id: randomId,
            messages: [{ content: inputValue, role: 'User' }],
        };
        // dispatch(getChatStreamRequest(data))
        getChatStreamRequest(data)
    };


    const getChatStreamRequest = async (data) => {
        dispatch(setLoading(true));
        setinputDiable(true);
        const apiUrl = 'http://4.246.143.7:3001/education_bot_home';
        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            const responseStream = await fetch(apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            console.log("responseStream=>", responseStream)

            if (responseStream) {
                const reader = responseStream.body.getReader();
                const decoder = new TextDecoder();
                let done = false;
                let tempStr = '';

                while (!done) {
                    const { value, done: doneReading } = await reader.read();
                    done = doneReading;
                    const chunk = decoder.decode(value, { stream: true });

                    console.log("chunk=>", chunk)
                    tempStr += chunk;

                    const updatedChatHistory = [...chatHistory];
                    const lastMessage = updatedChatHistory[updatedChatHistory.length - 1];
                    // Check if the last message is from 'Alfred' and update it
                    if (lastMessage && lastMessage.role === 'Alfred') {
                        updatedChatHistory[updatedChatHistory.length - 1].content += chunk;
                    } else {
                        updatedChatHistory.push({ content: chunk, role: 'Alfred' });
                    }
                    dispatch(setChatHistoryRequest(updatedChatHistory))
                    return updatedChatHistory
                }
            }
        } catch (error) {
            console.error('Error streaming response:', error);
        } finally {
            dispatch(setLoading(false));
            setinputDiable(false)
            // setLoadingIndex(null);
        }
    }

    console.log("assetUrlassetUrl", assetUrl)

    return (
        <React.Fragment>
            <div className="cs_homepage">
                {openChatUI ?
                    <div className="w-50 al_chatbotauth">
                        <div className="d-flex flex-column">
                            {chatHistory?.length > 0 && chatHistory?.map((x, index) => {
                                return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index: index }} />
                            })}
                            <ChatBotSearchArea
                                handleFormSubmit={handleFormSubmit}
                                isInputDisable={isInputDisable}
                            />
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
                            <ChatBotSearchArea
                                handleFormSubmit={handleFormSubmit}
                                isInputDisable={isInputDisable}
                            />
                        </Col>
                    </Row>
                }
            </div>
        </React.Fragment>
    )
}

export default HomeEducationalBot;