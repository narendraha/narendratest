import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import exercise from '../../images/exercise.png';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Exercise() {
  pageTitle('Exercise');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/exercisebg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="We may encourage you to maintain a healthy diet and weight"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Exercise
          </h3>
          <Row className='my-5'>
            <Col>
              <p>If you’ve been diagnosed with atrial fibrillation (Afib), many exercises should be safe to continue (or start). But, it’s important to work with a healthcare professional to identify exercises that are safe for you and emergency symptoms to watch out for.</p>
              <p>In many cases, exercising with atrial fibrillation(Afib) can help you live a stronger, healthier life. Exercise can help you maintain a healthy weight, which can have benefits for heart health. There are also other cardiovascular benefits to physical activity, including slowing your resting heart rate and lowering your blood pressure. Exercise may also help relieve anxiety and stress, which may have positive effects on quality of life.</p>
              <p>We may encourage you to stop smoking, maintain a healthy diet and weight, manage stress and sleep well. To achieve the above goals, we usually recommend to follow up with interdisciplinary team of providers available in your region or your health system</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={exercise} alt="exercise" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
