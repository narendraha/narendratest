import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';

export const FileUploadAnimation = ({ props }) => {
    const { fileUpload, handleFileUpload } = props;
    const [completedStep, setCompletedStep] = useState(0);
    const [showFinalCheck, setShowFinalCheck] = useState(false);

    useEffect(() => {
        if (fileUpload !== "") {
            const interval = setInterval(() => {
                setCompletedStep(prev => {
                    if (prev < 3) {
                        return prev + 1;
                    } else {
                        handleFileUpload()
                        clearInterval(interval); // Stop the interval once all steps are completed
                        setTimeout(() => {
                            setShowFinalCheck(true); // Show the final checkmark
                        }, 500); // Delay before showing the final checkmark
                        setTimeout(() => {
                            setShowFinalCheck(false); // Hide the final checkmark after 2 seconds
                        }, 2500); // 2 seconds after showing the final checkmark
                        return prev;
                    }
                });
            }, 2000); // 3 seconds interval
            return () => {
                handleFileUpload()
                setCompletedStep(null)
                clearInterval(interval)
            } // Cleanup on unmount
        }
    }, [fileUpload]);

    const renderIconOrNumber = (stepNumber) => {
        if (stepNumber === completedStep + 1) {
            return <div className="spinner-border text-primary" role="status"></div>;
        } else {
            return <div className='al_stepnumber'>{stepNumber}</div>;
        }
    };

    return (
        <>
            {!showFinalCheck && fileUpload !== "" && (
                <div className="final-check-overlay">
                    <div className="final-check-container">
                        <div className='al_upload_steps'>
                            <Card className={`mb-3 ${completedStep >= 1 ? 'completedstep' : ''}`}>
                                <CardBody>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            {renderIconOrNumber(1)}
                                            <div className="line"></div>
                                            <div>
                                                <small className='mb-1 fw-semibold text-dark'>Step 1</small>
                                                <div>Uploading File</div>
                                            </div>
                                        </div>
                                        <i className='icon_alfred_uploaddocument'></i>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className={`mb-3 ${completedStep >= 2 ? 'completedstep' : ''}`}>
                                <CardBody>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            {renderIconOrNumber(2)}
                                            <div className="line"></div>
                                            <div>
                                                <small className='mb-1 fw-semibold text-dark'>Step 2</small>
                                                <div>Processing Data</div>
                                            </div>
                                        </div>
                                        <i className='icon_alfred_sync'></i>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className={`mb-3 ${completedStep >= 3 ? 'completedstep' : ''}`}>
                                <CardBody>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center'>
                                            {renderIconOrNumber(3)}
                                            <div>
                                                <small className='mb-1 fw-semibold text-dark'>Step 3</small>
                                                <div>Finalizing Upload</div>
                                            </div>
                                        </div>
                                        <i className='icon_alfred_circle_check_solid'></i>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            )}

            {showFinalCheck && (
                <div className="final-check-overlay">
                    <div className="final-check-container">
                        <Card className='mb-0 al_cardview h-auto'>
                            <CardBody className="p-4">
                                <div className="big-checkmark mx-auto">&#10004;</div>
                                <h6 className='mt-3'>File Uploaded Successfully</h6>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};
