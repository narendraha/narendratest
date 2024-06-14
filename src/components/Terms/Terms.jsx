import React from "react";
import alfredlogo from "../../images/alfredlogo.svg";

export default function Terms() {
    return (
        <div className='py-4 px-5'>
            <div className="wflexScroll">
                <div className="mb-4">
                    <img src={alfredlogo} alt="" width="150" />
                </div>
                <label>AGREEMENT</label>
                <h3 className='text-dark mb-3'>1. TERM</h3>
                {/* <div className='ps-4'>
                    <p><strong>1.1</strong> The Customer acknowledges and agrees that</p>
                    <div className='ps-4'>
                        <p>(a) KYC does not warrant the accuracy, reliability, or fitness for purpose of the information contained in KYC Reports as KYC
                            has no control over the information uploaded to the third-party services accessed by the Solution to create the KYC Reports;
                            and</p>
                        <p>(b) the Customer shall review KYC Reports and carry out its own due diligence to ens
                            Customer is satisfied with
                            the findings in each KYC Report.
                        </p>
                    </div>
                    <p><strong>1.2</strong> KYC undertakes that the Solution will substantially comply with the Service Specifications, save for any non-conformance which
                        is caused by using the Solution contrary to KYC's instructions, or modification or alteration of the Solution by any Party other than
                        KYC or KY's duly authorised contractors or agents.
                    </p>
                </div> */}
            </div>
        </div>
    )
}
