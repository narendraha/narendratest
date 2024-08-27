import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';
import Section from './Section';
import { Row, Col, Card, CardBody } from 'reactstrap';
import bloodthinners from '../../images/coronary.png';
import alcohol from '../../images/alcohol.png';

export default function StrokeRisk() {
  pageTitle('Stroke Risk');
  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/strokeriskbg.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="The risk of stroke in patients with AFib is evaluated using the CHA₂DS₂-VASc score"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Stroke Risk
          </h3>
          <p className="text-center">Some patients with Afib have a higher risk of stroke than the average person. The risk of stroke in patients with AFib is evaluated using the <strong>CHA₂DS₂-VASc</strong> score. This scoring system helps healthcare providers estimate the stroke risk. It also helps them to choose the best anticoagulation treatment for each patient.</p>
          <h5><strong>CHA₂DS₂-VASc</strong> Scoring System</h5>
          <Row className='align-items-center'>
            <Col lg="7" md="12" className='mb-5'>
              <p>Each letter in the acronym corresponds to a risk factor, with points assigned to each letter:</p>
              <ul className="ulitems">
                <li><span><strong className='text-info'>C</strong>ongestive Heart Failure (1 point)</span></li>
                <li><span><strong className='text-info'>H</strong>ypertension (high blood pressure) (1 point)</span></li>
                <li><span><strong className='text-info'>A</strong>ge 75 years or older (2 points)</span></li>
                <li><span><strong className='text-info'>D</strong>iabetes Mellitus (1 point)</span></li>
                <li><span><strong className='text-info'>S</strong>Prior Stroke, Transient Ischemic Attack (TIA), or blood clot (2 points)</span></li>
                <li><span><strong className='text-info'>V</strong>ascular Disease (e.g., peripheral artery disease, history of myocardial infarction) (1 point)</span></li>
                <li><span><strong className='text-info'>A</strong>ge 65-74 years (1 point)</span></li>
                <li><span><strong className='text-info'>S</strong>ex Category (Female sex) (1 point)</span></li>
              </ul>
            </Col>
            <Col lg="5" md="12" className='mb-5'>
              <Card className="al_cardbg">
                <CardBody>
                  <h6>Interpreting the Score:</h6>
                  <ol type="1" style={{ fontSize: "14px" }}>
                    <li><strong>0 points:</strong> Low risk (consider no anticoagulation or aspirin)</li>
                    <li><strong>1 point (men), 2 points (women):</strong> Intermediate risk (consider oral anticoagulation)</li>
                    <li><strong>2 or more points (men), 3 or more points (women):</strong> High risk (recommend oral anticoagulation)</li>
                  </ol>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card className="al_cardview mb-5">
            <CardBody className='p-5'>
              <h6>Anticoagulation Therapy</h6>
              <Row>
                <Col lg="8" sm="12" className='pe-5'>
                  <p>Patients with higher <strong>CHA₂DS₂-VASc</strong> scores are prescribed anticoagulation medication (blood thinners) to reduce the risk of stroke. Some common anticoagulants:</p>
                  <ul className='mt-2 ulitems'>
                    <li className='mb-3'><span><span className='fw-semibold'>Warfarin (Coumadin):</span> needs regular blood testing (INR). Some foods can make this medicine more concentrated in the body which can cause bleeding.</span></li>
                    <li><span><span className='fw-semibold'>Direct Oral Anticoagulants (DOACs):</span>These are medications like apixaban (Eliquis), rivaroxaban (Xarelto), dabigatran (Pradaxa), and edoxaban (Savaysa). DOACs do not need regular blood tests and have fewer dietary interactions.</span></li>
                  </ul>
                </Col>
                <Col lg="4" sm="12">
                  <img src={bloodthinners} alt="" className='cs_radius_20' />
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Card className="al_cardview mb-5">
            <CardBody className='p-5'>
              <h6>Balancing Stroke Risk and Bleeding Risk</h6>
              <Row>
                <Col lg="4" sm="12">
                  <img src={alcohol} alt="" className='cs_radius_20' />
                </Col>
                <Col lg="8" sm="12" className='ps-5'>
                  <p>While anticoagulants lower the risk of stroke, they can also increase the risk of bleeding. The decision to use anticoagulants to prevent stroke must be balanced with the risk of bleeding. This can be evaluated using tools like the HAS-BLED score. The <strong>HAS-BLED</strong> score helps to figure out a patient’s bleeding risk.</p>
                  <strong style={{ fontSize: "13px" }}>Stroke Prevention Beyond Anticoagulation:</strong>
                  <ul className='mt-2 ulitems'>
                    <li className='mb-3'><span><span className='fw-semibold'>Left Atrial Appendage Occlusion (LAAO):</span> For patients who cannot take long-term anticoagulation, devices like the Watchman can be implanted to block the left atrial appendage, an area in the heart where clots often form in AFib.</span></li>
                    <li><span><span className='fw-semibold'>Lifestyle Modifications:</span>Managing blood pressure, controlling diabetes, decreasing alcohol intake, and keeping a healthy weight can help decrease stroke risk in AFib.</span></li>
                  </ul>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <p className='mb-5'>Managing stroke risk in AFib requires a comprehensive approach that takes into account personal risk factors and uses medication when needed. Regular follow-up visits with healthcare providers is important to adjust treatment as needed.</p>
        </div>
      </Section>
    </>
  );
}
