import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Footer from '../MainLayout/Footer';
import Loading from '../MainLayout/Loading';
import Header from '../MainLayout/Header';

export default function Layout3() {
  return (
    <Row className='h-100 mx-0'>
      <Suspense fallback={<Loading />}>
        <Col lg="12" id='al_main_landing' className='px-0'>
          <Header logoSrc="/images/alfredlogo.svg" variant="cs_heading_color" />
          <Outlet />
          <Footer />
        </Col>
      </Suspense>
    </Row>
  );
}
