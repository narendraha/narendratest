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
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Sleep apnea
          </h3>
          <Row className='my-5'>
            <Col>
              <p>Sleep apnea is when breathing repeatedly stops and starts during sleep. This can have serious negative effects on people with atrial fibrillation (AFib).</p>
              <p>Sleep apnea causes poor sleep and fluctuating oxygen levels, which put stress on the heart. This stress can trigger AFib and increase the risk of heart problems.</p>
              <p>Treating sleep apnea with continuous positive airway pressure (CPAP) therapy or other methods is important for improving heart health. It can also enhance sleep quality and reduce AFib episodes.</p>
              <p>Understanding the link between these conditions helps create a treatment plan for better heart and sleep health.</p>
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
