import React from 'react';
import { Card, CardBody } from 'reactstrap';

export default function HistorySummary() {
    return (
        <>
            <div className="wflexLayout">
                <div className='wflexScroll al-pad d-flex flex-column'>
                    <div className='flex-grow-1'>
                        <h3 className='bc_main_text mb-3'>History Transcript Summary</h3>
                        <Card className="w-30 mb-3 al_cardnoborder">
                            <CardBody>
                                <p className='fw-medium'>Mr. Edwin <em>is a</em> 78<em>-year-old</em> male <em>with</em> Long-standing persistent AF, first detected in 2020 and diagnosed by Hospital telemetry</p>
                                <p className='fw-medium'><em>He has symptoms of</em> Chest pain, Cold sweats, and dizziness. The symptoms are quite a lot with Hypertension, Diabetes with mellitus, CHADS2VA2SC score of 4. </p>
                                <p className='fw-medium'><em>He has the following</em> cardiac conditions Hypertension, AF, and Diabetes. He has other pertinent co-morbidities such as Hypertension, Diabetes.</p>
                                <p className='fw-medium'><em>He is on the following</em> rate control medications warfarin.</p>
                                <p className='fw-medium'><em>He has tried and failed the following</em> AAD medications due to side effects. He is currently on warfarin. He is on anticoagulation.</p>
                                <p className='fw-medium'><em>The patient had prior</em>, the sites ablated were Pulse field ablation.</p>
                                <p className='text-info fw-medium'>He has a pacemaker</p>
                            </CardBody>
                        </Card>
                    </div>
                    <div>
                        <button type="button" className='al_savebtn me-3'><i className="icon_alfred_save me-2"></i>Save as local copy</button>
                        <button type="button" className='al_testbtn me-2'><i className="icon_alfred_share me-2"></i>Share to email</button>
                    </div>
                </div>
            </div>
        </>
    );
}