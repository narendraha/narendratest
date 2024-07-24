import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import vascular from '../../images/vascular.png';
import BannerSectionStyle from './Section/BannerSectionStyle';
import Section from './Section/index';

export default function Vascular() {
  pageTitle('Vascular');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/vascularbg.png"
        title="Don’t Let Your Health<br/>Take a Backseat!"
        subTitle="Consider appropriate testing and evaluations"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Vascular Disease (Blood Circulation)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>If you have heart disease, such as narrowing of blood vessels can lead to atrial fibrillation.</p>
              <p>Your health care provider will assess these risks, and consider appropriate testing and evaluations.</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={vascular} alt="vascular" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
