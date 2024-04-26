import React from 'react';
import SocialWidget from '../Widget/SocialWidget';
import TextWidget from '../Widget/TextWidget';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import { Row, Col } from 'reactstrap';

export default function FooterStyle3() {
  return (
    <footer className="cs_footer cs_style_2 cs_white_color">
      <div className="cs_footer_bottom">
        <div className="container">
          <Row>
            <Col>
              <div className="cs_footer_col">
                <ContactInfoWidget />
              </div>
            </Col>
            <Col>
              <div className="cs_copyright">
                Copyright © {new Date().getFullYear()} HelloAlfred. All rights reserved.
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </footer>
  );
}
