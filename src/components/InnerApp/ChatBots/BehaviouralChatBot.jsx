import _ from 'lodash';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { getProfilePictureByGender } from "../../../_mock/internalJsControl";
import Chatbot from "../../../images/alfredicon.svg";
import {
    getBehaviouralBotChatRequest,
    getBehaviouralBotQuestionsRequest,
    setBehaviouralBotChatHistoryRequest,
    setBehaviouralBotInputDisableRequest,
    setResetPendingBehaviouralBotRequest
} from "../../../store/BehaviouralChatBot/slice";
import { getPatientDetailsRequest } from "../../../store/UtilityCallFunction/slice";
import ChatBotMsgInterface from "../../Utilities/ChatBotMsgInterface";
import ChatBotSearchArea from "../../Utilities/ChatBotSearchArea";

const BehaviouralChatBot = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { chatHistory, isInputDisable, ischatBotCompleted, currentQuestion, currentQuestionIndex } = useSelector((state) => state?.behaviouralChatBotSlice);
    const { getProfileDetails, actionType } = useSelector((state) => state?.utilityCallFunctionSlice);
    const profilePicture = getProfilePictureByGender(getProfileDetails);

    useEffect(() => {
        dispatch(getPatientDetailsRequest());
        dispatch(getBehaviouralBotQuestionsRequest())
        return () => {
            dispatch(setResetPendingBehaviouralBotRequest())
        }
    }, []);

    const numberRange = _.range(1, 11)
    const numberRangeOptions = numberRange.map(String)

    const handleFormSubmit = (e, selectedNum = null) => {
        // e.preventDefault();
        let inputValue = e?.target?.value || e;
        if (!inputValue.trim()) return; // Do not submit empty input
        let updatedChatHistory = chatHistory.map((obj) => ({
            ...obj,
            question: false,
        })).concat({ user: selectedNum || inputValue });        
        dispatch(setBehaviouralBotInputDisableRequest(true));
        dispatch(setBehaviouralBotChatHistoryRequest(updatedChatHistory))
        dispatch(getBehaviouralBotChatRequest({ currentQuestion, user: selectedNum || inputValue, questionno: currentQuestionIndex + 1 }))
    };


    // const handleFormSubmit = async (e, selectedNum = null) => {
    //     // api integration
    //     await AxiosInstance("application/json")
    //         .post(`/categorizeresponse`, payload)
    //         .then((response) => {
    //             const { statuscode, message } = response.data;
    //             setIsShow(false); //  hide the input
    //             setIsInputShow(false);
    //             setIsLoading(false);
    //             setResponseStatus(statuscode);
    //             if (statuscode === -1 || statuscode === 99) {
    //                 // If statuscode is -1, show Alfred's message and stop
    //                 setConversation((prevConversation) => [
    //                     ...prevConversation,
    //                     { alfred: message },
    //                 ]);
    //             } else if (statuscode === 1) {
    //                 // If statuscode is 1, show the next question
    //                 setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //             } else if ((currentQuestionIndex + 1) % 3 === 0) {
    //                 // If the user reaches every 3rd question, show Alfred's message and the next question
    //                 setConversation((prevConversation) => [
    //                     ...prevConversation,
    //                     { alfred: message },
    //                 ]);
    //                 setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //             } else {
    //                 // Otherwise, just move to the next question
    //                 setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    //             }
    //         })
    //         .catch((er) => {
    //             toast(er?.response?.data?.message || er?.message, {
    //                 position: "top-right",
    //                 type: "error",
    //             });
    //         });
    // };

    console.log("ChatBotMsgInterfaceChatBotMsgInterface", chatHistory)

    return (
        <React.Fragment>

            <div className="cs_homepage mt-0 h-100">
                <div className="w-50 al_chatbotauth p-0">
                    <div className="d-flex flex-column">
                        <div className="flex-grow-1 mt-3">
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
                                        <div>
                                            Welcome to the Patient Personality Questionnaire, my name
                                            Alfred and I'll be leading you through a series of 17
                                            behavioral questions! <br /> <br /> Please rate your
                                            agreement following questions on a scale of 1 to 10.
                                            'Strongly Disagree' correponds to a 1, while 'Strongly
                                            Agree' would be a 10.
                                            <br />
                                            <br />
                                            Let's get started!
                                        </div>
                                    </Col>
                                </Row>

                                {/* message interface */}
                                {chatHistory?.length > 0 && chatHistory?.map((x, index) => {
                                    return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index, profilePicture, getProfileDetails, isInputDisable, actionType, isBVBot: true }} />
                                })}
                            </div>
                        </div>

                        {/* message input field */}
                        <div className="cs_mainsearch my-3">
                            {/* Once it reach the end of lenght it will show "Go to Dashboard" button or else it show input with condition based ICONS */}
                            {ischatBotCompleted ? (
                                <div className="mt-3 d-flex align-items-center justify-content-center">
                                    <button
                                        type="submit"
                                        className="al_greybgbutton"
                                        onClick={() => navigate("/home")}
                                    >
                                        Go to Dashboard
                                    </button>
                                </div>
                            ) : (
                                <div className="cs_mainsearch">
                                    <ChatBotSearchArea
                                        handleFormSubmit={handleFormSubmit}
                                        isInputDisable={isInputDisable}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BehaviouralChatBot;