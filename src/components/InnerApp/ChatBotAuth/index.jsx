import React from 'react';
import { useState } from 'react';
import { Card, CardBody, Popover, PopoverBody, Button, PopoverHeader } from 'reactstrap';
import chatBot from '../../../images/chatboticon.svg';
import chatBotClose from '../../../images/closeicon.svg';
import '../../../../node_modules/@popperjs/core/lib/popper'

export default function ChatBotAuth() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className='al_chatbotauth'>
        <Card className={!isOpen ? "al_chatclose" : "al_chatopen"}>
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
        <Button id="chatpopover" type="button" onClick={() => setIsOpen(!isOpen)}>
          {!isOpen && <img src={chatBot} type='button' onClick={() => setIsOpen(!isOpen)} alt="bot" />}
          {isOpen && <img src={chatBotClose} id="poptrigger" onClick={() => setIsOpen(!isOpen)} alt="bot" />}
        </Button>
        <Popover
          placement="left"
          target="chatpopover"
          trigger="click"
          isOpen={!isOpen}
          modifiers={{ preventOverflow: { boundariesElement: 'window' } }}
        >
          <PopoverBody>
            Hi, I am Alfred your navigator and health coach
          </PopoverBody>
        </Popover>
      </div>
    </>
  );
}
