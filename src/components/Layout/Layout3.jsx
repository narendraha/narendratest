import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import FooterStyle3 from '../DeafaultPages/Footer/FooterStyle3';
import Header from '../DeafaultPages/Header';
import Loading from '../InnerApp/LoadingComponent';

export default function Layout3() {
  // const location = useLocation();
  // const [botisOpen, setBotIsOpen] = useState(true);

  return (
    // <div id='al_main_landing'>
    //   <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
    //   {location.pathname !== "/" && <ChatBot />}
    //   <Outlet />
    //   <FooterStyle3 />
    // </div>

    <Row className='h-100 mx-0'>
      <Suspense fallback={<Loading />}>
        <Col lg="12" id='al_main_landing' className='px-0'>
          <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
          <Outlet />
          <FooterStyle3 />
        </Col>
      </Suspense>
      {/* {location.pathname !== "/" && <>
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
            Hello, I am Alfred! How can i assist you today?
          </PopoverBody>
        </Popover>
        }
      </>
      } */}

    </Row>
  );
}
