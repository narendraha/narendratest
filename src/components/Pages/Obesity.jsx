import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import obesity from "../../images/obesity.png";
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Obesity() {
  pageTitle('Obesity');
  return (
    <>
      <>
        <BannerSectionStyle
          bgUrl="/images/about/banner_bg.svg"
          imgUrl="/images/obesitybg.png"
          title="Don’t Let Your Health<br/> Take a Backseat!"
          subTitle="We don’t know what causes atrial fibrillation"
        />
        <Section topMd={80} topLg={80} topXl={80}>
          <div className='w-80 mx-auto abouttop'>
            <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
              Obesity
            </h3>
            <Row className='my-5'>
              <Col>
                <p>We don’t know what causes atrial fibrillation and most of the time we do not know why an individual person has atrial fibrillation. Several risk factors have been identified including : <strong>age, high blood pressure, heart disease, thyroid disease, previous heart surgery, obstructive sleep apnea, family history of atrial fibrillation, excess body weight, lack of exercise, smoking, regular alcohol intake.</strong></p>
                <p>We may encourage you to stop smoking, decrease or stop alcohol consumption, maintain a healthy diet and weight, manage stress and sleep well.</p>
                <h6 className='mb-0'>Please log in here to access alfred knowledge base on obesity-related questionnaires linked to atrial fibrillation</h6>
                <Link to="/signin" className="w_signin">Sign in</Link>

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
