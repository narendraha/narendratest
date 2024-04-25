import React, { useEffect, useRef, useState } from "react";
import { pageTitle } from "../../helpers/PageTitle";
import { AxiosInstance } from "../../_mock/utilities";
import Chatuser from "../../images/usericon.svg";
import Chatbot from "../../images/alfredicon.svg";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function HomeStyle3() {
  pageTitle("Home");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(""); // chat search field(user entered value) stored in this state
  const [isLoading, setIsLoading] = useState(false); // loading status of api call
  const [isShow, setIsShow] = useState(false); // show or hide the message box after sending a message.
  const [isInputShow, setIsInputShow] = useState(false);
  const [questions, setQuestions] = useState([]); // stored the chat history get from API response
  const [newques, setnewqus] = useState("");
  const [newNumber, setNewNumber] = useState(1); //  initial index value of questins
  const messagesEndRef = useRef(null);

  let jsonData = {
    1: [
      "I strictly follow my doctor's recommendations and treatment plans.",
      "I consistently adhere to my doctor's advice and treatment plans.",
      "I faithfully stick to the treatment regimens prescribed by my doctor.",
      "I adhere closely to the directives provided by my physician for treatment.",
      "I always follow my doctor's instructions and treatment plans.",
      "I unwaveringly adhere to the medical advice provided by my healthcare professional.",
      "I diligently execute the recommendations given by my physician.",
      "I conscientiously adhere to the medical advice provided by my doctor.",
      "I rigorously follow the directives and treatment protocols provided by my healthcare provider.",
      "I consistently adhere to the medical guidance provided by my doctor.",
      "I faithfully comply with the therapeutic strategies outlined by my physician.",
      "I consistently follow the medical counsel provided by my doctor.",
      "I rigorously adhere to the treatment protocols provided by my healthcare provider.",
      "I unwaveringly follow the therapeutic interventions recommended by my doctor.",
      "I always stick to the advice and treatment plans provided by my doctor.",
    ],
    2: [
      "I find it easy to integrate my treatment into my daily routine.",
      "I have no trouble fitting my treatment into my daily routine.",
      "Incorporating my treatment into my daily routine is straightforward for me.",
      "I find it simple to include my treatment in my daily activities.",
      "Integrating my treatment into my daily schedule is easy for me.",
      "It's easy for me to make my treatment a part of my daily routine.",
      "I find it uncomplicated to blend my treatment into my daily routine.",
      "Making my treatment a regular part of my day is easy for me.",
      "I don't struggle to integrate my treatment into my daily routine.",
      "Including my treatment in my daily activities is a breeze for me.",
      "Integrating my treatment into my daily life is smooth for me.",
      "I find it easy to make my treatment a habit in my daily routine.",
      "Making my treatment fit into my daily schedule is simple for me.",
      "I have no difficulty incorporating my treatment into my daily routine.",
      "Integrating my treatment into my daily activities is no problem for me.",
    ],
    3: [
      "I regularly attend all my medical appointments.",
      "I consistently attend every one of my medical appointments.",
      "I make sure to attend all of my medical appointments regularly.",
      "I never miss any of my medical appointments.",
      "It's routine for me to attend all of my medical appointments.",
      "I am diligent about attending all of my medical appointments.",
      "Attending all of my medical appointments is a regular habit for me.",
      "I regularly make it to all of my medical appointments.",
      "I am committed to attending all of my medical appointments.",
      "I ensure that I attend all of my medical appointments on a regular basis.",
      "Making it to all of my medical appointments is something I do consistently.",
      "I prioritize attending all of my medical appointments regularly.",
      "Attending all of my medical appointments is part of my routine.",
      "I schedule and attend all of my medical appointments regularly.",
      "It's important to me to attend all of my medical appointments regularly.",
    ],
    4: [
      "I often find myself denying or downplaying the seriousness of my condition.",
      "I frequently downplay the seriousness of my condition.",
      "I often find myself minimizing the seriousness of my condition.",
      "I sometimes deny the severity of my condition.",
      "I regularly underestimate how serious my condition is.",
      "I find myself frequently brushing off the seriousness of my condition.",
      "It's common for me to downplay how serious my condition is.",
      "I occasionally deny the gravity of my condition.",
      "I often minimize the severity of my condition.",
      "It's not unusual for me to underestimate the seriousness of my condition.",
      "I sometimes downplay the seriousness of my condition.",
      "I find myself frequently denying how serious my condition is.",
      "It's a tendency of mine to downplay the seriousness of my condition.",
      "I often underestimate how severe my condition is.",
      "I occasionally find myself in denial about the seriousness of my condition.",
    ],
    5: [
      "I feel overwhelmed and helpless about managing my condition.",
      "I often feel overwhelmed and powerless when dealing with my condition.",
      "Managing my condition leaves me feeling overwhelmed and helpless.",
      "I frequently experience feelings of being overwhelmed and powerless in managing my condition.",
      "It's common for me to feel overwhelmed and helpless about managing my condition.",
      "I often feel overwhelmed and incapable of managing my condition.",
      "Managing my condition often leaves me feeling overwhelmed and helpless.",
      "It's not uncommon for me to feel overwhelmed and powerless when dealing with my condition.",
      "I find myself feeling overwhelmed and helpless when trying to manage my condition.",
      "I frequently experience a sense of overwhelm and helplessness in managing my condition.",
      "Managing my condition is often overwhelming and leaves me feeling helpless.",
      "I often feel overwhelmed and incapable of coping with my condition.",
      "Feeling overwhelmed and helpless about managing my condition is a regular experience for me.",
      "It's common for me to feel overwhelmed and powerless in trying to manage my condition.",
      "I often feel overwhelmed and at a loss when it comes to managing my condition.",
    ],
    6: [
      "I get angry or frustrated when thinking about my condition.",
      "I feel irritated or upset when thinking about my condition.",
      "I become annoyed or agitated when thinking about my condition.",
      "Thoughts about my condition often lead to frustration or anger.",
      "I find myself feeling frustrated or irritated by my condition.",
      "It's common for me to feel angry or annoyed when thinking about my condition.",
      "I often experience frustration or anger in relation to my condition.",
      "I frequently feel frustrated or upset when my condition comes to mind.",
      "My thoughts about my condition often provoke feelings of frustration or anger.",
      "I often feel irritated or angry when reflecting on my condition.",
      "I regularly experience frustration or annoyance when considering my condition.",
      "My condition often triggers feelings of frustration or anger within me.",
      "I commonly feel frustrated or aggravated when thinking about my condition.",
      "It's typical for me to feel frustrated or angry when contemplating my condition.",
      "Thoughts about my condition frequently evoke feelings of frustration or annoyance.",
    ],
    7: [
      "I actively research my condition and treatment options.",
      "I actively look for information about my condition and possible treatments.",
      "I make an effort to research my condition and explore treatment options.",
      "I actively pursue knowledge about my condition and available treatments.",
      "I take the initiative to learn about my condition and potential treatments.",
      "I actively seek out information regarding my condition and its treatment.",
      "I actively seek out resources to learn more about my condition and treatment options.",
      "I am dedicated to gathering information about my condition and potential treatments.",
      "I make a conscious effort to stay informed about my condition and available treatments.",
      "I actively seek out information and resources to better understand my condition and treatment options.",
      "I put effort into seeking information about my condition and potential treatment pathways.",
      "I am committed to staying informed about my condition and exploring treatment options.",
      "I take an active role in researching my condition and investigating treatment possibilities.",
      "I am proactive in seeking information about my condition and considering various treatment options.",
      "I actively seek out knowledge about my condition and available treatments to make informed decisions.",
    ],
    8: [
      "I frequently ask my healthcare providers detailed questions.",
      "I often ask my healthcare providers detailed questions about my condition.",
      "I regularly seek clarification from my healthcare providers by asking detailed questions.",
      "I am not hesitant to ask detailed questions to my healthcare providers about my condition.",
      "It's common for me to ask my healthcare providers in-depth questions about my condition.",
      "I frequently communicate with my healthcare providers, seeking detailed information about my condition.",
      "I am proactive in seeking information from my healthcare providers, often asking detailed questions.",
      "I make it a point to ask my healthcare providers thorough questions about my condition.",
      "I frequently seek additional information from my healthcare providers by asking detailed questions.",
      "I regularly engage in discussions with my healthcare providers, asking them detailed questions about my condition.",
      "I am not afraid to ask my healthcare providers detailed questions to better understand my condition.",
      "I often inquire with my healthcare providers, seeking detailed explanations about my condition.",
      "I frequently seek clarification from my healthcare providers, asking them detailed questions about my condition.",
      "I frequently interact with my healthcare providers, asking them specific questions about my condition.",
      "I regularly communicate with my healthcare providers, asking them detailed questions to better manage my condition.",
    ],
    9: [
      "I prefer making decisions about my treatment after thorough discussion and consideration.",
      "I like to thoroughly discuss and consider my treatment options before making decisions.",
      "I prefer to carefully weigh my treatment options through thorough discussion and consideration.",
      "I feel more comfortable making treatment decisions after thoroughly discussing and considering my options.",
      "I prefer to engage in thorough discussions and considerations before making treatment decisions.",
      "I believe in taking the time to discuss and consider all treatment options before making decisions.",
      "I value the process of thoroughly discussing and considering treatment options before making decisions.",
      "I find it important to have thorough discussions and considerations before making treatment decisions.",
      "I prefer to make treatment decisions only after thoroughly discussing and considering all options.",
      "I feel more confident in my treatment decisions after engaging in thorough discussion and consideration.",
      "I prefer to thoroughly discuss and consider my treatment options before making any decisions.",
      "I believe in the importance of thoroughly discussing and considering treatment options before deciding.",
      "I prioritize having thorough discussions and considerations before making any treatment decisions.",
      "I prefer to make treatment decisions based on thorough discussion and consideration.",
      "I find it beneficial to engage in thorough discussion and consideration before making treatment decisions.",
    ],
    10: [
      "I often feel anxious or worried about my health and future.",
      "I frequently experience anxiety or worry concerning my health and what the future holds.",
      "It's common for me to feel anxious or worried about both my health and future.",
      "I often find myself feeling anxious or worried when thinking about my health and future.",
      "I frequently feel anxious or concerned about my health and what lies ahead.",
      "I commonly feel anxious or troubled about both my health and what's to come.",
      "It's typical for me to feel anxious or apprehensive about my health and future prospects.",
      "I often find myself feeling anxious or uneasy when contemplating my health and future.",
      "I frequently experience feelings of anxiety or concern about both my health and what lies ahead.",
      "I commonly feel anxious or worried about my health and the uncertainties of the future.",
      "It's common for me to experience anxiety or worry in relation to both my health and future.",
      "I often feel anxious or concerned about both my health and what the future may hold.",
      "I frequently find myself feeling anxious or apprehensive about my health and future outcomes.",
      "It's typical for me to experience feelings of anxiety or worry concerning both my health and future prospects.",
      "I often feel anxious or uneasy when considering both my health and what lies ahead.",
    ],
    11: [
      "I tend to keep my health concerns to myself and not bother others with them.",
      "I often handle my health issues privately to avoid worrying others.",
      "It's typical for me to keep my health worries to myself.",
      "I usually manage my health concerns without involving others.",
      "I often keep my health matters private to avoid burdening others.",
      "I tend to deal with my health concerns quietly without involving others.",
      "It's common for me to keep my health concerns to myself.",
      "I typically prefer to keep my health concerns private.",
      "I often choose not to share my health concerns to avoid troubling others.",
      "I usually manage my health issues independently without involving others.",
      "It's typical for me to handle my health concerns on my own.",
      "I often keep my health worries to myself to prevent causing concern to others.",
      "I generally prefer to deal with my health concerns privately.",
      "I typically keep my health concerns to myself rather than sharing them.",
      "It's common for me to handle my health matters privately.",
    ],
    12: [
      "I rely heavily on my family or friends for emotional support regarding my health.",
      "I often turn to my family or friends for emotional support regarding my health.",
      "My family or friends play a significant role in supporting me emotionally regarding my health.",
      "I rely heavily on the emotional support of my family or friends concerning my health.",
      "It's common for me to depend on my family or friends for emotional support regarding my health.",
      "My family or friends are a major source of emotional support for me in relation to my health.",
      "I often seek emotional support from my family or friends when it comes to my health.",
      "I frequently lean on my family or friends for emotional support regarding my health.",
      "My family or friends are crucial for providing emotional support regarding my health.",
      "It's typical for me to heavily rely on my family or friends for emotional support regarding my health.",
      "I often count on my family or friends for emotional support concerning my health.",
      "My family or friends are important for offering emotional support regarding my health.",
      "I regularly seek emotional support from my family or friends regarding my health.",
      "I consistently depend on my family or friends for emotional support concerning my health.",
      "It's common for me to rely heavily on my family or friends for emotional support regarding my health.",
    ],
    13: [
      "I sometimes skip treatments or medications if I feel they're not working.",
      "Occasionally, I skip treatments or medications if I perceive them as ineffective.",
      "There are times when I decide to skip treatments or medications if I think they're not working.",
      "Sometimes, I choose to forgo treatments or medications if I believe they're ineffective.",
      "Occasionally, I opt out of treatments or medications if I feel they're not effective.",
      "There are occasions when I skip treatments or medications if I judge them as ineffective.",
      "Sometimes, I decide to skip treatments or medications if I don't see results.",
      "Occasionally, I skip treatments or medications if I sense they're not working.",
      "There are times when I skip treatments or medications if I perceive them as ineffective.",
      "Sometimes, I choose to skip treatments or medications if I feel they're not working.",
      "Occasionally, I decide to forgo treatments or medications if I don't notice improvement.",
      "There are occasions when I skip treatments or medications if I think they're not effective.",
      "Sometimes, I skip treatments or medications if I don't experience benefits.",
      "Occasionally, I opt not to continue treatments or medications if I feel they're not effective.",
      "There are times when I skip treatments or medications if I feel they're not producing results.",
    ],
    14: [
      "My mood is heavily affected by the status of my health.",
      "My mood often fluctuates depending on my health status.",
      "Changes in my health status frequently affect my mood.",
      "My mood is greatly impacted by changes in my health.",
      "Variations in my health status often lead to changes in my mood.",
      "My mood tends to be closely tied to my health status.",
      "Changes in my health significantly influence my mood.",
      "My mood is heavily influenced by my current health condition.",
      "My mood often shifts in response to changes in my health.",
      "My mood tends to be strongly affected by my health status.",
      "Changes in my health condition often result in changes in my mood.",
      "My mood frequently reflects changes in my health.",
      "I find that my mood is significantly affected by my health status.",
      "My mood tends to be closely connected to my current health condition.",
      "I often notice changes in my mood corresponding to changes in my health.",
    ],
    15: [
      "I find myself often thinking about how my condition limits my life.",
      "I often find myself thinking about how my condition limits my life.",
      "Contemplating how my condition restricts my life is something I do frequently.",
      "I frequently reflect on the ways my condition impacts and limits my life.",
      "It's common for me to think about how my condition affects my life on a regular basis.",
      "I regularly contemplate the limitations my condition imposes on my life.",
      "Thinking about how my condition restricts my life is a frequent occurrence for me.",
      "I often ponder the ways my condition hinders my life.",
      "Contemplating the restrictions my condition places on my life is something I do frequently.",
      "I frequently consider the ways my condition limits my life.",
      "Reflecting on how my condition restricts my life is something I do often.",
      "It's typical for me to think about how my condition affects my life regularly.",
      "I often find myself thinking about the constraints my condition imposes on my life.",
      "Considering how my condition restricts my life is a common occurrence for me.",
      "I frequently think about how my condition limits my daily activities and choices.",
    ],
    16: [
      "I feel comfortable going to a healthcare provider about my condition.",
      "I feel comfortable talking about my condition with healthcare providers.",
      "Discussing my condition with healthcare providers is something I feel relaxed about.",
      "I'm at ease when it comes to discussing my condition with healthcare providers.",
      "I find it easy to talk to healthcare providers about my condition.",
      "I feel comfortable sharing details about my condition with healthcare providers.",
      "I don't hesitate to discuss my condition openly with healthcare providers.",
      "I feel relaxed discussing my condition with healthcare providers.",
      "I feel at ease bringing up my condition with healthcare providers.",
      "Discussing my condition with healthcare providers doesn't make me feel anxious.",
      "I feel comfortable seeking advice from healthcare providers regarding my condition.",
      "I find it easy to communicate my concerns about my condition with healthcare providers.",
      "I'm confident discussing my condition with healthcare providers.",
      "I feel at ease expressing my concerns about my condition to healthcare providers.",
      "I'm comfortable seeking guidance from healthcare providers about my condition.",
    ],
    17: [
      "I want to reach out to a healthcare provider about my condition.",
      "I feel the urge to contact a healthcare provider regarding my condition.",
      "I have a desire to seek assistance from a healthcare provider about my condition.",
      "It's important to me to reach out to a healthcare provider about my condition.",
      "I am inclined to seek guidance from a healthcare provider regarding my condition.",
      "I am motivated to discuss my condition with a healthcare provider.",
      "I feel compelled to reach out to a healthcare provider for support with my condition.",
      "I am eager to communicate with a healthcare provider about my condition.",
      "Seeking help from a healthcare provider about my condition is something I want to do.",
      "I am interested in consulting a healthcare provider about my condition.",
      "I feel a strong need to reach out to a healthcare provider regarding my condition.",
      "I am determined to seek assistance from a healthcare provider for my condition.",
      "Contacting a healthcare provider about my condition is a priority for me.",
      "I have a strong intention to discuss my condition with a healthcare provider.",
      "I am committed to reaching out to a healthcare provider about my condition.",
    ],
  };
  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  let randomNumber = Math.floor(Math.random() * 15);
  const newfuc = (index) => {
    setnewqus(jsonData[index][randomNumber]);
    setQuestions((prevHistory) => [
      ...prevHistory,
      { Alfred: jsonData[index][randomNumber] },
    ]);
  };

  useEffect(() => {
    if (newNumber <= Object.keys(jsonData).length) {
      newfuc(newNumber);
    }
  }, [newNumber]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [newNumber, questions]);

  const handleFormSubmit = async (e) => {
    setIsInputShow(true);
    e.preventDefault();
    if (!inputValue.trim()) return; // Do not submit empty input
    // show the user entered input value
    setQuestions((prevHistory) => [...prevHistory, { User: inputValue }]);
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
      .post(
        `https://helloalfredtest.azurewebsites.net/categorizeresponse`,
        data
      )
      .then((res) => {
        if (res && res.data && res.status === 200) {
          // hide the send and remove icon 
          setIsShow(false);
          //  hide the input
          setIsInputShow(false);
          const responseData = res.data;
          setIsLoading(false);
          // here  we will add the result to our history of questions and answers
          // if res status is -1 or index % 3 or res 99 means need to show res msg and also index % 3 measns need to next question
          if (
            responseData.status_code === -1 ||
            newNumber % 3 === 0 ||
            responseData.status_code === 99
          ) {
            setQuestions((prevHistory) => [
              ...prevHistory,
              {
                Alfred: responseData?.message,
              },
            ]);
            if (newNumber % 3 === 0 || responseData.status_code === 99) {
              // index % 3 measns need to next question if increment the newnumber then random question will generate
              setNewNumber((prev) => prev + 1);
            }
          } else {
            setNewNumber((prev) => prev + 1);
          }
        }
      })
      .catch((er) => {
        console.log(er);
        console.log("er?.message: ", er?.message);
        toast(er?.response?.data?.message || er?.message, {
          position: "top-center",
          type: "error",
        });
      });
  };

  const handleInputChange = (e) => {
    let { value } = e.target;
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
              {questions?.map((message, index) => (
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
              {isLoading && <div className="al_chatloading"></div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="cs_mainsearch mb-2">
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
                  className="icon_alfred_search"
                  style={{ height: "auto" }}
                ></i>
                <input
                  type="text"
                  placeholder="Ask a question"
                  name="message"
                  value={inputValue}
                  onChange={handleInputChange}
                  disabled={isInputShow}
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
                    className="icon_alfred_speech"
                    style={{ height: "auto" }}
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
