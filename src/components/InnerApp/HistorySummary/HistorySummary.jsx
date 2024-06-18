import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import { AxiosInstance } from "../../../_mock/utilities";
import Loading from "../LoadingComponent";
import generatePDF, { Margin, Resolution } from 'react-to-pdf';
import logo from '../../../images/alfredlogo.svg';
import webicon from '../../../images/websiteicon.svg';
import footerbg from '../../../images/footerbg.svg';
import watermark from '../../../images/watermark.png';

export default function HistorySummary() {
  // const decodedToken = getDecodedTokenFromLocalStorage();
  const [transcript, setTranscript] = useState();
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    getHistoryBotTranscript();
  }, []);

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

  return (
    <>
      {isLoading && <Loading />}
      <div className="wflexLayout">
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
                      <tbody className="w-100" style={{height: "100vh"}}>
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
                        <tr className="w-100 flex-grow-1" style={{height: `calc(100vh - 142px)`}}>
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
            <button type="button" className="al_testbtn me-2">
              <i className="icon_alfred_share me-2"></i>Share to email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
