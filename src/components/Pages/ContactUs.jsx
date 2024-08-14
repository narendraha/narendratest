import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import { Row, Col, UncontrolledPopover, PopoverBody } from 'reactstrap';
import linkedin from '../../images/linkedin.svg';
import twitter from '../../images/twitter.svg';
import youtube from '../../images/youtube.svg';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';
import ContactForm from '../DefaultPages/ContactForm';
import usamap from '../../images/usamap.png';

export default function ContactUs() {
    pageTitle('Contact Us');
    return (
        <>
            <BannerSectionStyle
                bgUrl="/images/about/banner_bg.svg"
                imgUrl="/images/about/contact_banner.png"
                title="Heart Health Starts with<br/>a Conversation"
                subTitle="Get in Touch with Us Today!"
            />
            <Section topMd={50} topLg={50} topXl={80}>
                <div className='w-75 mx-auto abouttop'>
                    <h3 className="mb-5 text-center cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
                        Get in touch
                    </h3>
                </div>
            </Section>
            <Section>
                <div className='w-80 mx-auto mb-5'>
                    <Row>
                        <Col md="5" sm="12" className='mt-4 pe-5'>
                            <ContactForm />
                        </Col>
                        <Col md="7" sm="12" className='mt-4 position-relative'>
                            <div className='position-relative'>
                                <img src={usamap} alt="" />
                                <div className='map-footer_dot' id="maplocation">
                                    <UncontrolledPopover
                                        placement="top"
                                        target="maplocation"
                                        trigger="hover"
                                        modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                                    >
                                        <PopoverBody className='px-4'>
                                            <h6 className='mb-2'>Address</h6>
                                            <p className='mb-2'>AlfredAI Inc</p>
                                            <p className='mb-2'>9106 Bayshore Bend</p>
                                            <p className='mb-2'>Austin, TX 78726</p>
                                        </PopoverBody>
                                    </UncontrolledPopover>
                                </div>
                            </div>

                            <div className='position-absolute position-xs-unset' style={{ bottom: 0, left: "20px" }}>
                                <h6 className='mb-2 mt-4'>Follow Us</h6>
                                <div className='al_socallinks'>
                                    <a href="/#"><img src={twitter} alt="X" /></a>
                                    <a href="/#"><img src={linkedin} alt="linkedin" /></a>
                                    <a href="https://www.youtube.com/@HelloAlfredAI" rel="noreferrer" target="_blank"><img src={youtube} alt="youtube" /></a>
                                </div>
                            </div>
                            <div className='position-absolute position-xs-unset' style={{ bottom: 0, right: "20px" }}>
                                <h6 className='mb-2 mt-4'>Map</h6>
                                <div className='al_socallinks'>
                                    <a href="https://maps.app.goo.gl/yoqsRy6xddxM7ZXTA" rel="noreferrer" target="_blank">AlfredAI Inc</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Section>
        </>
    )
}