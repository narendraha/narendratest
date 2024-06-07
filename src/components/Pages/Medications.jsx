import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { pageTitle } from '../../helpers/PageTitle';
import Section from '../Section';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';

export default function Medications() {
  pageTitle('Medications');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/medicationbg.png"
        title="Rhythm control is considered<br/> to treat atrial fibrillation"
        subTitle="If you have symptoms and effecting your quality of life"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Medications
          </h3>
          <h6 className='w-80'>Studies also have shown that if you do not have symptoms but have risk factors such as age older than 65, high blood pressure, diabetes, congestive heart failure, prior stroke can still benefit from rhythm control.</h6>
          <p className='mb-5'>Anti-arrhythmic medications that suppress the atrial fibrillation from happening</p>
          <Row className='mb-5'>
            <Col lg="5" md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>a</span></div>
                    <Col>
                      <p className='mb-0'>We may consider the type of antiarrhythmic medications based on your medical conditions and test results.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span>b</span></div>
                    <Col>
                      <p className='mb-0'>The antiarrhythmic medications can cause side effects and are small risk of cardiac arrest, so we need to monitor them with periodic blood tests and EKGs.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Section>
    </>
  );
}
