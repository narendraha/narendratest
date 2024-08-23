import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';
import Section from './Section';

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
        </div>
      </Section>
    </>
  );
}
