import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';
import Section from './Section';
import { Card, CardBody, Col, Row } from 'reactstrap';
import tachycardia from '../../images/tachycardia.svg';
import impsymptoms from '../../images/impsymptoms.svg';
import enhquality from '../../images/enhquality.svg';

export default function RateControl() {
  pageTitle('Rate Control');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/ratecontrolbg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="Rate control in atrial fibrillation (AFib) refers to the management of the heart rate"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Rate Control
          </h3>
          <p className="text-center">Atrial fibrillation is a type of irregular heartbeat (arrhythmia) where the atria (upper chambers of the heart) beat chaotically and out of sync with the ventricles (lower chambers). This can lead to a rapid and irregular heart rate, which may cause symptoms like palpitations, shortness of breath, fatigue, and dizziness.</p>
          <h6 className="mt-5">Objectives of Rate Control in AFib:</h6>
          <Row className='aboutsecond'>
            <Col md="4" sm="12">
              <Card className="h-100">
                <CardBody>
                  <div className='imghoverbg'>
                    <img src={tachycardia} alt="history" />
                  </div>
                  <h6 className='my-4'>Preventing Tachycardia</h6>
                  <p>The main goal is to prevent the heart from beating too fast (tachycardia). This decreases the risk of complications such as heart failure and symptoms of AFib.</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" sm="12">
              <Card className="h-100">
                <CardBody>
                  <div className='imghoverbg'>
                    <img src={impsymptoms} alt="Behavior" />
                  </div>
                  <h6 className='my-4'>Improving Symptoms</h6>
                  <p>By controlling the heart rate, patients experience fewer symptoms and can take part in daily activities more comfortably.</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" sm="12">
              <Card className="h-100">
                <CardBody>
                  <div className='imghoverbg'>
                    <img src={enhquality} alt="Education" />
                  </div>
                  <h6 className='my-4'>Enhancing Quality of Life</h6>
                  <p>Rate control can help improve a patient's overall well-being and reduce the risk of hospital visits.</p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Section>
      <Section topMd={50} topLg={50} topXl={50}>
        <div className='w-80 mx-auto'>
          <Row className="mt-3">
            <Col sm="6" className="pe-5 al_border_right">
              <h6>Target Heart Rate</h6>
              <ol type="a">
                <li>The target heart rate for most patients with AFib is about 60-90 beats per minute (bpm) at rest and 90-115 bpm during moderate exercise.</li>
                <li>The exact target can change depending on the patient's age, medical conditions, and symptoms.</li>
              </ol>
            </Col>
            <Col sm="6" className="ps-5">
              <h6>Monitoring and Follow-Up</h6>
              <div>Regular monitoring is key to make sure the heart rate stays within the target range. This may done by occasional ECGs (electrocardiograms) and Holter monitoring.</div>
            </Col>
          </Row>
          <Card className="al_cardbg mt-5">
            <CardBody className="p-5">
              <h4 className="text-center mb-5">Medications Used for Rate Control</h4>
              <Row style={{ fontSize: "14px" }}>
                <Col sm="4" className="px-4 mb-3">
                  <strong>Beta-Blockers (e.g., Metoprolol, Atenolol)</strong>
                  <div className="mt-2">These drugs reduce heart rate by blocking the effects of adrenaline on the heart.</div>
                </Col>
                <Col sm="4" className="px-4 mb-3">
                  <strong>Calcium Channel Blockers (e.g., Diltiazem, Verapamil)</strong>
                  <div className="mt-2">These work by slowing down the conduction of electrical signals in the heart. This helps to control the heart rate.</div>
                </Col>
                <Col sm="4" className="px-4 mb-3">
                  <strong>Digoxin</strong>
                  <div className="mt-2">This medication helps to slow the heart rate without lowering blood pressure.</div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <p className="my-5">Rate control is the cornerstone of managing atrial fibrillation, especially in patients who may not be candidates for rhythm control treatment or who have long-standing persistent AFib.</p>
        </div>
      </Section>
    </>
  );
}
