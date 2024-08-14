import { Icon } from '@iconify/react';
import React from 'react';

let email = "support@helloalfred.ai";

export default function ContactInfoWidget() {
  return (
    <ul className="cs_contact_widget d-flex">
      {/* <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        123 Anywhere St., Any City 12345
      </li> */}
      <li className='me-4'>
        <Icon icon="fluent:call-24-regular" />
        +1 971-335-2875
      </li>
      <li className='me-4'>
        <Icon icon="bi:envelope" />
        <a href={`https://mail.google.com/mail/u/0/?fs=1&to=${email}&tf=cm`} className="py-0" target='blank'>support@helloalfred.ai</a>
      </li>
    </ul>
  );
}
