import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';

export default function HomeStyle3() {
  pageTitle('Home');
  return (
    <div className='cs_homepage'>
      <h3>Hi, I am <strong>Alfred</strong><br /> your <strong>navigator</strong> and <strong>health coach</strong></h3>
      <p>What do you want to accomplish?</p>
      <div className='cs_mainsearch'>
        <form action="#">
          <i className='icon_alfred_search' style={{ height: "auto" }}></i>
          <input
            type="text"
            placeholder="Ask a question"
          />
          <i className='icon_alfred_speech' style={{ height: "auto" }}></i>
        </form>
      </div>
      <div className='al_note pt-1'>Disclaimer: Not a medical advice</div>
      {/* <div className='w-50'>
        Chat need to be rendered here
      </div> */}
    </div>
  );
}
