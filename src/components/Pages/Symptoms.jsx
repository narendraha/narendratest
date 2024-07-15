import React from 'react';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/PageTitle';
import chestpain from '../../images/chestpain.png';
import diziness from '../../images/diziness.png';
import fatigue from '../../images/fatigue.png';
import headedness from '../../images/headedness.png';
import shortnessbreath from '../../images/shortnessbreath.png';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Symptoms() {
  pageTitle('Symptoms');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/symptomsbg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="The symptoms can vary from person to person and can vary in intensity too."
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Symptoms
          </h3>
          <h6 className='text-center'>The symptoms can vary from person to person and can vary in intensity too. Common symptoms are</h6>
          <Row className='my-5 symptomssec'>
            <Col lg md="4" sm="6">
              <img src={chestpain} alt="chestpain" height={165} />
              <h6 className='fw-medium mt-3'>Chest pain</h6>
            </Col>
            <Col lg md="4" sm="6">
              <img src={shortnessbreath} alt="shortnessbreath" height={165} />
              <h6 className='fw-medium mt-3'>Shortness of breath</h6>
            </Col>
            <Col lg md="4" sm="6">
              <img src={fatigue} alt="fatigue" height={165} />
              <h6 className='fw-medium mt-3'>Fatigue</h6>
            </Col>
            <Col lg md="4" sm="6">
              <img src={headedness} alt="headedness" height={165} />
              <h6 className='fw-medium mt-3'>Light headedness</h6>
            </Col>
            <Col lg md="4" sm="6">
              <img src={diziness} alt="diziness" height={165} />
              <h6 className='fw-medium mt-3'>Dizziness</h6>
            </Col>
          </Row>
        </div>
      </Section>
    </>
  );
}