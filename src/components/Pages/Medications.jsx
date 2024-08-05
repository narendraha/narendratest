import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Medications() {
  pageTitle('Medications');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/medicationbg.png"
        title="Rhythm control is considered<br/> to treat atrial fibrillation"
        subTitle="If you have symptoms and effecting your quality of life"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="text-center mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Medications
          </h3>
          <h6 className='text-center mb-4'>Medications play a very important role in treating atrial fibrillation (AFib), a common heart condition with irregular and often rapid heartbeats. There are three main types of medications used: anticoagulants, antiarrhythmics, and rate controllers.</h6>
          <Row>
            <Col lg="4" md="12" className='mb-5'>
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>a</span></div>
                    <Col>
                      <p className='mb-0'><strong>Anticoagulants </strong>(blood thinners) help decrease the risk of stroke by preventing blood clots. Common anticoagulants include warfarin and Eliquis.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="12" className='mb-5'>
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span>b</span></div>
                    <Col>
                      <p className='mb-0'><strong>Antiarrhythmics </strong>work to restore and keep a normal heart rhythm by targeting the irregular electrical beats in the heart. Examples of antiarrhythmics are flecainide, amiodarone, and sotalol.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4" md="12" className='mb-5'>
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>c</span></div>
                    <Col>
                      <p className='mb-0'><strong>Rate controllers </strong>help manage the heart's speed and improve its function. Metoprolol (a beta-blocker) and diltiazem (a calcium channel blocker) are common rate control medications.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <p className='mb-5 text-center'>Taking these medications as prescribed and having regular check-ups with a healthcare provider are key to reducing risks and successfully treating AFib</p>
        </div>
      </Section>
    </>
  );
}
