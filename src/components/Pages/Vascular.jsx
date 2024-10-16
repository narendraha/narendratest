import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import { getAssetsRequest } from '../../store/UtilityCallFunction/slice';
import BannerSectionStyle from './Section/BannerSectionStyle';
import Section from './Section/index';

let vascular = "vascular.png";

export default function Vascular() {
  pageTitle('Vascular');

  const dispatch = useDispatch();
  const { assetUrl } = useSelector((state) => state?.utilityCallFunctionSlice);

  useEffect(() => {
    dispatch(getAssetsRequest(vascular))
  }, [dispatch]);

  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/vascularbg.png"
        title="Don’t Let Your Health<br/>Take a Backseat!"
        subTitle="Consider appropriate testing and evaluations"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Vascular Disease (Blood Circulation)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>Vascular disease refers to conditions that affect the blood vessels, including arteries and veins. These blood vessels are an important of the body’s cardiovascular system. Conditions like peripheral artery disease (PAD) and carotid artery disease (CAD) involve the narrowing or blockage of blood vessels which reduces blood flow and increases the risk of heart problems.</p>
              <p>These issues can worsen atrial fibrillation (AFib) by disrupting normal blood flow and putting extra strain on the heart. Vascular disease can make AFib symptoms worse. It can also increase the risk of stroke because poor blood flow can lead to blood clots.</p>
              <p>Treating vascular disease with lifestyle changes, medications, and medical treatments is important for controlling AFib and improving heart health.</p>
              <p>Understanding the link between vascular disease and AFib helps create a complete treatment plan that addresses both conditions and improves patient outcomes</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={assetUrl?.["vascular"]} alt="vascular" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
