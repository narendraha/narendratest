import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import Section from '../Section';
import { Row, Col } from 'reactstrap';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import obesity from "../../images/obesity.png";

export default function Obesity() {
  pageTitle('Obesity');
  return (
    <>
      <>
        <BannerSectionStyle3
          bgUrl="/images/about/banner_bg.svg"
          imgUrl="/images/obesitybg.png"
          title="Don’t Let Your Health<br/> Take a Backseat!"
          subTitle="We don’t know what causes atrial fibrillation"
        />
        <Section topMd={80} topLg={80} topXl={80}>
          <div className='w-80 mx-auto abouttop'>
            <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
              Obesity
            </h3>
            <Row className='my-5'>
              <Col>
                <p>We don’t know what causes atrial fibrillation and most of the time we do not know why an individual person has atrial fibrillation. Several risk factors have been identified including : <strong>age, high blood pressure, heart disease, thyroid disease, previous heart surgery, obstructive sleep apnea, family history of atrial fibrillation, excess body weight, lack of exercise, smoking, regular alcohol intake.</strong></p>
                <p>We can have them login for taking questionnaire for their risk factors and information on it.</p>
                <p>We may encourage you to stop smoking, decrease or stop alcohol consumption, maintain a healthy diet and weight, manage stress and sleep well.</p>
              </Col>
              <div className='w-auto ps-5'>
                <img src={obesity} alt="obesity" width={330} />
              </div>
            </Row>
          </div>
        </Section>
      </>
    </>
  );
}
