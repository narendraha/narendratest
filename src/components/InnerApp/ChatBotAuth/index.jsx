import React from 'react';
import { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import chatBot from '../../../images/chatboticon.svg';
import chatBotClose from '../../../images/closeicon.svg';

export default function ChatBotAuth() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className='al_chatbotauth'>
        <Card className={!isOpen ? "al_chatclose" : "al_chatopen"}>
          <CardBody>
            Chat need to be rendered here
          </CardBody>
        </Card>
        {!isOpen && <img src={chatBot} onClick={() => setIsOpen(!isOpen)} alt="bot" />}
        {isOpen && <img src={chatBotClose} onClick={() => setIsOpen(!isOpen)} alt="bot" />}
      </div>
    </>
  );
}
