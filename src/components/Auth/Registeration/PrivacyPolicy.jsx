import React from "react";
import { pageTitle } from "../../../_mock/internalJsControl";
import alfredlogo from "../../../images/alfredlogo.svg";

export default function PrivacyPolicy() {
    pageTitle("Privacy Policies")
    return (
        <div className='py-4 px-5'>
            <div className="wflexScroll" style={{ fontSize: "14px" }}>
                <div className="mb-4">
                    <img src={alfredlogo} alt="" width="150" />
                </div>
                <label>Privacy Policy</label>
                <p>Effective Date: <strong>6/16/24</strong></p>
                <h5 className='text-dark mb-3'>1. Acceptance of Terms</h5>
                <div className='ps-4'>
                    <p>Welcome to HelloAlfred, a digital health disease journey application designed to help users manage and understand their health conditions. This Privacy Policy explains how AlfredAI Inc. ("we," "our," or "us") collects, uses, discloses, and protects your personal data. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly.</p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>2. Information We Collect</h5>
                <div className='ps-4'>
                    <p><strong>2.1 Personal Information: </strong>
                        <ol type="a" className="ps-5">
                            <li><strong>Registration Information: </strong>When you register for the App, we collect personal information such as your name, email address, phone number, and password.</li>
                            <li><strong>Health Information: </strong>To provide personalized health insights, we may collect health-related information such as your medical history, current health conditions, medications, and treatment plans.</li>
                            <li><strong>Device Information: </strong>We collect information about the device you use to access the App, including the device type, operating system, and unique device identifiers.</li>
                        </ol>
                    </p>
                    <p><strong>2.2 Usage Data: </strong>
                        <ol type="a" className="ps-5">
                            <li><strong>App Usage: </strong>We collect data on how you use the App, including the features you interact with, the time spent on the App, and your interactions with other users or healthcare providers through the App.</li>
                            <li><strong>Log Data: </strong>Our servers automatically record information ("log data") created by your use of the App. Log data may include your IP address, browser type, the referring domain, and pages visited.</li>
                        </ol>
                    </p>
                    <p><strong>2.3 Cookies and Tracking Technologies: </strong>We use cookies and similar tracking technologies to track activity on our App and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>3. How We Use Your Information</h5>
                <div className='ps-4'>
                    <p>We use your information to:
                        <ol type="a" className="ps-5">
                            <li>Provide, maintain, and improve the App and its services.</li>
                            <li>Personalize your experience and deliver tailored content and recommendations.</li>
                            <li>Communicate with you, including sending you updates, security alerts, and support messages.</li>
                            <li>Analyze usage and trends to improve our services.</li>
                            <li>Comply with legal obligations and protect our rights.</li>
                        </ol>
                    </p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>4. Use of Artificial Intelligence and Machine Learning</h5>
                <div className='ps-4'>
                    <p><strong>4.1 Data Processing: </strong>We utilize artificial intelligence (AI) and machine learning (ML) models to enhance the functionality of the App and provide personalized health recommendations. These models process data to:
                        <ol type="a" className="ps-5">
                            <li>Analyze health trends and provide insights.</li>
                            <li>Predict potential health issues based on historical and real-time data.</li>
                            <li>Tailor content and suggestions to individual user needs.</li>
                        </ol>
                    </p>
                    <p><strong>4.2 Data Privacy and Security: </strong>
                        <ol type="a" className="ps-5">
                            <li><strong>Anonymization: </strong>Where possible, data used by AI and ML models is anonymized to protect your identity and privacy.</li>
                            <li><strong>Encryption: </strong>We use advanced encryption techniques to secure data both in transit and at rest.</li>
                            <li><strong>Access Control: </strong>Only authorized personnel have access to the data used in AI and ML processes.</li>
                        </ol>
                    </p>
                    <p><strong>4.3 Transparency and Control: </strong>
                        <ol type="a" className="ps-5">
                            <li><strong>Explanation of Decisions: </strong>We strive to ensure that the decisions made by our AI and ML models are transparent. Users can request explanations for any automated decisions affecting their health journey.</li>
                            <li><strong>Opt-Out Option: </strong>Users can choose to opt-out of AI and ML-driven features at any time by adjusting their settings within the App or contacting support.</li>
                        </ol>
                    </p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>5. Sharing Your Information</h5>
                <div className='ps-4'>
                    <p>We do not sell your personal information. We may share your information in the following circumstances:
                        <ol type="a" className="ps-5">
                            <li><strong>With Your Consent: </strong>We may share your information with third parties if you give us explicit consent to do so.</li>
                            <li><strong>Healthcare Providers: </strong>We may share your health information with healthcare providers to facilitate care and treatment.</li>
                            <li><strong>Service Providers: </strong>We may share your information with third-party service providers who perform services on our behalf, such as data hosting, analytics, and customer support.</li>
                            <li><strong>Legal Requirements: </strong>We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                        </ol>
                    </p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>6. Data Security</h5>
                <div className='ps-4'>
                    <p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee its absolute security.</p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>7. Your Rights</h5>
                <div className='ps-4'>
                    <p>You have the right to:
                        <ol type="a" className="ps-5">
                            <li>Access, correct, or delete your personal information.</li>
                            <li>Withdraw consent to our processing of your personal data at any time.</li>
                            <li>Object to the processing of your data for direct marketing purposes.</li>
                            <li>Request data portability.</li>
                        </ol>
                        To exercise these rights, please contact us at <strong>support@helloalfred.ai</strong>
                    </p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>8. Children's Privacy</h5>
                <div className='ps-4'>
                    <p>Our App is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete such information promptly.</p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>9. Changes to This Privacy Policy</h5>
                <div className='ps-4'>
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.</p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>10. Contact Us</h5>
                <div className='ps-4'>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <div><strong>AlfredAI Inc.</strong></div>
                    <div><strong>Contact: </strong>9106 Bayshore Bend Austin, Texas, USA</div>
                    <div><strong>Email: </strong>support@helloalfred.ai</div>
                </div>
                <br />
                <h5 className='text-dark mb-3'>11. International Data Transfers</h5>
                <div className='ps-4'>
                    <p>Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside the United States and choose to provide information to us, please note that we transfer the data, including personal information, to the United States and process it there.</p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>12. Third-Party Links</h5>
                <div className='ps-4'>
                    <p>Our App may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We advise you to review the privacy policy of every site you visit. </p>
                </div>
                <br />
                <h5 className='text-dark mb-3'>13. Data Retention</h5>
                <div className='ps-4'>
                    <p>We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements and policies.</p>
                    <p>By using the App, you agree to the collection and use of information in accordance with this Privacy Policy. Thank you for trusting HelloAlfred with your health journey.</p>
                </div>
            </div>
        </div >
    )
}
