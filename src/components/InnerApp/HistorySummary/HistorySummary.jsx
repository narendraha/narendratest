import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, Modal, ModalBody, Label } from "reactstrap";
import { AxiosInstance } from "../../../_mock/utilities";
import Loading from "../LoadingComponent";
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import logo from '../../../images/alfredlogo.svg';
import webicon from '../../../images/websiteicon.svg';
import footerbg from '../../../images/footerbg.svg';
import watermark from '../../../images/watermark.png';
import { Link } from 'react-router-dom';
import ModalView from "../../Utilities/ModalView";
import { getProfileCmpDetails } from '../../../_mock/helperIndex';
import { useNavigate } from "react-router";

export default function HistorySummary() {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [viewDisclaimer, setViewDisclaimer] = useState(false);
  const [profileCmpModalProps, setProfileCmpModalProps] = useState("");

  const ref = useRef();
  const options = {
    filename: "summary.pdf",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.NONE,
      orientation: 'portrait',
      unit: 'px',
      format: [166, 125]
    },
  };

  const fetchProfileComplitionDetails = async (path = "", reOpenModel = false) => {
    let link = reOpenModel ? path : 'transcriptsummary'
    const result = await getProfileCmpDetails(link);
    setProfileCmpModalProps(result);
    if (result?.navigationLink && result?.navigationLink !== "")
      navigate(`/${result?.navigationLink}`)
  };
  let { redirectionPath, isModalVisible, modalMessage, navigationLink } = profileCmpModalProps;

  useEffect(() => {
    fetchProfileComplitionDetails();
  }, []);

  useEffect(() => {
    if (navigationLink && navigationLink !== "")
      getHistoryBotTranscript();
  }, [navigationLink]);


  const getHistoryBotTranscript = async () => {
    setIsLoading(true);
    await AxiosInstance("application/json")
      .get("/history_transcript")
      .then((response) => {
        setIsLoading(false);
        if (response && response?.status == 200) {
          if (response.data.statuscode === 200) {
            setTranscript(response.data?.data?.patient_info);
            toast(response.data?.message, {
              position: "top-right",
              type: "success",
            });
          } else {
            toast(response.data?.message, {
              position: "top-right",
              type: "error",
            });
          }
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  const openDisclaimer = () => {
    setViewDisclaimer(!viewDisclaimer);
  }

  const handleClose = _ => {
    setProfileCmpModalProps({ ...profileCmpModalProps, isModalVisible: false });
  }

  const getIsmodalVisibleProp = (data) => {
    if (data?.isModalVisible)
      fetchProfileComplitionDetails(data?.path, true)
  }

  return (
    <>
      {isLoading && <Loading />}
      {isModalVisible && (
        <ModalView
          msg={modalMessage}
          handleClose={handleClose}
          isModalVisible={isModalVisible}
          path={redirectionPath}
          modelVisibleProp={getIsmodalVisibleProp}
        />
      )}
      {transcript && <div className="wflexLayout">
        <div className="wflexScroll al-pad d-flex flex-column">
          <div className="flex-grow-1 d-flex flex-column">
            <h3 className="bc_main_text mb-3">History Transcript Summary</h3>

            {transcript?.length > 0 &&
              <Card className="w-30 wflexLayout mb-3 al_cardnoborder" style={{ borderRadius: 0 }}>
                <CardBody className="p-0 wflexLayout">
                  <div ref={ref} className="w-100 wflexLayout">
                    <table className="w-100 mb-0" style={{
                      height: "100%", backgroundImage: `url(${watermark})`, backgroundPosition: 'center',
                      backgroundSize: '220px',
                      backgroundColor: "#ffffff",
                      backgroundRepeat: 'no-repeat',
                      border: 'none',
                      fontSize: "13px"
                    }}>
                      <tbody className="w-100" style={{ height: "100vh" }}>
                        <tr className="w-100" style={{ height: "110px" }}>
                          <td className="px-4 py-3 d-flex align-items-center">
                            <div className="w-50">
                              <img src={logo} alt="" width="120" />
                            </div>
                            <div className="text-info text-end w-50">
                              <img src={webicon} alt="" width={25} className="me-2" />
                              helloalfred.ai</div>
                          </td>
                        </tr>
                        <tr className="w-100 flex-grow-1" style={{ height: `calc(100vh - 142px)` }}>
                          <td className="px-4 pb-3" style={{ verticalAlign: "top" }} dangerouslySetInnerHTML={{ __html: transcript }}>
                          </td>
                        </tr>
                        <tr className="w-100" style={{ height: "32px" }}>
                          <td className="p-0 d-flex" style={{ verticalAlign: "bottom" }}>
                            <img src={footerbg} alt="" width="100%" style={{ objectFit: "cover", height: "100%" }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            }
          </div>
          <div>
            <button className="al_savebtn me-3" onClick={() => generatePDF(ref, options)}>
              <i className="icon_alfred_save me-2"></i>Save as local copy
            </button>
            <button type="button" className="al_testbtn me-2" onClick={() => openDisclaimer()}>
              <i className="icon_alfred_share me-2"></i>Share to email
            </button>
          </div>
        </div>
      </div>}
      <Modal className='modal-lg detailsModal' wrapClassName="al_outerparentwp" isOpen={viewDisclaimer}>
        <div className='d-flex align-items-center justify-content-between p-4'>
          <h6 className='mb-0'>Disclaimer</h6>
          <i className="icon_alfred_close pointer" title="Close" onClick={() => setViewDisclaimer(!viewDisclaimer)}></i>
        </div>
        <ModalBody className="wflexLayout p-0">
          <div className='wflexScroll px-4'>
            <p>Welcome to HelloAlfed Medical transcription transmission service. Please read this disclaimer carefully before proceeding.</p>
            <ol type={1}>
              <li><strong>Purpose: </strong>The medical transcript you are about to transmit through this app contains sensitive health information intended for your healthcare provider. This service facilitates the secure transfer of your medical history and related data to your designated healthcare professional.</li>
              <li><strong>Not a Substitute for Professional Medical Advice: </strong>The medical transcript is intended to assist healthcare professionals in understanding your medical history. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition.</li>
              <li><strong>Accuracy of Information: </strong>Ensure the medical transcript you are transmitting is accurate and complete. Any inaccuracies in the information may affect the quality of medical advice and treatment you receive.</li>
              <li><strong>Confidentiality and Privacy: </strong>Your privacy is important to us. The medical transcript you transmit will be kept confidential and will only be used by your designated healthcare provider for the purposes stated in this disclaimer. Please refer to our <Link to="/privacypolicy" target="_blank" rel="noopener noreferrer"><u>Privacy Policy</u></Link> for more details on how we handle your data.</li>
              <li><strong>Data Security: </strong>We implement industry-standard security measures to protect your data during transmission. However, no data transmission over the internet or data storage system can be guaranteed to be 100% secure. By using this service, you acknowledge and accept the potential risks involved.</li>
              <li><strong>Consent: </strong>By transmitting your medical transcript via this app, you consent to the collection, use, and storage of your medical information as described in this disclaimer and our Privacy Policy.</li>
              <li><strong>Healthcare Provider Responsibilities: </strong>The healthcare provider receiving your medical transcript is responsible for reviewing and interpreting the information in the context of your medical care. This app is not responsible for any decisions made by your healthcare provider based on the information transmitted.</li>
              <li><strong>Limitations: </strong>The app is designed to facilitate the transmission of medical transcripts. It does not have the capability to diagnose medical conditions or provide medical advice. For urgent medical issues, please contact your healthcare provider immediately.</li>
              <li><strong>Changes to the Disclaimer: </strong>We may update this disclaimer from time to time. Any changes will be posted on this page, and the updated disclaimer will be effective as of the date of posting.</li>
            </ol>
            <p>By clicking "I Agree" or using the app to transmit your medical transcript, you acknowledge that you have read, understood, and agree to this disclaimer.</p>
            <Label
              check
              className="d-flex align-items-center"
            >
              <div style={{ lineHeight: 0 }}>
                <input name="termsAndConditions" type="checkbox" value={true}
                  onChange={(e) => { }} />
              </div>&nbsp; I agree
            </Label>
          </div>
          <div className="p-3">
            <button
              type="submit"
              className="btn al_button_add mx-2"
              onClick={() => { }}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn al_button_cancel"
              onClick={() => setViewDisclaimer(!viewDisclaimer)}
            >
              Cancel
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
