import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import Accordion from '../Accordion';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';

const faqData = [
  {
    title: 'What is Atrial Fibrillation?',
    content:
      "It is an abnormal rhythm originating in the topchambers of your heart that lead to an irregular and frequently fast rhythm. The normal intermittent electrical activity of your heart's top chambers is overwhelmed by a continuous irregular electrical activity.",
  },
  {
    title: 'Is it dangerous?',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.',
  },
  {
    title: 'What are the symptoms?',
    content:
      'AFib symptoms can come and go, and they can vary. Talk to a healthcare professional if you experience one or more of these symptoms: IRREGULAR HEARTBEAT, HEART RACING, CHEST PAIN, SHORTNESS OF BREATH, FATIGUE, LIGHT-HEADEDNESS',
  },
  {
    title: 'Is there a cure for it?',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.',
  },
  {
    title: 'What are the types of Atrial Fibrillation?',
    content:
      'There are four types of atrial fibrillation: Paroxysmal atrial fibrillation. Persistent atrial fibrillation. Long-term persistent atrial fibrillation. Permanent atrial fibrillation.',
  },
  {
    title: 'How do you diagnose Atrial Fibrillation?',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.',
  },
  {
    title: 'What are the treatment choices and risks associated with it, is one better over the other?',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.',
  },
  {
    title: 'Why does it recur after an ablation or treatment plan?',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.',
  },
  {
    title: 'Is there a way one can prevent it?',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.',
  }
];
export default function Affaq() {
  pageTitle('Affaq');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/about/faq.png"
        title="Welcome to Hello Alfred<br/>Your AI Health companion"
        subTitle="Your Partner in Health and Wellness"
      />

      <Section>
        <div className='w-80 mx-auto'>
          <div className='my-5'>
            <h6 className='text-center'>FAQ’S</h6>
            <h3 className='text-center'>Alfred addresses Afib-related questions, and shows empathy and understanding, making patients feel assured and building trust in Alfred's personalized Education.</h3>
            <p className='text-center'>Alfred FAQs serve as awareness guidelines that provide valuable insights into Afib health conditions, treatments, and preventive measures, helping patients make informed decisions. Alfred bridged the information gap between the Afib patients healthcare providers, by addressing the valuable awareness in a very user-friendly approach.</p>
          </div>
          <Accordion variant="cs_style1 cs_type_2" data={faqData} />

          <div className='alfaq_footer'>
            Your AI companion, health navigator, coach in your disease journey. Role is to guide you through managing Atrial Fibrillation and help improve your Wellness
          </div>
        </div>
      </Section>
    </>
  );
}
