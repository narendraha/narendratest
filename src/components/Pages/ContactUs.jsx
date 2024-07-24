import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import { Row, Col } from 'reactstrap';
import linkedin from '../../images/linkedin.svg';
import twitter from '../../images/twitter.svg';
import youtube from '../../images/youtube.svg';
import Section from './Section';
import BannerSectionStyle from './Section/BannerSectionStyle';
import ContactForm from '../DefaultPages/ContactForm';

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
                        CONTACT US
                    </h3>
                    <ContactForm />
                </div>
            </Section>
            <Section topMd={50} topLg={50} topXl={80}>
                <div className='w-75 mx-auto'>
                    <Row className='d-flex align-items-center'>
                        <Col lg="4" sm="5">
                            <h6 className='mb-2'>Address</h6>
                            <p className='mb-2'>AlfredAI Inc</p>
                            <p className='mb-2'>9106 Bayshore Bend</p>
                            <p className='mb-2'>Austin, TX 78726</p>
                            <h6 className='mb-2 mt-4'>Follow Us</h6>
                            <div className='al_socallinks'>
                                <a href="/#"><img src={twitter} alt="X" /></a>
                                <a href="/#"><img src={linkedin} alt="linkedin" /></a>
                                <a href="https://www.youtube.com/@HelloAlfredAI" rel="noreferrer" target="_blank"><img src={youtube} alt="youtube" /></a>
                            </div>
                        </Col>
                        <Col lg="8" sm="7">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.127057260981!2d-97.84610312535153!3d30.432499900082252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b324cf2b751d5%3A0xabd1d5ffb923b049!2s9106%20Bayshore%20Bend%2C%20Austin%2C%20TX%2078726%2C%20USA!5e0!3m2!1sen!2sin!4v1721796419247!5m2!1sen!2sin" width="100%" height="350" style={{ border: 0, borderRadius: "15px" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </Col>
                    </Row>
                </div>
            </Section>
            <Section>
                <div className='w-75 mx-auto'>
                    <div className='alfaq_footer'>
                        Your AI companion, health journey navigator, and coach for self-better care in managing a patient's atrial fibrillation journey
                    </div>
                </div>
            </Section>
        </>
    )
}