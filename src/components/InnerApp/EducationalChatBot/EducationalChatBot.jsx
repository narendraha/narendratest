import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Row, UncontrolledTooltip } from "reactstrap";
import { AxiosInstance } from "../../../_mock/utilities";
import Chatbot from "../../../images/alfredicon.svg";
import ChatFemaleuser from "../../../images/femaleuserImg.jpg";
import ChatMaleuser from "../../../images/userprofile.jpg";
import EducationalBotHTMLcontent from "../../Utilities/EducationalBotHTMLcontent";

export default function EducationalChatBot(props) {
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]); // stored the chat history get from API response
    const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
    const [isLoading, setIsLoading] = useState(false); // loading status of api call
    const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
    const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show Send button if input is not empty else Hide it.
    const [selectedIcons, setSelectedIcons] = useState([]); // State to track selected icons
    const [isInputShow, setIsInputShow] = useState(false);
    const [getProfileDetails, setGetProfileDetails] = useState([]);

    useEffect(() => inputFocusAndScroll());
    useEffect(() => { profileDetails() }, [])

    const inputFocusAndScroll = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus()
    };

    const handleFormSubmit = async (e) => {
        profileDetails()
        setIsInputShow(true);
        e.preventDefault();
        if (!inputValue.trim()) return; // Do not submit empty input
        setChatHistory((prevHistory) => [...prevHistory, { user: inputValue }]);
        setInputValue(""); // Clear input after submitting
        setIsLoading(true);
        let data = {
            message: inputValue,
        };
        // api integration
        await AxiosInstance("application/json")
            .post(`/educational_bot`, data)
            .then((res) => {
                if (res && res.data && res.status === 200) {
                    setIsShow(true);
                    setIsInputShow(false);
                    setIsLoading(false);
                    if (res.data.statuscode === 200) {
                        const responseData = res.data.data;
                        // Convert responseData to an array of objects
                        // setIsLoading(false);
                        setChatHistory((prevHistory) => [
                            ...prevHistory,
                            {
                                alfred: responseData?.alfred
                            }
                        ]); /* Add new item to end of array */
                    } else {
                        toast(res?.data?.message, {
                            position: "top-right",
                            type: "error",
                        });
                    }
                }
            })
            .catch((er) => { });
    };

    const handleInputChange = (e) => {
        let { value } = e.target;
        value !== ""
            ? setIsShowSendBtn(true)
            : setIsShowSendBtn(
                false
            ); /* Show send button when user enter something */
        setInputValue(value); // update the value of input field with user's typing text
    };

    const handleAction = (messageId, iconType, alfredValue, userValue) => {
        setSelectedIcons(prevIcons => ({
            ...prevIcons,
            [messageId]: { reaction: iconType, alfred: alfredValue, User: chatHistory?.find((element, index) => index === messageId - 1)?.User },
        }));
        let reqObj = {
            message: alfredValue,
            preference: iconType === "like"
        }
        AxiosInstance("application/json")
            .post(`/preference_chat`, reqObj)
            .then((res) => {
                if (res && res.data && res.status === 200) {
                    if (res.data.statuscode === 200) {
                        setIsLoading(false);
                    } else {
                    }
                }
            })
            .catch((er) => {
            });
    };

    // To get user details
    const profileDetails = async () => {
        await AxiosInstance("application/json")
            .get("/userdetails")
            .then((res) => {
                const responseData = res.data?.data;
                setGetProfileDetails(responseData);
            })
            .catch((er) => { });
    };

    let getIsUser = (key) => {
        return key === "user"
    }
    const profilePicture = ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? ChatFemaleuser : ChatMaleuser) : getProfileDetails?.profile_url);
    return (
        <>
            <div className="al_chatbot">
                <Card>
                    <CardBody className="d-flex flex-column">
                        <Button
                            id="homechatclose"
                            type="button"
                            onClick={() => props.setBotIsOpen(!props.botisOpen)}
                            className="mt-2"
                        >
                            <i className="icon_alfred_close"></i>
                        </Button>
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
                                        {/* <h6 className="mb-0">Alfred</h6> */}
                                        <div>Hello, I am Alfred! How can i assist you today?</div>
                                    </Col>
                                </Row>
                                {chatHistory.map((message, index) => (
                                    <React.Fragment key={index}>
                                        {Object.entries(message).map(([key, value]) => (
                                            <Row className={"mb-4 al_chatcontent" + (key === "user" ? " al_usermsg" : "")} key={key}>
                                                {["user", "alfred"]?.includes(key) ?
                                                    <div>
                                                        <img
                                                            src={getIsUser(key) ? profilePicture : Chatbot}
                                                            alt={getIsUser(key) ? "chat user" : "Bot"}
                                                            id={getIsUser(key) ? "userimageed" : "botimageed"}
                                                        />
                                                        <UncontrolledTooltip
                                                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                                                            placement='bottom' target={getIsUser(key) ? "userimageed" : "botimageed"}>
                                                            {getIsUser ? (message.user ? getProfileDetails?.username : message.user) : "Alfred"}
                                                        </UncontrolledTooltip>
                                                    </div> : null}
                                                <Col>
                                                    {key === "user" ?
                                                        <div>{value}</div> :
                                                        <EducationalBotHTMLcontent props={value} />}
                                                    {key === "alfred" && (
                                                        <p className="mb-0 mt-1">
                                                            <Icon
                                                                icon="iconamoon:like-light"
                                                                width="1.5em"
                                                                height="1.5em"
                                                                onClick={() => handleAction(index, 'like', value)} // Handle like action
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    color: selectedIcons[index]?.reaction === 'like' ? 'green' : '', // Apply green color if selected
                                                                }}
                                                            />
                                                            <Icon
                                                                icon="iconamoon:dislike-light"
                                                                width="1.5em"
                                                                height="1.5em"
                                                                className="mx-2"
                                                                onClick={() => handleAction(index, 'dislike', value)} // Handle dislike action
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    color: selectedIcons[index]?.reaction === 'dislike' ? 'red' : '', // Apply red color if selected
                                                                }}
                                                            />
                                                        </p>
                                                    )}
                                                </Col>
                                            </Row>
                                        ))}
                                    </React.Fragment>
                                ))}
                                {(isLoading || (isLoading && !isShow)) && (
                                    <div className="al_chatloading"></div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div
                            className="cs_mainsearch al_chatfooter p-3"
                            style={{ backgroundColor: "#E2E5ED" }}
                        >
                            <form action="#">
                                <i className="icon_alfred_search h-auto"></i>
                                <input
                                    type="text"
                                    placeholder="Ask a question"
                                    name="message"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    disabled={isInputShow} //Disabled once input value is submitted
                                    ref={inputRef}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault(); // Prevent default form submission behavior
                                            handleFormSubmit(e); // Call handleFormSubmit when Enter is pressed
                                        }
                                    }}
                                />
                                {isShowSendBtn ? (
                                    <>
                                        {isShow && (
                                            <i
                                                className="icon_alfred_close"
                                                onClick={(e) => {
                                                    setInputValue("");
                                                }}
                                            ></i>
                                        )}
                                        <i
                                            className="icon_alfred_sendmsg h-auto"
                                            onClick={(e) => handleFormSubmit(e)}
                                        ></i>
                                    </>
                                ) : (
                                    <i className="icon_alfred_speech h-auto"></i>
                                )}
                            </form>
                            <div className="al_note pt-1">
                                Disclaimer: Not a medical advice
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
