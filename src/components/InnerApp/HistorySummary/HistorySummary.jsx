import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import { AxiosInstance } from "../../../_mock/utilities";
import Loading from "../LoadingComponent";

export default function HistorySummary() {
  // const decodedToken = getDecodedTokenFromLocalStorage();
  const [transcript, setTranscript] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
          <div className="flex-grow-1">
            <h3 className="bc_main_text mb-3">History Transcript Summary</h3>
            <Card className="w-30 mb-3 al_cardnoborder">
              <CardBody
                dangerouslySetInnerHTML={{ __html: transcript }}
              ></CardBody>
            </Card>
          </div>
          <div>
            <button type="button" className="al_savebtn me-3">
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
