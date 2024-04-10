import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FooterStyle3 from '../Footer/FooterStyle3';
import Header from '../Header';
import ChatBot from '../ChatBot';
import { Row, Col, Popover, PopoverBody, Button } from 'reactstrap';
import chatBot from '../../images/chatboticon.svg';

export default function Layout3() {
  const location = useLocation();
  const [botisOpen, setBotIsOpen] = useState(true);

  return (
    // <div id='al_main_landing'>
    //   <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
    //   {location.pathname !== "/" && <ChatBot />}
    //   <Outlet />
    //   <FooterStyle3 />
    // </div>

    <Row className='h-100 mx-0'>
      <Col lg={(location.pathname !== "/" && botisOpen ? "9" : "12")} id='al_main_landing' className={'px-0' + (location.pathname !== "/" && botisOpen ? ' al_homechatopen' : '')}>
        <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
        <Outlet />
        <FooterStyle3 />
      </Col>
      {location.pathname !== "/" && <>
        {botisOpen && <Col lg="3" className='px-1'>
          <ChatBot botisOpen={botisOpen} setBotIsOpen={setBotIsOpen} />
        </Col>}

        <Button id="homechatpopover" type="button" className='p-0 al_chat'>
          {!botisOpen && <img src={chatBot} alt="bot" id="homechatpopover" onClick={() => setBotIsOpen(!botisOpen)} />
          }</Button>

        {!botisOpen && <Popover
          placement="left"
          target="homechatpopover"
          trigger="legacy"
          isOpen={!botisOpen}
          modifiers={{ preventOverflow: { boundariesElement: 'window' } }}
        >
          <PopoverBody>
            Hello, I am Alfred! How can i Assist you today?
          </PopoverBody>
        </Popover>
        }
      </>
      }

    </Row>
  );
}
