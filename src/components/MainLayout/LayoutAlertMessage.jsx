import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import success from '../../../images/alalert_success.svg';
import failed from '../../../images/alalert_failed.svg';

export default function LayoutAlertMessage() {

    return (
        <>
            <div className='al_layalert'>
                <SweetAlert closeOnClickOutside
                    onCancel={() => { }}
                    customClass={'al_msgAlert ' + (true ? 'al_alrtSuccess' : 'al_alrtFailed')}
                    onConfirm={() => {}}
                    title={
                        <div className='al_alert-card d-flex flex-column'>
                            {true && <div className='al_alrtSuccess'>
                                <div>
                                    <img src={success} alt='' width='200' />
                                </div>
                            </div>
                            }
                            {false &&
                                <div className='al_alrtFailed'>
                                    <div>
                                        <img src={failed} alt='' width='200' />
                                    </div>
                                </div>
                            }
                            <div className='al_alert-msg'>
                                <div>
                                    <span style={{ fontSize: "20px"}}>Your goal created</span>
                                    <span className='al_alerttextmsg'>Succesfully</span>
                                    <div className='al_alterttextpara'>Based on your given symptom details we have created a goal for you</div>
                                </div>
                            </div>
                        </div>
                    }>
                </SweetAlert>
            </div>
        </>
    )
}