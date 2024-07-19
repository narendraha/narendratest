import React, { useEffect, useRef, useState } from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';
import { pageTitle } from "../../_mock/helperIndex";
import { AxiosInstance } from "../../_mock/utilities";
import Chatbot from "../../images/alfredicon.svg";
import homebotimg from '../../images/doctorbot.png';
import homeleftmobile from '../../images/homeleftmobile.gif';
import homeright from '../../images/homeright.gif';
import Chatuser from "../../images/usericon.svg";

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


  const [responseStream, setResponseStream] = useState("");

  const handleFormSubmit = async (e) => {
    setIsInputShow(true);
    e.preventDefault();
    if (!inputValue.trim()) return; // Do not submit empty input
    setChatHistory((prevHistory) => [...prevHistory, { content: inputValue, role: 'User' }]);
    setInputValue(""); // Clear input after submitting
    setIsLoading(true);
    setIsShow(true);
    let data = {
      id: randomId,
      messages: [{ content: inputValue, role: 'User' }],
    };
    // api integration
    const apiUrl = 'https://app-backend-ttztsypz4y5oi.azurewebsites.net/chat/stream';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`
    };

    try {
      const responseStream = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });

      if (responseStream) {
        const reader = responseStream.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let tempStr = '';
        let res = '';

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = decoder.decode(value, { stream: true });
          tempStr += chunk;
          // Split by newline and parse JSON objects
          const lines = tempStr.split('\n');
          for (let i = 0; i < lines.length - 1; i++) {
            if (lines[i].trim()) {
              const json = JSON.parse(lines[i]);
              const content = json?.delta?.content || '';
              res += content?.trim() + ' '
              setResponseStream(prev => prev + content);
              setIsLoading(false);
            }
          }
          // Keep the last line if it is incomplete
          tempStr = lines[lines.length - 1];
        }
        await setChatHistory((prevHistory) => [
          ...prevHistory,
          { content: res, role: 'Alfred' }
        ]);
        setResponseStream('')
      }
    } catch (error) {
      console.error('Error streaming response:', error);
    } finally {
      setIsLoading(false);
      setIsInputShow(false)
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

  const getIsUser = (key) => {
    return key?.role === 'User'
  }
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
                    <Row className={"mb-4 al_chatcontent" + (getIsUser(message) ? " al_usermsg" : "")}>
                      <div>
                        {getIsUser(message) ? (<>
                          <img src={Chatuser} alt="chat user" id="userimagehomeed" />
                          <UncontrolledTooltip
                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                            placement='bottom' target="userimagehomeed">
                            User
                          </UncontrolledTooltip>
                        </>) : !getIsUser(message) ? (<>
                          <img src={Chatbot} alt="Bot" id="botimagehomeed" />
                          <UncontrolledTooltip
                            modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                            placement='bottom' target="botimagehomeed">
                            Alfred
                          </UncontrolledTooltip>
                        </>) : null}
                      </div>
                      <Col>
                        <div>{message?.content}</div>
                        {/* <EducationalBotHTMLcontent props={responseStream} /> */}
                        {!getIsUser(message) && (
                          <p className="mb-0 mt-2 al_chatfeedbackactions">
                            <i className={"icon_alfred_like pointer me-3 " + (selectedIcons[index]?.reaction === 'like' ? 'like' : '')} onClick={() => handleAction(index, 'like', message?.content)}></i>
                            <i className={"icon_alfred_dislike pointer me-3 " + (selectedIcons[index]?.reaction === 'dislike' ? 'text-danger mt-0' : '')} onClick={() => handleAction(index, 'dislike', message?.content)}></i>
                          </p>
                        )}
                      </Col>
                    </Row>
                  </React.Fragment>))}

                {responseStream && <Row className={"mb-4 al_chatcontent"}>
                  <div>
                    <img
                      src={Chatbot}
                      alt="Bot"
                      id="botimagehomeed"
                    />
                    <UncontrolledTooltip
                      modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                      placement='bottom' target={"botimagehomeed"}>
                      Alfred
                    </UncontrolledTooltip>
                  </div>
                  <Col>
                    <div>{responseStream}</div>
                  </Col>
                </Row>}
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

            {/* <div className="al_note text-end pt-3">
              <strong>Disclaimer</strong>: Not a medical advice <br />
              {isShow && (
                <p>
                  Your <strong>navigator</strong> and{" "}
                  <strong>health coach</strong>
                </p>
              )}
            </div> */}
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
      )
      }
    </div >
  );
}
