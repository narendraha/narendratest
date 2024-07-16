import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import sleepapnea from "../../images/sleepapnea.jpg";
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Sleepapnea() {
  pageTitle('Sleep apnea');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/sleepapneabg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="We don’t know what causes atrial fibrillation"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Sleep apnea
          </h3>
          <Row className='my-5'>
            <Col>
              <p>We may evaluate for sleep apnea as it decreases the risk of recurrences. We optimize blood pressure control and diabetes.</p>
              <p>To achieve the above goals, we usually recommend to follow up with interdisciplinary team of providers available in your region or your health system</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={sleepapnea} alt="sleepapnea" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
