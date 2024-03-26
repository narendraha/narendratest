import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterStyle3 from '../Footer/FooterStyle3';
import Header from '../Header';
import ChatBot from '../ChatBot';

export default function Layout3() {
  return (
    <div id='al_main_landing'>
      <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
      <Outlet />
      <ChatBot />
      <FooterStyle3 />
    </div>
  );
}
