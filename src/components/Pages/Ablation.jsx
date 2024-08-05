import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import { getAssetsRequest } from '../../store/UtilityCallFunction/slice';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

let faq = "faq.png";

export default function Ablation() {
  pageTitle('Ablation');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssetsRequest(faq))
  }, []);

  const { assetUrl } = useSelector((state) => state?.utilityCallFunctionSlice);

  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/about/banner_bg.svg"
        imgUrl={assetUrl["faq"]}
        title="Don’t Let Your Health<br/> Take a Backseat!"
        subTitle="Rhythm control may be used when Afib symptoms get worse."
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Ablation
          </h3>
          <h6 className='w-80 mx-auto text-center'>Ablation is a procedure used to treat atrial fibrillation (AFib), a common heart condition with irregular and often fast heartbeats.</h6>
          <p className='mb-5 text-center'>This procedure involves inserting a thin tube (catheter) through a blood vessel to the heart.</p>

          <Row className='mb-5 w-80 mx-auto'>
            <Col md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>a</span></div>
                    <Col>
                      <p className='mb-0'>High bursts of energy from the catheter tips are used to destroy tiny areas of heart tissue.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span>b</span></div>
                    <Col>
                      <p className='mb-0'>The goal of ablation is to scar the irregular electrical pathways that cause AFib. This helps restore a normal heart rhythm and reduce symptoms.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className='mb-5 w-80 mx-auto'>
            <Col md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span style={{ lineHeight: "55px" }}>c</span></div>
                    <Col>
                      <p className='mb-0'>The procedure is done in a special lab and can offer long-term relief, especially for patients who haven't had success with medication.</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className='greycardbg'>
                <CardBody>
                  <Row>
                    <div className='w-auto px-3 arialLetter'><span>d</span></div>
                    <Col>
                      <p className='mb-0'>While ablation can greatly improve quality of life, you need to talk to a healthcare provider to see if it is right for you. They will also explain the risks and expected outcomes.</p>
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
