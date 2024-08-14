import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import errorimg from '../../images/errorimg.png';
import Button from '../DefaultPages/Button';
import Spacing from '../DefaultPages/Spacing';

export default function BackToSignInErrorPage() {
  pageTitle('HelloAlfred - Medical and Healthcare App');
  return (
    <div className="cs_error cs_center text-center cs_gray_bg_1">
      <div className="container">
        <img src={errorimg} alt="error" width={230} />
        <br /><br />
        {/* <SectionHeading
          title="You are not authoried to access this page"
          variantColor="cs_white_color"
        /> */}
        <h5 className='mb-0 fw-medium'>You are not authoried to access this page</h5>
        <Spacing lg="30" md="30" />
        <Button btnText="Back to Home" btnUrl="/signin" />
      </div>
    </div>
  );
}
