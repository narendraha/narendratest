import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../helpers/PageTitle';
import congestive from '../../images/congestive.png';
import Section from '../DeafaultPages/Section';
import BannerSectionStyle3 from '../DeafaultPages/Section/BannerSection/BannerSectionStyle3';

export default function Congestive() {
  pageTitle('Congestive Heart Failure');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/congestivebg.png"
        title="Don’t Let Your Health<br/>Take a Backseat!"
        subTitle="Consider appropriate testing and evaluations"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Congestive Heart Failure (Weak or stiff heart pump)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>If you have heart disease, such as weak or stiff heart muscle (congestive heart failure) can lead to atrial fibrillation.</p>
              <p>Your health care provider will assess these risks, and consider appropriate testing and evaluations.</p>
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
