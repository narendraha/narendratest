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
          <h6 className='w-80 mx-auto text-center'>If you have symptoms and effecting quality of life or if you don’t have symptoms but have risk factors, then we recommend rhythm control</h6>
          <p className='mb-5 text-center'>Ablation- freezing or cauterization of the electrical connections around the veins.</p>
          <Row className='mb-5 w-80 mx-auto'>
            <Col md="6">
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
            <Col md="6">
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
          <Row className='mb-5 w-80 mx-auto'>
            <Col md="6">
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
            <Col md="6">
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
