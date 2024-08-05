import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import congestive from '../../images/congestive.png';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Congestive() {
  pageTitle('Congestive Heart Failure');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/congestivebg.png"
        title="Don’t Let Your Health<br/>Take a Backseat!"
        subTitle="Consider appropriate testing and evaluations"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Congestive Heart Failure (Weak or stiff heart pump)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>Congestive heart failure (CHF) is when the heart can't pump blood well, causing fluid to build up in the lungs and other parts of the body.</p>
              <p>This makes it hard for the heart to work properly and is often linked with atrial fibrillation (AFib). AFib causes the heart to beat irregularly, which can stress the already weak heart and make CHF symptoms worse. CHF, in turn, can make AFib episodes more frequent.</p>
              <p>Treating CHF is important for improving heart function and controlling AFib. Treatment includes medications to reduce fluid buildup, help the heart pump better, and keep a normal heart rhythm. </p>
            <p>Managing both CHF and AFib can improve a person's quality of life, so it's crucial to have coordinated and personalized treatment plans.</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={congestive} alt="congestive" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
