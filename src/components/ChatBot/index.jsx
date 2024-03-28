import React from 'react';
import { Card, CardBody } from 'reactstrap';
import chatBot from '../../images/chatboticon.svg';

export default function ChatBot() {
  return (
    <>
      <div className='al_chatbot'>
        <Card>
          <CardBody>
              Chat need to be rendered here
          </CardBody>
        </Card>
        {/* <img src={chatBot} alt="bot" /> */}
      </div>
    </>
  );
}
