import { Icon } from '@iconify/react';
import React from 'react';

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
        <i className="cs_accent_bg">
          <Icon icon="fluent:call-24-regular" />
        </i>
        123-456-7890
      </li>
      <li className='me-4'>
        <i className="cs_accent_bg">
          <Icon icon="bi:envelope" />
        </i>
        helloalfred@gmail.com
      </li>
    </ul>
  );
}
