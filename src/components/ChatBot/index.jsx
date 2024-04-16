import React, { useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { AxiosInstance } from "../../_mock/utilities";
import Chatuser from "../../images/usericon.svg";
import Chatbot from "../../images/alfredicon.svg";
import { Row, Col } from "reactstrap";

export default function ChatBot(props) {
  const [chatHistory, setChatHistory] = useState([]); // stored the chat history get from API response
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isShowSendBtn, setIsShowSendBtn] = useState(false); // Show Send button if input is not empty else Hide it.

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Do not submit empty input
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
              responseData,
            ]); /* Add new item to end of array */
          } else {
          }
        }
      })
      .catch((er) => {
        console.log(er);
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
                    <div>Hello, I am Alfred! How can i Assist you today?</div>
                  </Col>
                </Row>
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
                <i
                  className="icon_alfred_search"
                  style={{ height: "auto" }}
                ></i>
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
                      className="icon_alfred_sendmsg"
                      style={{ height: "auto" }}
                      onClick={(e) => handleFormSubmit(e)}
                    ></i>
                  </>
                ) : (
                  <i
                    className="icon_alfred_speech"
                    style={{ height: "auto" }}
                  ></i>
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
