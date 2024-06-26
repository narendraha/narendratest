import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import Select from "react-select";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { allowsOnlyNumeric } from "../../_mock/RegularExp";
import { AxiosInstance } from "../../_mock/utilities";
import { pageTitle } from "../../helpers/PageTitle";
import Chatbot from "../../images/alfredicon.svg";
import ChatFemaleuser from "../../images/femaleuserImg.jpg";
import incompleteprofile from "../../images/incompleteprofile.png";
import ChatMaleuser from "../../images/userprofile.jpg";
import Loading from "../InnerApp/LoadingComponent";
import ModalView from "../InnerApp/MainLayout/ModalView";
import { getProfileCmpDetails } from '../../_mock/helperIndex';

export default function HistoryChatBot() {
  pageTitle("History Chat Bot");
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isInputShow, setIsInputShow] = useState(false);
  const [questions, setQuestions] = useState([]); // stored the chat history get from API response
  // const [newNumber, setNewNumber] = useState(0); //  initial index value of questins
  const messagesEndRef = useRef(null);
  const [responseStatus, setResponseStatus] = useState("");
  const incrementRef = useRef(0);
  const [questionDetails, setQuestionDetails] = useState(null);
  const [getProfileDetails, setGetProfileDetails] = useState([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [profileCmpModalProps, setProfileCmpModalProps] = useState("");

  // form tab
  //   toggle button
  const [isChatOneActive, setIsChatOneActive] = useState(true);
  const [getChatQus, setGetChatQus] = useState([]);
  const handleChatToggle = (chatOneActive) => {
    if (chatOneActive !== isChatOneActive) {
      setIsChatOneActive(chatOneActive);
    }
  };
  const initialValues = {};
  getChatQus?.forEach((field) => {
    initialValues[field.question_key] = "";
  });

  const fetchProfileComplitionDetails = async () => {
    const result = await getProfileCmpDetails('historychat');
    setProfileCmpModalProps(result);
  };

  useEffect(() => {
    fetchProfileComplitionDetails();
  }, []);

  let { redirectionPath, isModalVisible, modalMessage, navigationLink } = profileCmpModalProps;

  // get questions using useeffect
  useEffect(() => {
    if (navigationLink && navigationLink !== "") {
      setIsFormLoading(true);
      setQuestions([]);
      setTimeout(() => {
        setIsLoading(false);
        getHistoryBotQues();
        setIsInputShow(false);
      }, 1000);
    }
  }, [isChatOneActive, navigationLink]);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // let randomNumber = Math.floor(Math.random() * 15);

  const newfuc = (index) => {
    if (getChatQus?.length > 0) {
      const newQuestion = getChatQus[index]["description"];

      // Check if the question already exists in Questions
      const questionExists = questions.some(
        (item) => item.alfred === newQuestion
      );
      if (!questionExists) {
        setQuestions((prevHistory) => [
          ...prevHistory,
          { alfred: newQuestion },
        ]);
      }
    }
  };

  useEffect(() => {
    // newfuc(incrementRef.current);
  }, [getChatQus]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [incrementRef, questions]);

  useEffect(() => { }, [incrementRef, responseStatus]);

  // To focus input field
  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleFormSubmit = async (e) => {
    profileDetails();
    console.log(
      "outside if responseStatus:",
      responseStatus,
      typeof responseStatus
    );
    // if (
    //   responseStatus === 0 ||
    //   (responseStatus !== -1 && responseStatus !== 99)
    // ) {
    //   incrementRef.current += 1;
    // }
    setIsInputShow(true);
    e.preventDefault();
    if (!inputValue.trim()) return; // Do not submit empty input
    // show the user entered input value
    setQuestions((prevChat) => [
      ...prevChat,
      { sender: "user", text: inputValue },
    ]);
    setInputValue(""); // Clear input after submitting
    setIsLoading(true);

    const payload = {
      question: questionDetails?.description,
      user_message: inputValue,
      question_key: questionDetails?.question_key,
      main_type: questionDetails?.main_type,
      ans_categ: questionDetails?.ans_category,
    };
    // setTimeout(() => {
    //     setQuestions((prevHistory) => [
    //         ...prevHistory,
    //         {
    //           alfred: {
    //             //   questions: questions[incrementRef.current]?.alfred,
    //                 "description": "second question?",
    //                 "user_message": inputValue,
    //                 "question_key": questions[incrementRef.current]?.alfred["question_key"],
    //                 "main_type": questions[incrementRef.current]?.alfred["main_type"],
    //                 "ans_categ": questions[incrementRef.current]?.alfred["ans_category"]
    //             }
    //         },
    //       ]);
    // }, 5000);
    // api integration
    await AxiosInstance("application/json")
      .post(`/history_answer`, payload)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          // hide the send and remove icon
          setIsShow(false);
          //  hide the input
          setIsInputShow(false);
          const responseData = res.data;
          setIsLoading(false);
          //   setResponseStatus(responseData?.status_code);
          // here  we will add the result to our history of questions and answers
          // if res status is -1 or index % 3 or res 99 means need to show res msg and also index % 3 measns need to next question

          if (responseData.statuscode === 99) {
            setResponseStatus(res.data?.message);
          } else {
            if (res.data?.data) {
              setQuestions((prevChat) => [
                ...prevChat,
                // ...(res.data?.message !== ""
                //   ? [{ sender: "alfred", text: res.data.message }]
                //   : []),
                // { sender: "alfred", text: res.data?.data?.description },
                ...[
                  {
                    sender: "alfred",
                    text:
                      res.data?.message !== ""
                        ? res.data.message?.concat(
                          "\n" + res.data?.data?.description
                        )
                        : res.data?.data?.description,
                  },
                ],
              ]);
            }
          }

          // Update the question details with the new question from the response
          setQuestionDetails(res.data?.data);
          //   setQuestions((prevHistory) => [
          //     ...prevHistory,
          //     {
          //       alfred: responseData?.data,
          //     },
          //   ]);
          //   incrementRef.current += 2;
          //   if (
          //     responseData.status_code === -1 ||
          //     responseData.status_code === 99
          //   ) {
          //     setQuestions((prevHistory) => [
          //       ...prevHistory,
          //       {
          //         alfred: responseData?.message,
          //       },
          //     ]);
          //   } else {
          //     incrementRef.current += 1;
          //     newfuc(incrementRef.current);
          //   }
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

  // Form tab handled here
  const getHistoryBotQues = async () => {
    setIsFormLoading(true);
    await AxiosInstance("application/json")
      .get("/initial_question")
      .then((response) => {
        if (response && response?.status == 200) {
          setIsFormLoading(false);
          if (response.data.statuscode === 200) {
            setQuestionDetails(response.data.data);
            setQuestions((prevChat) => [
              ...prevChat,
              { sender: "alfred", text: response.data?.data?.description },
            ]);
          } else {
            if (response.data.statuscode === 99) {
              setResponseStatus(response.data?.message);
            } else {
              toast(response.data?.message, {
                position: "top-right",
                type: "error",
              });
            }
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

  const handleSubmit = async (values) => {
    const formattedData = [];
    let hasValue = false;
    getChatQus.forEach((field) => {
      const message = values[field.question_key] || "";
      if (message.trim() !== "") {
        hasValue = true;
        formattedData.push({
          question_id: field.question_key,
          answer: message,
          //   type_: field.type,
          //   ans_categ: field.ans_category,
          //   question_key: field.question_key,
        });
      }
    });

    if (!hasValue) {
      toast("Please provide at least one answer.", {
        position: "top-right",
        type: "error",
      });
      return;
    }

    await AxiosInstance("application/json")
      .post("/history_answer", formattedData)
      .then((response) => {
        if (response && response?.status == 200) {
          if (response.data?.statuscode === 200) {
            toast(response.data?.message, {
              position: "top-right",
              type: "success",
            });
            // getHistoryBotQues();
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

  const handleClose = _ => {
    setProfileCmpModalProps({ ...profileCmpModalProps, isModalVisible: false });
  }

  const profilePicture = ((getProfileDetails?.profile_url === "NA") ? (getProfileDetails?.gender?.toLowerCase() === "female" ? ChatFemaleuser : ChatMaleuser) : getProfileDetails?.profile_url);
  return (
    <>
      {isModalVisible && (
        <ModalView
          msg={modalMessage}
          handleClose={handleClose}
          isModalVisible={isModalVisible}
          path={redirectionPath}
        />
      )}
      {isFormLoading ? (
        <Loading />
      ) : (
        <div className="cs_homepage mt-0 h-100">
          <div className="w-50 al_chatbotauth wflexLayout p-0">
            <div className="d-flex justify-content-center mt-3 h-auto pb-1">
              <div className="d-flex chatbtn">
                <div
                  className={`chat_item ${isChatOneActive ? "chat_active" : ""}`}
                  onClick={() => handleChatToggle(true)}
                >
                  Chat
                </div>
                <div
                  className={`chat_item ${!isChatOneActive ? "chat_active" : ""}`}
                  onClick={() => handleChatToggle(false)}
                >
                  Form
                  <i className="ps-1 icon_alfred_password"></i>
                </div>
              </div>
            </div>
            {isChatOneActive ? (
              <div className="wflexLayout">
                <div className="flex-grow-1 my-3">
                  {Array?.isArray(questions) && questions?.length > 0 &&
                    <div className="scrolldiv ps-0">
                      {questions?.map((message, index) => (
                        <React.Fragment key={index}>
                          <Row className={"mb-4 al_chatcontent" + (message.sender === "user" ? " al_usermsg" : "")} key={index}>
                            <div>
                              {message.sender === "user" ? (
                                <img
                                  src={profilePicture}
                                  alt="chat user" className='al_chatimg' />
                              ) : message.sender === "alfred" ? (
                                <img src={Chatbot} alt="Bot" />
                              ) : null}
                            </div>
                            <Col>
                              <h6 className="mb-0 text-capitalize">
                                {message.sender === "alfred" ? "Alfred" : getProfileDetails?.username}
                              </h6>
                              <div style={{ whiteSpace: "pre-wrap" }}>{message.text}</div>
                            </Col>
                          </Row>
                        </React.Fragment>
                      ))}
                      {isLoading && <div className="al_chatloading"></div>}
                      <div ref={messagesEndRef} />
                    </div>}
                  {(responseStatus || questions?.length === 0) && (
                    <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                      <div>No question available</div>
                      {Object.keys(questions).length === 0 && (
                        <div className="mt-3 d-flex align-items-center justify-content-center">
                          <button
                            type="submit"
                            className="al_greybgbutton"
                            onClick={() => navigate("/home")}
                          >
                            Go to Dashboard
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="cs_mainsearch mb-3">
                  {/* Once it reach the end of lenght it will show "Go to Dashboard" button or else it show input with condition based ICONS */}
                  {Object.keys(questions).length !== 0 && (
                    <div className="cs_mainsearch">
                      <form action="#">
                        <i
                          className="icon_alfred_search"
                          style={{ height: "auto" }}
                        ></i>
                        <input
                          type="text"
                          placeholder="Ask a question"
                          name="message"
                          value={inputValue} // input value
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
                        {/* Icon shown based on hide and show conditions */}
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
                            className="icon_alfred_speech"
                            style={{ height: "auto" }}
                          ></i>
                        )}
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="wflexLayout">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  {({ values, setFieldValue }) => (
                    <Form className="wflexScroll d-flex flex-column">
                      <div className="form_chat flex-grow-1 mt-3">
                        {Array?.isArray(getChatQus) && getChatQus?.length > 0 ? (
                          getChatQus?.map((field, index) => (
                            <FormGroup key={index}>
                              <Label
                                htmlFor={field.description}
                                className="form-label"
                              >
                                {index + 1}. {field.description}
                              </Label>
                              {field.type_ === "Dropdown" ? (
                                <FormGroup>
                                  <Select
                                    id={field.question_key}
                                    className="inputSelect"
                                    name={field.question_key}
                                    value={
                                      values[field.question_key]
                                        ? {
                                          value: values[field.question_key],
                                          label: values[field.question_key],
                                        }
                                        : null
                                    }
                                    options={field.options?.map((option) => ({
                                      value: option,
                                      label: option,
                                    }))}
                                    onChange={(selectedOption) =>
                                      setFieldValue(
                                        field.question_key,
                                        selectedOption ? selectedOption.value : ""
                                      )
                                    }
                                  />
                                </FormGroup>
                              ) : field.type_ === "Radio" ? (
                                <div className="d-flex px-1 gap-3 flex-row">
                                  {field.options?.map((option, optionIndex) => (
                                    <FormGroup key={optionIndex}>
                                      <Field
                                        type="radio"
                                        id={`${field.question_key}-${option}`}
                                        name={field.question_key}
                                        value={option}
                                        className="form-check-input"
                                        style={{ minWidth: "auto" }}
                                      />
                                      <label
                                        htmlFor={`${field.question_key}-${option}`}
                                        className="form-check-label px-2"
                                      >
                                        {option}
                                      </label>
                                    </FormGroup>
                                  ))}
                                </div>
                              ) : field.type_ === "integer" ? (
                                <FormGroup>
                                  <Field
                                    type="text"
                                    id={field.question_key}
                                    name={field.question_key}
                                    className="form-control"
                                    onKeyDown={allowsOnlyNumeric}
                                  />
                                </FormGroup>
                              ) : (
                                <FormGroup>
                                  <Field
                                    type="text"
                                    //   as="textarea"
                                    id={field.question_key}
                                    name={field.question_key}
                                    className="form-control"
                                  />
                                </FormGroup>
                              )}
                            </FormGroup>
                          ))
                        ) : (
                          <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                            {/* <div>No question available</div> */}
                            <img src={incompleteprofile} alt="" style={{ width: "200px" }} />
                            <h6 className="mb-0 text-warning">Will be coming soon</h6>
                            {Array?.isArray(getChatQus) && getChatQus?.length > 0 ? (
                              <div className="my-3">
                                <button
                                  type="submit"
                                  className="al_greybgbutton"
                                // onClick={() => navigate("/dashboard")}
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <div className="my-3">
                                <button
                                  type="submit"
                                  className="al_greybgbutton"
                                  // onClick={() => navigate("/home")}
                                  onClick={() => handleChatToggle(true)}
                                >
                                  Go to Chat
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div >)}
    </>
  );
}
