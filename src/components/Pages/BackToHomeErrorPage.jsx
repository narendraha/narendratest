import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import errorimghome from '../../images/errorimg.png';
import Button from '../DefaultPages/Button';
import Spacing from '../DefaultPages/Spacing';

export default function BackToHomeErrorPage() {
  pageTitle('HelloAlfred - Medical and Healthcare App');

  return (
    <div className="cs_error cs_center text-center cs_gray_bg_1">
      <div className="container">
        <img src={errorimghome} alt="error" width={230} />
        <br /><br />
        <h5 className='mb-0 fw-medium'>Oops! This page doesn't exist</h5>
        <Spacing lg="30" md="30" />
        <Button btnText="Back to Home" btnUrl="/home" />
      </div>
    </div>
  );
}
