import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import smoking from '../../images/smoking.png';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Smoking() {
  pageTitle('Smoking');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/smokingbg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="We may encourage you to stop smoking"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Smoking
          </h3>
          <Row className='my-5'>
            <Col>
              <p>Smoking and Risk of Atrial Fibrillation in the reasons for Geographic And Racial Differences in Stroke (REGARDS) Study</p>
              <p>Whether smoking increases the risk of atrial fibrillation (AF) remains debatable due to inconsistent reports.</p>
              <p>We examined the association between smoking and incident AF in 11,047 participants from the reasons for Geographic And Racial Differences in Stroke (REGARDS) Study, one of the largest biracial, population-based cohort studies in the USA. Baseline (2003–2007) cigarette smoking status and amount (pack-years) were self-reported. Incident AF was determined by electrocardiography and history of a prior physician diagnosis at a follow-up examination conducted after a median of 10.6 years.</p>
              <p>We may encourage you to stop smoking, maintain a healthy diet and weight, manage stress and sleep well. To achieve the above goals, we usually recommend to follow up with interdisciplinary team of providers available in your region or your health system</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={smoking} alt="smoking" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
