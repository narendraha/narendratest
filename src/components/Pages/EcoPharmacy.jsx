import React from 'react';
import { pageTitle } from '../../_mock/PageTitle';
import BannerSectionStyle from './Section/BannerSectionStyle';

export default function EcoPharmacy() {
  pageTitle('Health Partners - Pharmacy');
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
