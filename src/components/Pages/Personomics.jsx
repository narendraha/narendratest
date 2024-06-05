import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import Section from '../Section';
import TestimonialCarouselStyle2 from '../Slider/TestimonialCarouselStyle2';
import Spacing from '../Spacing';

const personomicsData = [
  {
    title: 'Christopher',
    subTitle:
      'His advice for all “Get your personalized Alfred, It worked for me”',
    iconUrl: 'images/persona1.png',
    href: '/personomics/personomics-details',
  },
  {
    title: 'Kenneth',
    subTitle:
      'I want to encourage people with Afib- get Alfred on board',
    iconUrl: 'images/persona2.png',
    href: '/personomics/personomics-details',
  },
  {
    title: 'Benjamin',
    subTitle:
      'I have regained my active life with my best friend Alfred',
    iconUrl: 'images/persona3.png',
    href: '/personomics/personomics-details',
  },
  {
    title: 'Andrew',
    subTitle:
      'I have regained my active life with my best friend Alfred',
    iconUrl: 'images/puser.jpg',
    href: '/personomics/personomics-details',
  }
];

export default function Personomics() {
  pageTitle('Personomics');
  return (
    <>
      <section className="videobanner cs_banner cs_style_3 cs_bg_filed" style={{ backgroundImage: `url('/images/about/banner_bg.svg')` }}>
        <div className="cs_banner_img">
          {/* <img src={personomics} alt="chatbot" /> */}
          <video width="auto" height="430" autoPlay="autoplay" controls>
            <source src="https://web-staging.in/havideo/animation.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container">
          <div className="cs_banner_text">
            <h1 className="cs_banner_title cs_fs_72">Don’t Let Your Health Take a Backseat!</h1>
            <p className="cs_banner_subtitle cs_fs_20 mb-0 cs_heading_color">
              Alfred leverages a personomics-driven approach to tailor health recommendations.
            </p>
          </div>
        </div>
      </section>
      <div className='text-center w-80 mx-auto'>
        <Spacing md="70" lg="80" xl="110" />
        <h3 className="cs_section_subtitle text-uppercase cs_accent_color cs_semibold m-0 cs_accent_color cs_fs_32">
          PERSONOMICS
        </h3>
        <Spacing md="25" lg="25" xl="25" />
        <h2 className="cs_section_title cs_fs_72 m-0"> Evaluates willingness to change, barriers to their access to care, medications, treatment, takes history for individualized information and education</h2>
        <Spacing md="25" lg="25" xl="25" />
        <p>
          Alfred takes into account the patient’s medical history, psychological factors, and social determinants of health. By adopting a holistic perspective, we aim to enhance the individualized patient experience and promote better outcomes through targeted education and awareness.
        </p>
        <Section topMd={50} topLg={50} topXl={50}>
          <TestimonialCarouselStyle2 data={personomicsData} />
        </Section>
        <Section>
          <div className='alfaq_footer'>
            Your AI companion, health navigator, coach in your disease journey. Role is to guide you through managing Atrial Fibrillation and help improve your Wellness
          </div>
        </Section>
      </div>
    </>
  );
}
