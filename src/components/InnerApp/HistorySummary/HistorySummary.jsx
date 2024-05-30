import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { getDecodedTokenFromLocalStorage } from "../../../_mock/jwtUtils";

export default function HistorySummary() {
    const decodedToken = getDecodedTokenFromLocalStorage();
    return (
        <>
            <div className="wflexLayout">
                <div className='wflexScroll al-pad d-flex flex-column'>
                    <div className='flex-grow-1'>
                        <h3 className='bc_main_text mb-3'>History Transcript Summary</h3>
                        <Card className="w-30 mb-3 al_cardnoborder">
                            <CardBody>
                                <p className='fw-medium'>Mr/Ms. {decodedToken?.username} <em>is a</em> 78<em>-year-old</em> male <em>with</em> Permanent AF, first detected in the year 2021 and diagnosed by ECG.</p>
                                <p className='fw-medium'>Mr/Ms. {decodedToken?.username} <em>has symptoms of </em>breathing trouble, Chest discomfort a lot, and weakness up to a certain extent.</p>
                                <p>The symptoms are repeating daily.</p>
                                <p className='fw-medium'>Mr/Ms. {decodedToken?.username} <em>has got </em>CHADS2VA2SC score of 5 and he has the cardiac conditions of Hypertension, Diabetes.</p>
                                <p className='fw-medium'><em>He has other</em> pertinent co-morbidities such as Coronary Artery Calcification, Thyroid, EKG Changes with long PR. </p>
                                <p className='fw-medium'><em>He is on the following</em> rate control medications Beta Blockers & Statins.</p>
                                <p className='fw-medium'><em>He has tried and failed the following </em>AAD medication Quinidine due to side effects</p>
                                <p className='fw-medium'><em>He is currently on </em>Disopyramide and Flecanide for anticoagulation.</p>
                                <p className='fw-medium'><em>The patient had a prior </em>Electric shock (cardio version).</p>
                                <p className='text-info fw-medium'>Mr/Ms. {decodedToken?.username} has pacemaker</p>
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