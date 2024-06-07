import React, { useState } from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';
import { pageTitle } from '../../helpers/PageTitle';
import whoweare from '../../images/whoweare.jpg';
import whatwedo from '../../images/whatwedo.png';
import phistory from '../../images/phistory.svg';
import peducation from '../../images/peducation.svg';
import pbehaviour from '../../images/pbehaviour.svg';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import linkedin from '../../images/linkedin.svg';
import youtube from '../../images/youtube.svg';
import assesssymptoms from '../../images/costeffective.png';
import costeffective from '../../images/costeffective.png';
import accuratehealth from '../../images/costeffective.png';
import additionalvalue from '../../images/costeffective.png';
import { Row, Col, Card, CardBody, TabContent, TabPane, NavLink, Nav, NavItem } from 'reactstrap';
import Spacing from '../Spacing';

export default function About() {
  pageTitle('About');
  const [tab, setTab] = useState("1");
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/about/banner_img.png"
        title="Welcome to Hello Alfred<br/>Your AI Health companion"
        subTitle="Your Partner in Health and Wellness"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            ABOUT US
          </h3>
          <Row className='my-5'>
            <div className='px-3 w-auto'>
              <img src={whoweare} alt="whoweare" width={400} className="cs_radius_20" />
            </div>
            <Col className='ps-5'>
              <h4>Who We Are?</h4>
              <h6 className='fw-medium'>HelloAlfred is a smart health care platform that informs and educates patients about atrial fibrillation, and with the help of our emotionally intelligent bot named “Alfred” helps in your atrial fibrillation journey.</h6>
              <p>Alfred is your companion, health
                navigator and behavioral coach. It will try to understand your needs and attempts to guide you through your journey.
                Alfred can take your medical history on atrial fibrillation, get you ready for your health care provider appointment, provides
                personalized information and education based on your medical history</p>
              <p>Alfred will assess your willingness to change, barriers
                to change, access to care, and treatment. Its goal is to be available 24/7 on demand for your information gathering and
                education</p>
            </Col>
          </Row>
          <Spacing md="40" lg="50" xl="50" />
          <Row className='my-5'>
            <Col className='pe-5'>
              <h4>What We Do?</h4>
              <h6 className='fw-medium'>HelloAlfred is an AI-driven chatbot that offers round-the-clock availability, ensuring patients can access healthcare information and support whenever needed.</h6>
              <p>
                Alfred accepts Vitals, and symptoms from the patient, guides the patient through a process starts recommending appropriate information and education for behavioral changes.</p>
              <p>
                By analyzing patient interactions, Alfred can identify the trends, monitor health outcomes, and provide valuable insights into the patient's health.
              </p>
            </Col>
            <div className='px-3 w-auto'>
              <img src={whatwedo} alt="whatwedo" width={400} />
            </div>
          </Row>
        </div>
      </Section>
      <Section topMd={85} topLg={85} topXl={85} bottomMd={50} bottomLg={50}>
        <Row className='w-80 mx-auto aboutsecond'>
          <Col lg="4" sm="12">
            <Card>
              <CardBody>
                <div className='imghoverbg'>
                  <img src={phistory} alt="history" />
                </div>
                <h6 className='my-4'>Patients' History</h6>
                <p>Read the complete history of the patient for future analysis and guidance</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card>
              <CardBody>
                <div className='imghoverbg'>
                  <img src={pbehaviour} alt="Behavior" />
                </div>
                <h6 className='my-4'>Patients' Behavior</h6>
                <p>Alfred will assess your willingness to change, barriers to change, access to care, and treatment.</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card>
              <CardBody>
                <div className='imghoverbg'>
                  <img src={peducation} alt="Education" />
                </div>
                <h6 className='my-4'>Patient's Education</h6>
                <p>Provides completed end-to-end awareness on Afib to the patient to avoid in their day-to-day journey</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Section>
      <Section topMd={50} topLg={50} topXl={50} bottomMd={50} bottomLg={50}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Overview
          </h3>
          <p>Our Alfred chatbot has significantly influenced Afib healthcare Patients in various ways by enhancing patient engagement with round-the-clock availability by answering queries, personalized interactions, and improving the satisfaction levels of the patient.  Alfred assists in triggering the reminders by assessing the vitals, and symptoms and guiding the patients with education and awareness which helps them to move in the right direction.</p>

          <Row className='mt-5'>
            <Col md="5" sm="6" xs="12">
              <Nav tabs vertical pills className='al_verticaltabs'>
                <NavItem>
                  <NavLink
                    className={tab === "1" ? "active" : ""}
                    onClick={() => {
                      setTab("1");
                    }}
                  >
                    Symptoms Assessment
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "2" ? "active" : ""}
                    onClick={() => {
                      setTab("2");
                    }}
                  >
                    Cost-effective solution
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "3" ? "active" : ""}
                    onClick={() => {
                      setTab("3");
                    }}
                  >
                    AFib Education and Information Awareness
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "4" ? "active" : ""}
                    onClick={() => {
                      setTab("4");
                    }}
                  >
                    Adding value to the Patient Journey
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="7" sm="6" xs="12">
              <TabContent activeTab={tab}>
                <TabPane tabId="1">
                  <Row>
                    <Col className='px-4'>
                      <h6>Alfred assist in assessing the symptoms.</h6>
                      <p>Alfred guiding the patients on time through proper analysis based on the given patient's past history. Alfred recommends appropriate actions ensuring timely care to the patient.</p>
                    </Col>
                    <div className='w-auto'>
                      <img src={assesssymptoms} alt="assesssymptoms" width={250} />
                    </div>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col className='px-4'>
                      <h6>Alfred is a very cost-effective solution for Afib patients.</h6>
                      <p>Alfred saves the Doctor's case study time by generating valuable patient health reports as and when required</p>
                    </Col>
                    <div className='w-auto'>
                      <img src={costeffective} alt="costeffective" width={250} />
                    </div>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col className='px-4'>
                      <h6>Alfred provides accurate health information.</h6>
                      <p>Alfred promotes healthy behavioral habits, and takes preventive measures. Alfred replies promptly, round the clock to the patient's queries on their health.</p>
                    </Col>
                    <div className='w-auto'>
                      <img src={accuratehealth} alt="accuratehealth" width={250} />
                    </div>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col className='px-4'>
                      <h6>Alfred adds an additional value to the patient.</h6>
                      <p>Alfred helps in patient's journey day to day - as best AI companion all the time. </p>
                    </Col>
                    <div className='w-auto'>
                      <img src={additionalvalue} alt="additionalvalue" width={250} />
                    </div>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </Section>
      <Section>
        <div className='w-80 mx-auto'>
          <div className='alfaq_footer'>
            Your AI companion, health journey navigator, and coach for self-better care in managing a patient's atrial fibrillation journey
          </div>
          <p className='mb-2'>Follow Us</p>
          <div className='al_socallinks'>
            <a href="/#"><img src={facebook} alt="facebook" /></a>
            <a href="/#"><img src={twitter} alt="X" /></a>
            <a href="/#"><img src={linkedin} alt="linkedin" /></a>
            <a href="/#"><img src={youtube} alt="youtube" /></a>
          </div>
        </div>
      </Section>

    </>
  );
}
