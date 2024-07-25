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
        <Icon icon="fluent:call-24-regular" />
        971-335-2875
      </li>
      <li className='me-4'>
        <Icon icon="bi:envelope" />
        support@helloalfred.ai
      </li>
    </ul>
  );
}
