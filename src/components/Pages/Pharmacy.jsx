import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/PageTitle';
import loginto from '../../images/loginto.svg';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Pharmacy() {
  pageTitle('Pharmacy');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/pharmacybg.png"
        title="Health & wellness are in bloom"
        subTitle="Login to find nearest pharmacy, and or the costs of different medications provided by your pharmacy"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <Row className='w-80 mx-auto mb-5 align-items-center'>
            <Col>
              <h6 className='mb-1'>Login to find nearest pharmacy, and or the costs of different medications provided by your pharmacy</h6>
              <Link to="/signin" className="w_signin">Sign in</Link>
            </Col>
            <div className='w-auto'>
              <img src={loginto} alt="" width={300} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
