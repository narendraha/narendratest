import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { pageTitle } from '../../_mock/helperIndex';
import coronary from '../../images/coronary.png';
import { getAssetsRequest } from '../../store/UtilityCallFunction/slice';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';

let coronarybg = "coronarybg.png"

export default function Coronary() {
  pageTitle('Coronary');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssetsRequest(coronarybg))
  }, []);

  const { assetUrl } = useSelector((state) => state?.utilityCallFunctionSlice);

  return (
    <>
      <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl={coronary}
        title="Don’t Let Your Health<br/>Take a Backseat!"
        subTitle="Consider appropriate testing and evaluations"
      />
      <Section topMd={80} topLg={80} topXl={80}>
        <div className='w-80 mx-auto abouttop'>
          <h3 className="mb-5 cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
            Coronary Artery Disease (Heart artery blockages)
          </h3>
          <Row className='my-5'>
            <Col>
              <p>If you have heart disease, such as heart artery blockages can lead to atrial fibrillation.</p>
              <p>Your health care provider will assess these risks, and consider appropriate testing and evaluations.</p>
            </Col>
            <div className='w-auto ps-5'>
              <img src={assetUrl?.["coronarybg"]} alt="coronary" width={330} />
            </div>
          </Row>
        </div>
      </Section>
    </>
  );
}
