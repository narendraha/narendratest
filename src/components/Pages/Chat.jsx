import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Col, Row } from "reactstrap";
import { AxiosInstance } from "../../_mock/utilities";
import { pageTitle } from "../../helpers/PageTitle";
import Chatbot from "../../images/alfredicon.svg";
import ChatFemaleuser from "../../images/femaleuserImg.jpg";
import ChatMaleuser from "../../images/userprofile.jpg";
import Loading from "../InnerApp/LoadingComponent";
export default function Chat() {
  pageTitle("Behavioural chat");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isInputShow, setIsInputShow] = useState(false);
  const [responseStatus, setResponseStatus] = useState(0);
  const messagesEndRef = useRef(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userValue, setUserValue] = useState("");
  const [conversation, setConversation] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [getProfileDetails, setGetProfileDetails] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  // get questions using useeffect
  useEffect(() => {
    getQuestion();
  }, []);

  const getRandomQuestion = (index) => {
    if (questions?.length > 0 && responseStatus !== 99) {
      const questionSet = questions[index];
      const randomIndex = Math.floor(Math.random() * questionSet?.length);
      setCurrentQuestion(questionSet[randomIndex])
      return questionSet[randomIndex];
    }
  };

  useEffect(() => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { alfred: getRandomQuestion(currentQuestionIndex) },
    ]);
  }, [currentQuestionIndex, questions]);

  // To focus input field
  useEffect(() => { inputRef.current?.focus() })

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getQuestion = async () => {
    setIsFormLoading(true)
    await AxiosInstance("application/json")
      .get("/chatbot_questions")
      .then((response) => {
        if (response && response?.status == 200) {
          setQuestions(response.data?.data);
          setIsFormLoading(false);
          getRandomQuestion(currentQuestionIndex);
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
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [conversation]);

  const handleFormSubmit = async (e) => {
    profileDetails();
    setIsInputShow(true);
    e.preventDefault();
    if (!userValue.trim()) return; // Do not submit empty input
    setConversation((prevConversation) => [
      ...prevConversation,
      { user: userValue },
    ]);
    setUserValue("");

    // show the user entered input value
    setIsLoading(true);

    // request data
    const payload = {
      alfred: currentQuestion,
      user: userValue,
      questionno: currentQuestionIndex + 1,
    };
    // api integration
    await AxiosInstance("application/json")
      .post(`/categorizeresponse`, payload)
      .then((response) => {
        const { statuscode, message } = response.data;
        setIsShow(false); //  hide the input
        setIsInputShow(false);
        setIsLoading(false);
        setResponseStatus(statuscode);
        if (statuscode === -1 || statuscode === 99) {
          // If statuscode is -1, show Alfred's message and stop
          setConversation((prevConversation) => [
            ...prevConversation,
            { alfred: message },
          ]);
        } else if (statuscode === 1) {
          // If statuscode is 1, show the next question
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else if ((currentQuestionIndex + 1) % 3 === 0) {
          // If the user reaches every 3rd question, show Alfred's message and the next question
          setConversation((prevConversation) => [
            ...prevConversation,
            { alfred: message },
          ]);
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          // Otherwise, just move to the next question
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
    setUserValue(value); // update the value of input field with user's typing text
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

  const profilePicture = ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? ChatFemaleuser : ChatMaleuser) : getProfileDetails?.profile_url);
  return (
    <div className="cs_homepage mt-0 h-100">
      {isFormLoading && <Loading />}
      <div className="w-50 al_chatbotauth p-0">
        <div className="d-flex flex-column">
          <div className="flex-grow-1 mt-3">
            <div className="scrolldiv">
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
              {/*   * Loop the question it's stored in array[] and split the based on response
               * again split the structure into "key and value" using Object method called entries
               * it convert into array so here split the param as ([key, value])
               */}
              {/* {conversation.map((conv, index) => (
                <div key={index}>
                  {conv.alfred && (
                    <p>
                      <strong>Alfred:</strong> {conv.alfred}
                    </p>
                  )}
                  {conv.user !== undefined && (
                    <p>
                      <strong>User:</strong> {conv.user}
                    </p>
                  )}
                </div>
              ))} */}
              {Array?.isArray(conversation) &&
                conversation?.length > 0 &&
                conversation?.map((message, index) => (
                  <React.Fragment key={index}>
                    <Row className={"mb-4 al_chatcontent" + (message.user ? " al_usermsg" : "")} key={index}>
                      <div>
                        {message.user ? (
                          <img
                            src={profilePicture}
                            alt="chat user"
                            className="al_chatimg"
                          />
                        ) : message.alfred ? (
                          <img src={Chatbot} alt="Bot" />
                        ) : null}
                      </div>
                      <Col>
                        {message.alfred && (
                          <>
                            <h6 className="mb-0">Alfred:</h6> <div>{message.alfred}</div>
                          </>
                        )}
                        {message.user !== undefined && (
                          <>
                            <h6 className="mb-0 text-capitalize">{message.user ? getProfileDetails?.username : message.user}</h6> <div>{message.user}</div>
                          </>
                        )}
                      </Col>
                    </Row>
                  </React.Fragment>
                ))}
              {isLoading && <div className="al_chatloading"></div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="cs_mainsearch my-3">
            {/* Once it reach the end of lenght it will show "Go to Dashboard" button or else it show input with condition based ICONS */}
            {responseStatus === 99 ? (
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
                <form action="#">
                  <i className="icon_alfred_search h-auto"></i>
                  <input
                    type="text"
                    placeholder="Ask a question"
                    name="message"
                    value={userValue} // input value
                    onChange={handleInputChange} // handle changes
                    disabled={isInputShow} //Disabled once input value is submitted
                    ref={inputRef}
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
                          setUserValue("");
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
                    <i className="icon_alfred_speech h-auto"></i>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
