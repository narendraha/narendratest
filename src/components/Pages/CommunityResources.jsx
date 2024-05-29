import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';

export default function CommunityResources() {
  pageTitle('Community Resources(Health Equity)');
  return (
    <>
    <BannerSectionStyle3
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="/images/comingsoon.png"
        title="We are coming soon"
        subTitle="Work in Progress"
      />
    </>
  );
}
