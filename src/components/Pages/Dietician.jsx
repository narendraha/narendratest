import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function Dietician() {
  pageTitle('Dietician');
  return (
    <>
    <BannerSectionStyle
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/comingsoon.png"
        title="We are coming soon"
        subTitle="Work in Progress"
      />
    </>
  );
}
