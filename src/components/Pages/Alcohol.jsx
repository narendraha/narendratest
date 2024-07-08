import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../helpers/PageTitle';
import alcohol from '../../images/alcohol.png';
import Section from '../DeafaultPages/Section';
import BannerSectionStyle3 from '../DeafaultPages/Section/BannerSection/BannerSectionStyle3';

export default function Alcohol() {
  pageTitle('Alcohol');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/alocoholbg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="We may encourage you to decrease or stop alcohol consumption"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Alcohol
          </h3>
          <Row className='my-5'>
            <Col>
              <p>Heavy alcohol consumption is an established risk factor for atrial fibrillation(AF). However, the association between habitual changes in heavy habitual drinkers and incident AF remains unclear.</p>
              <p>The treatment of atrial fibrillation(AF) has made significant progress, but the prevention of AF has not received the attention it deserves. A few recent large-sized studies have conducted dose response analysis and reported different conclusions from previous studies on alcohol consumption and AF risk.</p>
              <p>We may encourage you to decrease or stop alcohol consumption, maintain a healthy diet and weight, manage stress and sleep well. To achieve the above goals, we usually recommend to follow up with interdisciplinary team of providers available in your region or your health system</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={alcohol} alt="alcohol" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
