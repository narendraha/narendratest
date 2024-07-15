import React from 'react';
import { pageTitle } from '../../_mock/PageTitle';
import Button from '../DefaultPages/Button';
import SectionHeading from '../DefaultPages/SectionHeading';
import Spacing from '../DefaultPages/Spacing';

export default function ErrorPage() {
  pageTitle('Error');
  return (
    <div className="cs_error cs_center text-center cs_gray_bg_1">
      <div className="container">
        <SectionHeading
          title="This page could <br> not be found."
          titleUp="404 Error"
          variantColor="cs_white_color"
        />
        <Spacing lg="30" md="30" />
        <Button btnText="Back To Home" btnUrl="/" />
      </div>
    </div>
  );
}
