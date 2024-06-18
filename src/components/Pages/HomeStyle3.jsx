import React, { useEffect, useRef, useState } from "react";
import { pageTitle } from "../../helpers/PageTitle";
import { AxiosInstance } from "../../_mock/utilities";
import Chatuser from "../../images/usericon.svg";
import Chatbot from "../../images/alfredicon.svg";
import { Row, Col } from "reactstrap";
import homebotimg from '../../images/doctorbot.png';
import homeleftmobile from '../../images/homeleftmobile.gif';
import homeright from '../../images/homeright.gif';
import { Icon } from "@iconify/react";
import { v4 as uuidv4 } from 'uuid';

export default function HomeStyle3() {
  pageTitle("Home");
  const [chatHistory, setChatHistory] = useState([]); // stored the chat history get from API response
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show Send button if input is not empty else Hide it.
  const [selectedIcons, setSelectedIcons] = useState([]); // State to track selected icons
  const [randomId, setRandomId] = useState(null);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [chatHistory]);

  useEffect(() => {
    setRandomId(uuidv4().slice(0, 5))
  }, [randomId === null])

  const handleAction = (messageId, iconType, alfredValue, userValue) => {
    setSelectedIcons(prevIcons => ({
      ...prevIcons,
      [messageId]: { reaction: iconType, alfred: alfredValue, User: chatHistory?.find((element, index) => index === messageId - 1)?.User },
    }));

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Do not submit empty input
    setChatHistory((prevHistory) => [...prevHistory, { User: inputValue }]);
    setInputValue(""); // Clear input after submitting
    setIsLoading(true);
    let data = {
      id: randomId,
      message: inputValue,
    };
    // api integration
    await AxiosInstance("application/json")
      .post(`/history`, data)
      .then((res) => {
        console.log("ask_gpt====>", { data, res })
        if (res && res.data && res.status === 200) {
          setIsShow(true);
          if (res.data.statuscode === 200) {
            const responseData = res.data.data;
            // Convert responseData to an array of objects
            setIsLoading(false);
            setChatHistory((prevHistory) => [
              ...prevHistory,
              { Alfred: responseData?.alfred },
            ]); /* Add new item to end of array */
          } else {
          }
        }
      })
      .catch((er) => {
      });
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

  return (
    <div className="cs_homepage">
      {isShow ? (
        <div className="w-50 al_chatbotauth">
          <div className="d-flex flex-column">
            <div className="flex-grow-1">
              <div className="scrolldiv">
                {/* Chat need to be rendered here */}
                {chatHistory.map((message, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(message).map(([key, value]) => (
                      <Row className="mb-4 al_chatcontent" key={key}>
                        <div>
                          {key === "User" ? (
                            <img src={Chatuser} alt="chat user" />
                          ) : key === "Alfred" ? (
                            <img src={Chatbot} alt="Bot" />
                          ) : null}
                        </div>
                        <Col>
                          <h6 className="mb-0">{key}</h6>
                          <div>{value}</div>
                          {key === "Alfred" && (
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
                {isLoading && <div className="al_chatloading"></div>}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="cs_mainsearch mb-2">
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
            </div>
          </div>
        </div>
      ) : (
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
            <div className="cs_mainsearch">
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
            </div>

            <div className="al_note text-end pt-3">
              <strong>Disclaimer</strong>: Not a medical advice <br />
              {isShow && (
                <p>
                  Your <strong>navigator</strong> and{" "}
                  <strong>health coach</strong>
                </p>
              )}
            </div>
            {isLoading && !isShow && <div className="al_chatloading"></div>}

          </Col>
        </Row>
      )}
    </div>
  );
}
