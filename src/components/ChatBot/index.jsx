import React from 'react';
import { Card, CardBody } from 'reactstrap';
import chatBot from '../../images/chatboticon.svg';

export default function ChatBot() {
  return (
    <>
      <div className='al_chatbot'>
        <Card>
          <CardBody className='d-flex flex-column'>
            <div className='flex-grow-1'>
              <div className='scrolldiv'>
                Chat need to be rendered here
              </div>
            </div>
            <div className='cs_mainsearch al_chatfooter p-3' style={{ backgroundColor: "#F1F4F9" }}>
              <form action="#">
                <i className='icon_alfred_search' style={{ height: "auto" }}></i>
                <input
                  type="text"
                  placeholder="Ask a question"
                />
                <i className='icon_alfred_close'></i>
                <i className='icon_alfred_sendmsg' style={{ height: "auto" }}></i>
              </form>
              <div className='al_note pt-1'>Disclaimer: Not a medical advice</div>
            </div>
          </CardBody>
        </Card>
        {/* <img src={chatBot} alt="bot" /> */}
      </div>
    </>
  );
}
