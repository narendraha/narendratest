import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function ACO() {
  pageTitle('Accountable Care Organization');
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
