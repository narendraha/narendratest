import React from 'react';
import { pageTitle } from '../../helpers/PageTitle';
import Accordion from '../Accordion';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';

const faqData = [
  {
    title: 'What is Atrial Fibrillation?',
    content:
      "It is an abnormal rhythm originating in the top chambers of your heart that lead to an irregular and frequently fast rhythm. The normal intermittent electrical activity of your heart's top chambers is overwhelmed by a continuous irregular electrical activity.",
  },
  {
    title: 'Is it dangerous?',
    content:
      '<ol type="a"><li>It can effect the quality of life</li><li>Some studies have shown that it can cause frequent hospital admission, congestive heart failure</li><li>It can increase the risk of a stroke</li></ol>',
  },
  {
    title: 'What are the symptoms?',
    content:
      'AFib symptoms can come and go, and they can vary. Talk to a healthcare professional if you experience one or more of these symptoms: <b>IRREGULAR HEARTBEAT</b>, <b>HEART RACING, CHEST PAIN</b>, <b> SHORTNESS OF BREATH</b>, <b> FATIGUE</b>, <b> LIGHT-HEADEDNESS</b>',
  },
  {
    title: 'Is there a cure for it?',
    content:
      'Once you have atrial fibrillation there is no cure for it,  but you can slow the progression but controlling the risk factors.',
  },
  {
    title: 'What are the types of Atrial Fibrillation?',
    content:
      'There are four types of atrial fibrillation: <br/><br/><b>Paroxysmal atrial fibrillation - </b>comes and goes and usually lasts less than a week and stops without intervention by your health care provider.<br/><br/><b>Persistent atrial fibrillation - </b>Either you had treatment within the 1st week of onset with an electrical shock or medication and the duration is less than 1 year since your diagnosis.<br/><br/><b>Long standing persistent atrial fibrillation - </b>you have been in atrial fibrillation and the duration is more than 1 year since diagnosis. <br/><br/><b>Permanent atrial fibrillation - </b>you and your health care provider had made a decision to not make any more attempts to get you back to normal rhythm and just control your pulse and use a blood thinner to prevent stroke.',
  },
  {
    title: 'How do you diagnose Atrial Fibrillation?',
    content:
      'A healthcare provider will recommend a 12 lead ECG, look at the strips from your smart wearables, or consider a heart monitor to establish the diagnosis of atrial fibrillation.',
  },
  {
    title: 'What are the treatment choices and risks associated with it, is one better over the other?',
    content:
      'So why is it important to treat atrial fibrillation- primarily for 4 reasons, we call them the <b>4 pillars</b> of treatment.<br /><br /><b><ol><li>It may cause symptoms and affect your quality of life.</b> <br/>a. The symptoms can vary from person to person and can vary in intensity too.<ol type="i"><li>Common symptoms are chest pain, shortness of breath, fatigue, and decrease in exercise capacity.<br/><br/></li></ol> <li><b> When patients have rapid heart rate for a prolonged period it can cause weakening of the heart muscle and the pump function that we call ejection fraction can go down and cause congestive heart failure</b> <ol type="a"><li> So, we assess how well your heart rate is under control and use certain medications for it.<br/><br/></li></ol> </li> <li> <b>Risk of a stroke</b> <ol type="a"><li>Based on your medical condition we recommend a blood thinner.</li> <li>The blood thinner generally brings your risk down to closer to 1%, and the risk of major bleeding is usually in the ballpark of 0.5% to 1%.</li> <li> There are patients who cannot take blood thinners as they are at higher risk of bleeding for those patients, we may recommend a procedure called left atrial appendage occlusion and one such device that is used for the procedure is called watchman. <br/><br/> </li> </ol> <li><b>Risk factors</b> <ol type="a"><li>We may encourage you to stop smoking, decrease or stop alcohol consumption, maintain a healthy diet and weight, manage stress and sleep well.</li> <li>We may evaluate for sleep apnea as it decreases the risk of recurrences.</li> <li>We optimize blood pressure control and diabetes.</li><li>To achieve the above goals, we may make a referral to our interdisciplinary team of providers.<br/><br/></li></ol> </li></li> <li><b>If you have symptoms and effecting quality of life or if you don’t have symptoms but have risk factors, then we recommend rhythm control.</b><br/>Rhythm control is primarily achieved by 2 methods: <ol><li>Anti-arrhythmic medications that suppress the atrial fibrillation from happening <ol type="a"><li>We may consider the type of antiarrhythmic medications based on your medical conditions and test results.</li> <li>The antiarrhythmic medications can cause side effects and are small risk of cardiac arrest, so we need to monitor them with periodic blood tests and EKGs.</li></ol> <li>Ablation- freezing or cauterization of the electrical connections around the veins.<ol type="a"><li>This does not cure but gives relief 60-70% of the time for a year before atrial fibrillation may come back.</li> <li>Most patients need a second procedure.</li> <li>We may continue to treat with antiarrhythmic medication to keep you in normal rhythm.</li> <li>Ablation is not a ticket to stop blood thinner, the decision to stop or continue blood thinner will depend on your medical conditions and the risk score called chadsvasc score (2 to 3 or higher, we recommend continuing blood thinner)</li></ol> </li>  </li></ol> </li>  </li></ol>',
  },
  {
    title: 'Why does it recur after an ablation or treatment plan?',
    content:
      'The exact cause of atrial fibrillation is unknown and there are different areas in the left upper chamber of the heart that can lead to atrial fibrillation. Though we treat the primary trigger near the pulmonary veins ( veins that bring blood from your lungs back into the left upper chamber of the heart), there are other areas that can cause atrial fibrillation known as non-pulmonary vein triggers.',
  },
  {
    title: 'Is there a way one can prevent it?',
    content:
      'One can prevent from atrial fibrillation happening by working on risk factors<ol type="1"><li>Habits<ol type="a"><li>Minimize alcohol intake</li><li>No recreational drugs</li><li>No smoking</li></ol></li><li>Healthy weight by eating an appropriate diet</li><li>If having the below risks optimizing their control<ol type="a"><li>Blood pressure control</li><li>Lose weight if overweight or obese</li><li>Be evaluated for and get treated for sleepapnea</li><li>Diabetes control</li></ol></li></ol>',
  }
];
export default function Affaq() {
  pageTitle('Affaq');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/about/faq.png"
        title="Welcome to HelloAlfred<br/>Your AI Health companion"
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
            Your AI companion, health journey navigator, and coach for self-better care in managing a patient's atrial fibrillation journey
          </div>
        </div>
      </Section>
    </>
  );
}
