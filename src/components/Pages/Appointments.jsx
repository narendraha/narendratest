import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import loginto from '../../images/loginto.svg';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Appointments() {
  pageTitle('Appointments');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/appointments/banner_img.png"
        title="Health & wellness are in bloom"
        subTitle="Regular visits to your healthcare provider are key to effectively managing atrial fibrillation (AFib)"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Appointments
          </h3>
          <Row className='mb-5 align-items-center'>
            <Col>
              <p>These appointments allow for ongoing monitoring of your condition, checking how well treatments are working, and adjusting medications as needed. This is important to prevent complications like stroke and improve overall heart health.  During these visits, your doctor will:</p>
              <ol type="a">
                <li>Evaluate your heart rhythm</li>
                <li>Review any symptoms or side effects of treatment</li>
                <li>Perform tests to track the progression of AFib</li>
              </ol>
              <p>Sticking to your appointment schedule helps manage AFib effectively, improve your quality of life, and provide the support and guidance needed to handle your condition.</p>
              <h6 className='mb-1'>Login to make appointments with providers in your health system</h6>
              <p>(if your health system uses our application)</p>
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
