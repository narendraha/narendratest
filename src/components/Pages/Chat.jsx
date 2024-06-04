import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { AxiosInstance } from "../../_mock/utilities";
import { pageTitle } from "../../helpers/PageTitle";
import Chatbot from "../../images/alfredicon.svg";
import Chatuser from "../../images/usericon.svg";

export default function Chat() {
  pageTitle("Behavioural chat");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isInputShow, setIsInputShow] = useState(false);
  const [questions, setQuestions] = useState([]); // stored the chat history get from API response
  const [newques, setnewqus] = useState("");
  const [newNumber, setNewNumber] = useState(0); //  initial index value of questins
  const messagesEndRef = useRef(null);
  const [jsonData, setJsonData] = useState([]);
  const [responseStatus, setResponseStatus] = useState(0);
  const incrementRef = useRef(0);
  // get questions using useeffect
  useEffect(() => {
    getQuestion();
  }, []);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let randomNumber = Math.floor(Math.random() * 15);

  const newfuc = (index) => {
    if (jsonData.length > 0) {
      setnewqus(jsonData[index][randomNumber]);
      setQuestions((prevHistory) => [
        ...prevHistory,
        { alfred: jsonData[index][randomNumber] },
      ]);
    }
  };

  const getQuestion = async () => {
    await AxiosInstance("application/json")
      .get("/chatbot_questions")
      .then((response) => {
        if (response && response?.status == 200) {
          setJsonData(response.data?.data);
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  useEffect(() => {
    newfuc(incrementRef.current);
  }, [jsonData]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [incrementRef, questions]);

  useEffect(() => {}, [incrementRef, responseStatus]);

  const handleFormSubmit = async (e) => {
    console.log(
      "outside if responseStatus:",
      responseStatus,
      typeof responseStatus
    );
    if (
      responseStatus === 0 ||
      (responseStatus !== -1 && responseStatus !== 99)
    ) {
      incrementRef.current += 1;
    }
    setIsInputShow(true);
    e.preventDefault();
    if (!inputValue.trim()) return; // Do not submit empty input
    // show the user entered input value
    setQuestions((prevHistory) => [...prevHistory, { user: inputValue }]);
    setInputValue(""); // Clear input after submitting
    setIsLoading(true);

    // request data
    let data = {
      alfred: newques,
      user: inputValue,
      questionno: newNumber,
    };
    // api integration
    await AxiosInstance("application/json")
      .post(`/categorizeresponse`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          // hide the send and remove icon
          setIsShow(false);
          //  hide the input
          setIsInputShow(false);
          const responseData = res.data;
          setIsLoading(false);
          setResponseStatus(responseData?.statuscode);
          // here  we will add the result to our history of questions and answers
          // if res status is -1 or index % 3 or res 99 means need to show res msg and also index % 3 measns need to next question
          if (
            responseData.statuscode === -1 ||
            (incrementRef.current > 0 && incrementRef.current % 3 === 0) ||
            responseData.statuscode === 99
          ) {
            setQuestions((prevHistory) => [
              ...prevHistory,
              {
                alfred: responseData?.message,
              },
            ]);
            if (
              incrementRef.current % 3 === 0 ||
              responseData.statuscode === 99
            ) {
              newfuc(incrementRef.current);
            }
          } else {
            newfuc(incrementRef.current);
          }
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  const handleInputChange = (e) => {
    let { value } = e.target; // e.target value destructure
    value !== "" &&
      setIsShow(true); /* Show send button when user enter something */
    setInputValue(value); // update the value of input field with user's typing text
  };
  return (
    <div className="cs_homepage">
      <div className="w-50 al_chatbotauth">
        <div className="d-flex flex-column">
          <div className="flex-grow-1">
            <div className="scrolldiv">
              {/* Chat need to be rendered here */}
              {/* Welcome message */}
              <Row className="mb-4 al_chatcontent">
                <div>
                  <img src={Chatbot} alt="Bot" />
                </div>
                <Col>
                  <h6 className="mb-0">Alfred</h6>
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
              {/*
               * Loop the question it's stored in array[] and split the based on response
               * again split the structure into "key and value" using Object method called entries
               * it convert into array so here split the param as ([key, value])
               */}
              {Array?.isArray(questions) &&
                questions?.length > 0 &&
                questions?.map((message, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(message).map(([key, value]) => (
                      <Row className="mb-4 al_chatcontent" key={key}>
                        <div>
                          {key === "user" ? (
                            <img src={Chatuser} alt="chat user" />
                          ) : key === "alfred" ? (
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
              {isLoading && <div className="al_chatloading"></div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="cs_mainsearch mb-2">
            {/* Once it reach the end of lenght it will show "Go to Dashboard" button or else it show input with condition based ICONS */}
            {newNumber > Object.keys(jsonData).length ? (
              <div className="mt-3 d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="al_greybgbutton"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <form action="#">
                <i
                  className="icon_alfred_search h-auto"
                ></i>
                <input
                  type="text"
                  placeholder="Ask a question"
                  name="message"
                  value={inputValue} // input value
                  onChange={handleInputChange} // handle changes
                  disabled={isInputShow} //Disabled once input value is submitted
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent default form submission behavior
                      handleFormSubmit(e); // Call handleFormSubmit when Enter is pressed
                    }
                  }}
                />
                {isShow ? (
                  <>
                    <i
                      className="icon_alfred_close"
                      onClick={(e) => {
                        setInputValue("");
                      }}
                    ></i>
                    <i
                      className="icon_alfred_sendmsg"
                      style={{
                        height: "auto",
                        pointerEvents: isInputShow ? "none" : "",
                      }}
                      onClick={(e) => handleFormSubmit(e)}
                    ></i>
                  </>
                ) : (
                  <i
                    className="icon_alfred_speech h-auto"
                  ></i>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
