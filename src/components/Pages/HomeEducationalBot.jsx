import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';
import { pageTitle } from "../../_mock/helperIndex";
import { AxiosInstance } from "../../_mock/utilities";
import Chatbot from "../../images/alfredicon.svg";
import homebotimg from '../../images/doctorbot.png';
import homeleftmobile from '../../images/homeleftmobile.gif';
import homeright from '../../images/homeright.gif';
import Chatuser from "../../images/usericon.svg";
import EducationalBotHTMLcontent from "../Utilities/EducationalBotHTMLcontent";

export default function HomeEducationalBot() {
  pageTitle("HelloAlfred - Medical and Healthcare App");
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]); // stored the chat history get from API response
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show Send button if input is not empty else Hide it.
  const [selectedIcons, setSelectedIcons] = useState([]); // State to track selected icons
  const [randomId, setRandomId] = useState(null);
  const [isInputShow, setIsInputShow] = useState(false);

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

  // To focus input field
  useEffect(() => { inputRef.current?.focus() })

  const handleAction = (messageId, iconType, alfredValue, userValue) => {
    setSelectedIcons(prevIcons => ({
      ...prevIcons,
      [messageId]: { reaction: iconType, alfred: alfredValue, User: chatHistory?.find((element, index) => index === messageId - 1)?.User },
    }));
    let reqObj = {
      message: alfredValue,
      preference: iconType === "like"
    }
    // like dislike
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


  // const handleFormSubmit = async (e) => {
  //   setIsInputShow(true);
  //   e.preventDefault();
  //   if (!inputValue.trim()) return; // Do not submit empty input
  //   setChatHistory((prevHistory) => [...prevHistory, { User: inputValue }]);
  //   setInputValue(""); // Clear input after submitting
  //   setIsLoading(true);
  //   setIsShow(true);
  //   let data = {
  //     id: randomId,
  //     message: inputValue,
  //   };
  //   // api integration
  //   await AxiosInstance("application/json")
  //     // .post(`/history`, data)
  //     .post(`/education_bot_home`, data)
  //     .then((res) => {
  //       if (res && res.data && res.status === 200) {
  //         setIsInputShow(false);
  //         // setIsShow(true);
  //         if (res.data.statuscode === 200) {
  //           const responseData = res.data.data;
  //           // Convert responseData to an array of objects
  //           setIsLoading(false);
  //           setChatHistory((prevHistory) => [
  //             ...prevHistory,
  //             { Alfred: responseData?.alfred },
  //           ]); /* Add new item to end of array */
  //         } else {
  //         }
  //       }
  //     })
  //     .catch((er) => {
  //     });
  // };

  const [loadingIndex, setLoadingIndex] = useState(null); // 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Prevent empty input submission
    setIsInputShow(true);
    setChatHistory((prevHistory) => [...prevHistory, { content: inputValue, role: 'User' }]);
    setInputValue(''); // Clear input after submitting
    setIsLoading(true);
    setIsShow(true);

    const currentMessageIndex = chatHistory.length;
    setLoadingIndex(currentMessageIndex); // Set the loading index to the current message index

    const data = {
      id: '1234-9876-54321',
      message: inputValue,
    };
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
          setChatHistory((prevHistory) => {
            // Create a new message object with the received chunk
            const updatedHistory = [...prevHistory];
            const lastMessage = updatedHistory[updatedHistory.length - 1];
            // Check if the last message is from 'Alfred' and update it
            if (lastMessage && lastMessage.role === 'Alfred') {
              updatedHistory[updatedHistory.length - 1].content += chunk;
            } else {
              updatedHistory.push({ content: chunk, role: 'Alfred' });
            }
            return updatedHistory;
          });
        }
      }
    } catch (error) {
      console.error('Error streaming response:', error);
    } finally {
      setIsLoading(false);
      setIsInputShow(false);
      setLoadingIndex(null);
    }
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

  let getIsUser = (key) => {
    return key === "User"
  }

  console.log("chatHistory", chatHistory)

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
                    {/* {Object.entries(message).map(([key, value]) => ( */}
                    <Row className={"mb-4 al_chatcontent" + (message?.role === "User" ? " al_usermsg" : "")} key={message?.role}>
                      {["User", "Alfred"]?.includes(message?.role) ? <div>
                        <img
                          src={getIsUser(message?.role) ? Chatuser : Chatbot}
                          alt={getIsUser(message?.role) ? "chat user" : "Bot"}
                          id={getIsUser(message?.role) ? "userimagehomeed" : "botimagehomeed"}
                        />
                        <UncontrolledTooltip
                          modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                          placement='bottom' target={getIsUser(message?.role) ? "userimagehomeed" : "botimagehomeed"}>
                          {getIsUser(message?.role) ? "User" : "Alfred"}
                        </UncontrolledTooltip>
                      </div> : null}
                      <Col>
                        {console.log("loadingIndexloadingIndex", loadingIndex, index)}
                        {message?.role === "User" ?
                          <div>{message.content}</div> :
                          // <div><EducationalBotHTMLcontent props={message.content} />{loadingIndex === index && <div key={index} className="al_chatloading my-1"></div>}</div>}
                        <div><EducationalBotHTMLcontent props={message.content} /></div>}
                        {message?.role === "Alfred" && (
                          <p className="mb-0 mt-1">
                            <Icon
                              icon="iconamoon:like-light"
                              width="1.5em"
                              height="1.5em"
                              onClick={() => handleAction(index, 'like', message.content)} // Handle like action
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
                              onClick={() => handleAction(index, 'dislike', message.content)} // Handle dislike action
                              style={{
                                cursor: 'pointer',
                                color: selectedIcons[index]?.reaction === 'dislike' ? 'red' : '', // Apply red color if selected
                              }}
                            />
                          </p>
                        )}
                      </Col>
                    </Row>
                    {/* ))} */}
                  </React.Fragment>
                ))}
                {isLoading && <Row className="mb-4 al_chatcontent">
                  <div>
                    <img src={Chatbot} alt="Bot" id="botimageed" />
                  </div>
                  <Col>
                    <div>
                      <div className="al_chatloading my-1"></div>
                    </div>
                  </Col>
                </Row>}
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
            {isLoading && !isShow && <Row className="mb-4 al_chatcontent">
              <div>
                <img src={Chatbot} alt="Bot" id="botimageed" />
              </div>
              <Col>
                <div>
                  <div className="al_chatloading my-1"></div>
                </div>
              </Col>
            </Row>}
          </Col>
        </Row>
      )}
    </div>
  );
}
