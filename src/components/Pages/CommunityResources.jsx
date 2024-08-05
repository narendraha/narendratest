import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';
import { Col, Row } from 'reactstrap';
import communityresource from '../../images/communityresource.png';
import Section from './Section';

export default function CommunityResources() {
  pageTitle('Community Resources(Health Equity)');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/communityresourcebg.png"
        title="Community resources are invaluable in the treatment of Afib"
        subTitle="These resources include local support groups, educational workshops, and wellness programs"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Community resources
          </h3>
          <Row className='mb-5 align-items-center'>
            <Col>
              <p>Community resources include local support groups, educational workshops, and wellness programs that offer information about AFib, its treatment options, and lifestyle changes to improve health. </p>
              <p>Community health programs can also provide help with managing symptoms, accessing affordable healthcare services, and connecting with other people facing similar challenges.</p>
              <p>By engaging with community resources, AFib patients can gain support, stay informed about their condition, and improve their overall well-being.</p>
              <p>Utilizing these local resources helps build a supportive network, ensuring comprehensive care, and foster a better quality of life for those living with AFib.</p>
            </Col>
            <div className='w-auto'>
              <img src={communityresource} alt="" width={300} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
