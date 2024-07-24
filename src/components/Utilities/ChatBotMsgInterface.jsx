import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, UncontrolledTooltip } from 'reactstrap';
import { getBotRole } from '../../_mock/internalJsControl';
import Chatbot from "../../images/alfredicon.svg";
import Chatuser from "../../images/usericon.svg";
import { updateChatPreferenceRequest } from '../../store/EducationaChatBot/slice';
import EducationalBotHTMLcontent from './EducationalBotHTMLcontent';

const ChatBotMsgInterface = ({ props }) => {
  const dispatch = useDispatch()

  const { chatHistory, index } = props;
  const messagesEndRef = useRef(null);

  const [selectedIcons, setSelectedIcons,] = useState([]); // State to track selected icons

  const { chatBotLoadingIndex } = useSelector((state) => state?.utilityCallFunctionSlice);
  const isUser = chatHistory?.role === getBotRole.USER;

  const handleAction = (messageId, iconType, alfredValue, userValue) => {
    setSelectedIcons(prevIcons => ({
      ...prevIcons,
      [messageId]: { reaction: iconType }
    }))

    let reqObj = {
      message: alfredValue,
      preference: iconType === 'like' ? true : false
    }
    dispatch(updateChatPreferenceRequest(reqObj))
  }

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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
            <div><EducationalBotHTMLcontent props={chatHistory?.content} />{chatBotLoadingIndex === index && <div className="al_chatloading my-1"></div>}</div>
          }
          {!isUser && (
            <p className="mb-0 mt-2 al_chatfeedbackactions">
              <i className={"icon_alfred_like pointer me-3 " + (selectedIcons[index]?.reaction === 'like' ? 'like' : '')} onClick={() => handleAction(index, 'like', chatHistory?.content)}></i>
              <i className={"icon_alfred_dislike pointer me-3 " + (selectedIcons[index]?.reaction === 'dislike' ? 'text-danger mt-0' : '')} onClick={() => handleAction(index, 'dislike', chatHistory?.content)}></i>
            </p>
          )}
        </Col>
      </Row>
      <div ref={messagesEndRef} />
    </>
  )
}

export default ChatBotMsgInterface;

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