import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { getChatStreamRequest, setChatHistoryRequest } from "../../store/EducationaChatBot/slice";
import { getAssetsRequest } from "../../store/UtilityCallFunction/slice";
import ChatBotMsgInterface from "../Utilities/ChatBotMsgInterface";
import ChatBotSearchArea from "../Utilities/ChatBotSearchArea";
import { Row, Col } from 'reactstrap';

let homeleftmobile = 'homeleftmobile.gif'

const HomeEducationalBot = () => {
    const dispatch = useDispatch();

    const [isInputDisable, setinputDiable] = useState(false);
    const [randomId, setRandomId] = useState(null);

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
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        let data = {
            id: randomId,
            messages: [{ content: inputValue, role: 'User' }],
        };
        dispatch(getChatStreamRequest(data))
    };


    console.log("assetUrlassetUrl", assetUrl)

    return (
        <React.Fragment>
            <div className="cs_homepage">
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

                {/* <Row className="w-75 align-items-center wflexLayout">
                    <Col sm="4" className="h-100 d-flex align-items-center d-xs-none">
                        <img src={assetUrl?.homeleftmobile} alt="chatbot" className="" />
                    </Col>
                </Row> */}
            </div>
        </React.Fragment>
    )
}

export default HomeEducationalBot;