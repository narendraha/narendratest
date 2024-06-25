import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import Section from '../Section';
import { Row, Col, Card, CardBody } from 'reactstrap';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';

export default function Ablation() {
  pageTitle('Ablation');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/about/faq.png"
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="Rhythm control may be used when Afib symptoms get worse."
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Ablation
          </h3>
          <h6 className='w-80'>If you have symptoms and effecting quality of life or if you don’t have symptoms but have risk factors, then we recommend rhythm control</h6>
          <p className='mb-5'>Ablation- freezing or cauterization of the electrical connections around the veins.</p>
          <Row className='mb-5'>
            <Col lg="5" md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>a</span></div>
                    <Col>
                      <p className='mb-0'>This does not cure but gives relief 60-70% of the time for a year before atrial fibrillation may come back.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span>b</span></div>
                    <Col>
                      <p className='mb-0'>Most patients need a second procedure.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className='mb-5'>
            <Col lg="5" md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>c</span></div>
                    <Col>
                      <p className='mb-0'>We may continue to treat with antiarrhythmic medication to keep you in normal rhythm</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="5" md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span>d</span></div>
                    <Col>
                      <p className='mb-0'>Ablation is not a ticket to stop blood thinner, the decision to stop or continue blood thinner will depend on your medical conditions and the risk score called chadsvasc score (2 to 3 or higher, we recommend continuing blood thinner)</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Section>
    </>
  );
}
