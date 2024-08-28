import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';
import Section from './Section';
import { Row, Col, Card, CardBody } from 'reactstrap';
import tachycardia from '../../images/tachycardia.svg';
import impsymptoms from '../../images/impsymptoms.svg';
import enhquality from '../../images/enhquality.svg';
import precomplications from '../../images/precomplications.svg';
import medicationsanti from '../../images/medicationsanti.jpg';
import electriccardio from '../../images/electriccardio.jpg';
import cathetertypes from '../../images/cathetertypes.jpg';
import surgicalappr from '../../images/surgicalappr.jpg';

export default function RhythmControl() {
  pageTitle('Rhythm Control');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/rhythmbg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="Rhythm control restores the heart back to a normal heart rhythm known as sinus rhythm"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Rhythm Control
          </h3>
          <p className="text-center">Rhythm control restores the heart back to a normal heart rhythm known as sinus rhythm. It can also help keep a heart in a normal rhythm. This is different from **rate control**, which only focuses on controlling the heart rate without changing the irregular rhythm itself.</p>
          <h5 className="mt-5">Objectives of Rhythm Control in AFib </h5>
          <Row>
            <Col md="6" sm="12" className="mb-3">
              <Card className="al_cardbg h-100">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className='imghoverbg'>
                      <img src={tachycardia} alt="history" />
                    </div>
                    <div className="col ps-3 abouttop">
                      <strong>Restore Normal Heart Rhythm</strong>
                      <p className="mb-0 mt-2">The primary goal is to convert an irregular and chaotic rhythm to a normal sinus rhythm.</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" sm="12" className="mb-3">
              <Card className="al_cardbg h-100">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className='imghoverbg'>
                      <img src={impsymptoms} alt="history" />
                    </div>
                    <div className="col ps-3 abouttop">
                      <strong>Reduce Symptoms</strong>
                      <p className="mb-0 mt-2">The primary goal is to convert an irregular and chaotic rhythm to a normal sinus rhythm.</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" sm="12" className="mb-3">
              <Card className="al_cardbg h-100">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className='imghoverbg'>
                      <img src={precomplications} alt="history" />
                    </div>
                    <div className="col ps-3 abouttop">
                      <strong>Prevent Complications</strong>
                      <p className="mb-0 mt-2">For some patients keeping a normal rhythm may reduce heart failure and other complications associated with AFib.</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" sm="12" className="mb-3">
              <Card className="al_cardbg h-100">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className='imghoverbg'>
                      <img src={enhquality} alt="history" />
                    </div>
                    <div className="col ps-3 abouttop">
                      <strong>Improve Quality of Life</strong>
                      <p className="mb-0 mt-2">Some patients feel significantly better and have an improved quality of life when their heart rhythm is normal.</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Section>
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto mb-5'>
          <h5>Methods of Rhythm Control</h5>
          <Row className="mt-4">
            <Col md="4" sm="12">
              <img src={medicationsanti} alt="" className="cs_radius_20" />
            </Col>
            <Col md="8" sm="12" className="abouttop ps-5">
              <strong>Medications (Antiarrhythmic Drugs)</strong>
              <p className="mt-3">Flecainide, Propafenone, Amiodarone, Sotalol, and Dronedarone are examples. These medications help keep sinus rhythm, but they may have more risk of side effects compared to rate control. Your provider will decide which medication is best for you.</p>
            </Col>
          </Row>
          <Row className="flex-column-xs-reverse mt-5">
            <Col md="8" sm="12" className="abouttop pe-5">
              <strong>Electrical Cardioversion</strong>
              <p className="mt-3">Electrical cardioversion is a procedure where a controlled electrical shock is delivered to the heart to reset its rhythm back to normal.</p>
              <p>It is used when the heart stays in AFib continuously and may be combined with antiarrhythmic drugs to help keep sinus rhythm afterward.</p>
              <p>Patients often take anticoagulation before and after the procedure to reduce the risk of stroke.</p>
            </Col>
            <Col md="4" sm="12">
              <img src={electriccardio} alt="" className="cs_radius_20" />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="4" sm="12">
                <img src={cathetertypes} alt="" className="cs_radius_20" />
            </Col>
            <Col md="8" sm="12" className="abouttop ps-5">
              <strong>Catheter Ablation</strong>
              <p className="mt-3">In ablation, a catheter (thin, hollow tube) is guided to the inside of the heart through a vein. Tiny areas of heart tissue where the irregular electrical signals come from are destroyed using heat (radiofrequency), cold (cryoablation), or electrical impulse (PFA).</p>
              <p>Ablation is considered when medications do not work or cause side-effects. It can be especially successful for patients with paroxysmal AFib (intermittent episodes).</p>
              <p>Ablation has a higher success rate in keeping sinus rhythm compared to medications alone but requires a procedure and has potential for risks.</p>
            </Col>
          </Row>
          <Row className="flex-column-xs-reverse mt-5">
            <Col md="8" sm="12" className="abouttop pe-5">
              <strong>Surgical Approaches (e.g., Maze Procedure or epicardial ablation)</strong>
              <p className="mt-3">The Maze procedure is a surgery on the outside of the heart. Scar tissue is created in the top part of the heart (atrium) to block abnormal electrical pathways.</p>
              <p>Usually, the procedure is done with other open-heart surgeries like coronary bypass or valve replacement.</p>
            </Col>
            <Col md="4" sm="12">
              <img src={surgicalappr} alt="" className="cs_radius_20" />
            </Col>
          </Row>
        </div>
      </Section>
    </>
  );
}
