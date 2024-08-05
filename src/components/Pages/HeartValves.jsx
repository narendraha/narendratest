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
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Heart Valves (Valvular Heart Disease)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>Heart valves control blood flow through the heart's chambers, ensuring that blood moves in the right direction.</p>
              <p>If a valve is narrowed (stenosis) or leaky (regurgitation), it can disrupt normal blood flow. This puts extra strain on the heart and can increase the risk of irregular heart rhythms like atrial fibrillation (AFib).</p>
              <p>Treating heart valve problems with medications, lifestyle changes, or surgery is important for controlling AFib. Understanding how heart valve function affects AFib helps create a comprehensive treatment plan for both conditions.</p>
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
