import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import { getBotRole } from '../../_mock/internalJsControl';
import Chatbot from "../../images/alfredicon.svg";
import Chatuser from "../../images/usericon.svg";

const ChatBotMsgInterface = ({ props }) => {
  const { chatHistory, index } = props;

  const [selectedIcons, setSelectedIcons] = useState([]); // State to track selected icons

  const { ischatBotLoading } = useSelector((state) => state?.utilityCallFunctionSlice);
  const isUser = chatHistory?.role === getBotRole.USER;

  const handleAction = (messageId, iconType, alfredValue, userValue) => {
    setSelectedIcons(prevIcons => ({
      ...prevIcons,
      [messageId]: { reaction: iconType, alfred: alfredValue, User: chatHistory?.find((element, index) => index === messageId - 1)?.User },
    }));
  }

  return (
    <div className="flex-grow-1">
      <div className="scrolldiv">
        <Row className={"mb-4 al_chatcontent" + (isUser ? " al_usermsg" : "")}>
          <div>
            {isUser ?
              <ChatBotTextUi props={{ imgUrl: Chatuser, imgAlt: "chat user", imgId: "userimagehomeed", toolTipText: "User" }} /> :
              <ChatBotTextUi props={{ imgUrl: Chatbot, imgAlt: "Bot", imgId: "botimagehomeed", toolTipText: "Alfred" }} />
            }
          </div>
          <Col>
            {isUser ?
              <div>{chatHistory?.content}</div> :
              {/* <EducationalBotHTMLcontent props={responseStream} /> */ }
            }
            {!isUser && (
              <p className="mb-0 mt-2 al_chatfeedbackactions">
                <i className={"icon_alfred_like pointer me-3 " + (selectedIcons[index]?.reaction === 'like' ? 'like' : '')} onClick={() => handleAction(index, 'like', chatHistory?.content)}></i>
                <i className={"icon_alfred_dislike pointer me-3 " + (selectedIcons[index]?.reaction === 'dislike' ? 'text-danger mt-0' : '')} onClick={() => handleAction(index, 'dislike', chatHistory?.content)}></i>
              </p>
            )}
          </Col>
        </Row>

        {ischatBotLoading && <ChatBotLoading />}
        {/* <div ref={messagesEndRef} /> */}
      </div>
    </div>
  )
}

export default ChatBotMsgInterface;

// ========= chatbot loading ============
export const ChatBotLoading = () => {
  return (
    <>
      <Row className="mb-4 al_chatcontent">
        <div>
          <img src={Chatbot} alt="Bot" id="botimageed" />
        </div>
        <Col>
          <div>
            <div className="al_chatloading my-1"></div>
          </div>
        </Col>
      </Row>
    </>
  )
}


// ========= image and tooltip ============
export const ChatBotTextUi = ({ props }) => {

  const { imgUrl, imgAlt, imgId, toolTipText } = props;
  return (
    <>
      <img src={imgUrl} alt={imgAlt} id={imgId} />
      <UncontrolledTooltip
        modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
        placement='bottom' target={imgId}>
        {toolTipText}
      </UncontrolledTooltip>
    </>
  )
}