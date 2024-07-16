import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import heartvalves from '../../images/heartvalves.png';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function HeartValves() {
  pageTitle('Heart Valves');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/heartvalvesbg.png"
        title="Don’t Let Your Health<br/>Take a Backseat!"
        subTitle="Consider appropriate testing and evaluations"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Heart Valves (Valvular Heart Disease)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>If you have heart disease, such as leaky or narrow heart valves can lead to atrial fibrillation.</p>
              <p>Your health care provider will assess these risks, and consider appropriate testing and evaluations.</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={heartvalves} alt="heartvalves" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>

  );
}
