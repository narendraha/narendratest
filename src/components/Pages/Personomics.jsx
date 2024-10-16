import React from 'react';
import { pageTitle } from '../../_mock/helperIndex';
import Spacing from '../DefaultPages/Spacing';
import TestimonialCarouselStyle2 from '../DefaultPages/TesimonialCarouselSlider';
import Section from './Section';

const personomicsData = [
  {
    title: 'History Bot',
    subTitle: 'The history bot collects medical information from patients, including demographics, symptoms, and treatment history, and compiles it into a summarized medical history transcript. This serves as a valuable tool for healthcare providers, enabling them to quickly understand the patients background and current health status',
    iconUrl: 'images/historybot.jpg',
    href: '/registration',
  },
  {
    title: 'History transcript',
    subTitle:
      'The medical history generation feature compiles detailed patient information, including demographics, symptoms, cardiac conditions, and treatment history, into a comprehensive profile. This profile is designed to streamline consultations by giving healthcare providers a quick overview, enabling more informed decision-making.',
    iconUrl: 'images/history-transcript.jpg',
    href: '/registration',
  },
  {
    title: 'Knowledgeable Bot',
    subTitle:
      'The educational bot is an AI-driven tool designed to assist patients with accurate and empathetic responses at any moment of time. It leverages a specialized knowledge base from healthcare expert-approved PDFs, ensuring reliable information. The bot excels in emotional intelligence, providing clear, concise, and emotionally supportive answers.',
    iconUrl: 'images/edbot.jpg',
    href: '/registration',
  }
];

export default function Personomics() {
  pageTitle('Personomics');

  return (
    <>
      <section className="videobanner cs_banner cs_style_3 cs_bg_filed" style={{ backgroundImage: `url('/images/about/banner_bg.svg')` }}>
        <div className="cs_banner_img">
          <iframe
            width="800"
            height="410"
            src="https://www.youtube.com/embed/jvKUsnrNYtc?rel=0&autoplay=1&mute=1"
            title="HelloAlfred.ai Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            frameBorder="0"
            rel="noreferrer"
          ></iframe>
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
          Why signup to HelloAlfred?
        </h3>
        <Spacing md="25" lg="25" xl="25" />
        <h2 className="cs_section_title cs_fs_72 m-0">Unlock Personalized Healthcare with HelloAlfred</h2>
        <Spacing md="25" lg="25" xl="25" />
        <p>
          Seamlessly Manage Medical History, Get Real-Time Answers, and Receive Tailored Guidance with HelloAlfred's Specialized Bots that Enhance Your Healthcare Experience.
        </p>
        <Section topMd={50} topLg={50} topXl={50} className="mb-5">
          <TestimonialCarouselStyle2 data={personomicsData} />
        </Section>
      </div>
    </>
  );
}
