import React, { useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { AxiosInstance } from "../../_mock/utilities";
import Chatuser from "../../images/userprofile.jpg";
import Chatbot from "../../images/alfredicon.svg";
import { Row, Col } from "reactstrap";
import { getDecodedTokenFromLocalStorage } from "../../_mock/jwtUtils";
import { Icon } from "@iconify/react";

export default function ChatBot(props) {
  const [chatHistory, setChatHistory] = useState([]); // stored the chat history get from API response
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show Send button if input is not empty else Hide it.
  const [selectedIcons, setSelectedIcons] = useState([]); // State to track selected icons
  const decodedToken = getDecodedTokenFromLocalStorage();

  const handleFormSubmit = async (e) => {
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
      .post(`/ask_gpt`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          setIsShow(true);
          if (res.data.statuscode === 200) {
            const responseData = res.data.data;
            // Convert responseData to an array of objects
            setIsLoading(false);
            setChatHistory((prevHistory) => [
              ...prevHistory,
              { alfred: responseData?.alfred },
            ]); /* Add new item to end of array */
          } else {
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
        console.log("preference_chat_response=>", { reqObj, res })
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

  return (
    <>
      <div className="al_chatbot">
        <Card>
          <CardBody className="d-flex flex-column">
            <Button
              id="homechatclose"
              type="button"
              onClick={() => props.setBotIsOpen(!props.botisOpen)}
            >
              <i className="icon_alfred_close"></i>
            </Button>
            <div className="flex-grow-1">
              <div className="scrolldiv">
                <Row className="mb-4 al_chatcontent">
                  <div>
                    <img src={Chatbot} alt="Bot" />
                  </div>
                  <Col>
                    <h6 className="mb-0">Alfred</h6>
                    <div>Hello, I am Alfred! How can i assist you today?</div>
                  </Col>
                </Row>
                {chatHistory.map((message, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(message).map(([key, value]) => (
                      <Row className="mb-4 al_chatcontent" key={key}>
                        {/* <div>
                          {key === "user" ? (
                            <img
                              src={Chatuser}
                              alt="chat user"
                              className="al_chatimg"
                            />
                          ) : key === "alfred" ? (
                            <img src={Chatbot} alt="Bot" />
                          ) : null}
                        </div> */}
                        <div>
                          {key === "user" ? (
                            <img src={Chatuser} alt="chat user" />
                          ) : key === "alfred" ? (
                            <img src={Chatbot} alt="Bot" />
                          ) : null}
                        </div>
                        <Col>
                          <h6 className="mb-0">
                            {key === "user" ? decodedToken?.username : key}
                          </h6>
                          <div>{value}</div>
                          {key === "alfred" && (
                            <>
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
                            </>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </React.Fragment>
                ))}
                {(isLoading || (isLoading && !isShow)) && (
                  <div className="al_chatloading"></div>
                )}
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
