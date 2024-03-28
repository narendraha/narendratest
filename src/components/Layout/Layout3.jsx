import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FooterStyle3 from '../Footer/FooterStyle3';
import Header from '../Header';
import ChatBot from '../ChatBot';


export default function Layout3() {
  const location = useLocation();
  return (
    <div id='al_main_landing'>
      <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
      {location.pathname !== "/" && <ChatBot />}
      <Outlet />
      <FooterStyle3 />
    </div>
  );
}
