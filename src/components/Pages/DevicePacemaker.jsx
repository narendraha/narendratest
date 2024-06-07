import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';
import { Row, Col } from 'reactstrap';
import pacemaker from '../../images/pacemaker.jpg';

export default function DevicePacemaker() {
  pageTitle('Device/Pacemaker');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/pacemaker_banner.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="When treating atrial fibrillation, you can have slow heart rate from the medications"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Device/Pacemaker
          </h3>
          <Row className='my-5'>
            <Col>
              <p>When treating atrial fibrillation, you can have slow heart rate from the medications, but to continue to take medications we may recommend a pacemaker for the slow heart rate.</p>
              <p>If all attempts to keep you out  of atrial fibrillation, and your heart rate is going fast, your health care providers may recommend a pacemaker and cauterization of the av node ( nerve between the junction of the top chamber and bottom chamber) so that the atrial fibrillation cannot make your bottom chamber go very fast, and the bottom chambers of the heart are regulated by the pacemaker and your heart will be dependent on the pacemaker.</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={pacemaker} alt="pacemaker" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
