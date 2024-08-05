import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import loginto from '../../images/loginto.svg';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Pharmacy() {
  pageTitle('Pharmacy');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/pharmacybg.png"
        title="Health & wellness are in bloom"
        subTitle="Pharmacy services play an important role in the treatment of atrial fibrillation (AFib)"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
        <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Pharmacy
          </h3>
          <Row className='mb-5 align-items-center'>
            <Col>
              <p>Pharmacy services play an important role in the treatment of atrial fibrillation (AFib) by making sure that patients receive the correct medications.</p>
              <p>Pharmacists dispense medications such as anticoagulants to reduce stroke risk, antiarrhythmics to manage heart rhythm, and rate control drugs to control heart rate. They also offer valuable guidance on medication adherence, possible side effects, and interactions with other medicines.</p>
              <p>By offering personalized review of medications, pharmacists help refine treatment plans, increase patient safety, and improve overall health results.</p>
              <p>Working with pharmacy services ensures that AFib patients receive the expert advice and support needed to manage their condition effectively and support their cardiovascular health.</p>
              <h6 className='mb-1'>Login to find nearest pharmacy, and or the costs of different medications provided by your pharmacy</h6>
              <Link to="/signin" className="w_signin">Sign in</Link>
            </Col>
            <div className='w-auto'>
              <img src={loginto} alt="" width={300} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
