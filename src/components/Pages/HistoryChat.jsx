import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { allowsOnlyNumeric } from "../../_mock/RegularExp";
import { AxiosInstance } from "../../_mock/utilities";
import { pageTitle } from "../../helpers/PageTitle";
import Chatbot from "../../images/alfredicon.svg";
import Chatuser from "../../images/usericon.svg";
export default function HistoryChatBot() {
  pageTitle("History Chat Bot");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isInputShow, setIsInputShow] = useState(false);
  const [questions, setQuestions] = useState([]); // stored the chat history get from API response
  const [newNumber, setNewNumber] = useState(0); //  initial index value of questins
  const messagesEndRef = useRef(null);
  const [responseStatus, setResponseStatus] = useState(0);
  const incrementRef = useRef(0);

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
  // get questions using useeffect
  useEffect(() => {
    setQuestions([]);
    setTimeout(() => {
      setIsLoading(false);
      getHistoryBotQues();
      setIsInputShow(false);
    }, 1000);
  }, [isChatOneActive]);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let randomNumber = Math.floor(Math.random() * 15);

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
    newfuc(incrementRef.current);
  }, [getChatQus]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [incrementRef, questions]);

  useEffect(() => { }, [incrementRef, responseStatus]);

  const handleFormSubmit = async (e) => {
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
    setQuestions((prevHistory) => [...prevHistory, { user: inputValue }]);
    setInputValue(""); // Clear input after submitting
    setIsLoading(true);

    // request data
    let data = {
      question: getChatQus[incrementRef.current]["description"],
      message: inputValue,
      question_key: getChatQus[incrementRef.current]["question_key"],
      type_: getChatQus[incrementRef.current]["type"],
      ans_categ: getChatQus[incrementRef.current]["ans_category"], // Convert to string
    };
    // api integration
    await AxiosInstance("application/json")
      .post(`https://058a-202-65-141-34.ngrok-free.app/historybotcat`, data)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          // hide the send and remove icon
          setIsShow(false);
          //  hide the input
          setIsInputShow(false);
          const responseData = res.data;
          setIsLoading(false);
          setResponseStatus(responseData?.status_code);
          // here  we will add the result to our history of questions and answers
          // if res status is -1 or index % 3 or res 99 means need to show res msg and also index % 3 measns need to next question
          if (
            responseData.status_code === -1 ||
            responseData.status_code === 99
          ) {
            setQuestions((prevHistory) => [
              ...prevHistory,
              {
                alfred: responseData?.message,
              },
            ]);
          } else {
            incrementRef.current += 1;
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

  // Form tab handled here
  const getHistoryBotQues = async () => {
    await AxiosInstance("application/json")
      .get("/get_chat_history")
      .then((response) => {
        if (response && response?.status == 200) {
          setGetChatQus(response.data?.data);
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
            getHistoryBotQues();
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
  console.log(
    "newNumber",
    newNumber > Object.keys(questions).length ? "above" : "below"
  );
  return (
    <div className="cs_homepage mt-0 h-100">
      <div className="w-50 al_chatbotauth wflexLayout p-0">
        <div className="d-flex justify-content-center mt-3 h-auto pb-1">
          <div className="d-flex chatbtn">
            <div
              className={`chat_item ${isChatOneActive ? "chat_active" : ""}`}
              onClick={() => handleChatToggle(true)}
            >
              Chat One
            </div>
            <div
              className={`chat_item ${!isChatOneActive ? "chat_active" : ""}`}
              onClick={() => handleChatToggle(false)}
            >
              Chat Two
            </div>
          </div>
        </div>
        {isChatOneActive ? (
          <div className="wflexLayout">
            <div className="flex-grow-1 mt-3">
              {/* Chat need to be rendered here */}
              {/* Welcome message */}
              {/* <Row className="mb-4 al_chatcontent">
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
                </Row> */}
              {/*
                 * Loop the question it's stored in array[] and split the based on response
                 * again split the structure into "key and value" using Object method called entries
                 * it convert into array so here split the param as ([key, value])
                 */}

              {Array?.isArray(questions) && questions?.length > 0 ? (
                <div className="scrolldiv ps-0">
                  {questions?.map((message, index) => (
                    Object.entries(message)?.map(([key, value]) => (
                      <Row className={"mb-4 al_chatcontent" + (key === "user" ? " al_usermsg" : "")} key={key}>
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
                    ))
                  )
                  )}
                </div>
              ) : (
                <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                  No question available
                  <div className="my-3">
                    <button
                      type="submit"
                      className="al_greybgbutton"
                      onClick={() => navigate("/home")}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              )}
              {isLoading && <div className="al_chatloading"></div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="cs_mainsearch mb-3">
              {/* Once it reach the end of lenght it will show "Go to Dashboard" button or else it show input with condition based ICONS */}
              {Object.keys(questions).length === 0 ? '' : (
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
              )}
            </div>
          </div>
        ) : (
          <div className="wflexLayout">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, setFieldValue }) => (
                <Form className="wflexScroll d-flex flex-column">
                  <div className="form_chat flex-grow-1 pe-2 mt-3">
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
                      <>
                        <div className="d-flex flex-column h-100 align-items-center justify-content-center">
                          No question available
                          <div className="my-3">
                            <button
                              type="submit"
                              className="al_greybgbutton"
                              onClick={() => navigate("/home")}
                            >
                              Go to Dashboard
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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
                  ) : ''}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div >
  );
}
