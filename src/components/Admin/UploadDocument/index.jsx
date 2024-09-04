import React, { useState } from 'react';
import { Table, Row, Col, Label, Card, CardBody } from 'reactstrap';
import fileupload from '../../../images/fileupload.svg';
import Stepper from '@keyvaluesystems/react-stepper';

export default function UploadDocument() {
    const [view, setView] = useState("view");
    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const [currentStep, setCurrentStep] = useState(0);

    const handleStepClick = (step, index) => setCurrentStep(index);

    return (
        <>
            {view === "view" &&
                <div className="wflexLayout">
                    <Row className='d-flex align-items-center al-pad pb-1'>
                        <Col className='d-flex align-items-center'>
                            <h3 className='bc_main_text mb-0 me-4'>Upload Documents</h3>
                            <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                                <i className='icon_alfred_plus me-2'></i>
                                Upload New Document
                            </button>
                        </Col>
                        <div className='w-auto px-3'>
                            <div className="al_searchleft px-0">
                                <input type="text" className="form-control" placeholder="Search" />
                                <i className="icon_alfred_search"></i>
                            </div>
                        </div>
                    </Row>
                    <div className="wflexLayout">
                        <div className='wflexScroll d-flex flex-column'>
                            <div className='flex-grow-1'>
                                <Table borderless responsive className='al_listtable al-pad mb-0 al_uploadtable'>
                                    <thead>
                                        <tr>
                                            <th>File Name</th>
                                            <th>Uploaded by</th>
                                            <th>Uploaded on</th>
                                            <th>Size</th>
                                            <th>Type</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>BotEducation</td>
                                            <td>Charlotte</td>
                                            <td>19-04-2024</td>
                                            <td>12MB</td>
                                            <td>PDF</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_document text-info'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>BotBehavior</td>
                                            <td>Charlotte</td>
                                            <td>16-04-2024</td>
                                            <td>5MB</td>
                                            <td>DOC</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_document text-info'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>BotIntro</td>
                                            <td>Richard</td>
                                            <td>15-04-2024</td>
                                            <td>2MB</td>
                                            <td>TXT</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_document text-info'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {view === "add" &&
                <div className="wflexLayout">
                    <div className='wflexScroll d-flex flex-column'>
                        <div className='flex-grow-1'>
                            <div className='al-pad pb-0'>
                                <h3 className='bc_main_text mb-1 me-4'>Upload Document</h3>
                                <Label>Upload document to Alfred chatbot for real-time responses.</Label>
                            </div>
                            <Row className='mx-0 al_uploaddoc'>
                                <Col xl="4" lg="5" md="6" sm="12" className='px-0'>
                                    <div className='al-pad pb-0'>
                                        <div className='al_filedragupload'
                                            onDrop={e => handleDrop(e)}
                                            onDragOver={e => handleDragOver(e)}
                                            onDragEnter={e => handleDragEnter(e)}
                                            onDragLeave={e => handleDragLeave(e)}
                                        >
                                            <img src={fileupload} alt="dragfile" />
                                            <div className='mt-2'>Drag & Drop the file</div>
                                            <h6>OR</h6>
                                            <input
                                                type="file"
                                                id="document"
                                                hidden
                                                onChange={(e) => { }}
                                            />

                                            <div id="al_blockele">
                                                <label htmlFor="document" className="al_choose">
                                                    Browse File
                                                </label>
                                            </div>
                                        </div>
                                        {/* <div className='al_upload_steps'>
                                            <Card className='mb-3'>
                                                <CardBody>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='al_stepnumber'>1</div>
                                                            <div>
                                                                <small className='mb-1 fw-semibold text-dark'>Step 1</small>
                                                                <div>Uploading File</div>
                                                            </div>
                                                        </div>
                                                        <i className='icon_alfred_uploaddocument'></i>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className='mb-3'>
                                                <CardBody>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='al_stepnumber'>2</div>
                                                            <div>
                                                                <small className='mb-1 fw-semibold text-dark'>Step 2</small>
                                                                <div>Processing Data</div>
                                                            </div>
                                                        </div>
                                                        <i className='icon_alfred_sync'></i>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                            <Card className='mb-3'>
                                                <CardBody>
                                                    <div className='d-flex align-items-center justify-content-between'>
                                                        <div className='d-flex align-items-center'>
                                                            <div className='al_stepnumber'>3</div>
                                                            <div>
                                                                <small className='mb-1 fw-semibold text-dark'>Step 3</small>
                                                                <div>Finalizing Upload</div>
                                                            </div>
                                                        </div>
                                                        <i className='icon_alfred_circle_check_solid'></i>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div> */}

                                        {/* <Stepper
                                            orientation="vertical"
                                            steps={[
                                                {
                                                    stepLabel: "Step 1",
                                                    stepDescription: "Uploading File",
                                                    completed: true,
                                                },
                                                {
                                                    stepLabel: "Step 2",
                                                    stepDescription: "Processing Data",
                                                    completed: false,
                                                },
                                                {
                                                    stepLabel: "Step 3",
                                                    stepDescription: "Finalizing Upload",
                                                    completed: false,
                                                },
                                            ]}
                                            currentStepIndex={currentStep}
                                            onStepClick={handleStepClick}
                                        /> */}
                                    </div>
                                </Col>
                                <Col lg="6" md="6" sm="12" className='px-0'>
                                    <div className='al-pad'>
                                        <h6 className='mb-1'>Recently Uploaded Documents</h6>
                                        <Table borderless responsive className='al_listtable al_adduploadtable mb-0'>
                                            <tbody>
                                                <tr>
                                                    <td>BotEducation</td>
                                                    <td>12MB</td>
                                                    <td>PDF</td>
                                                    <td>
                                                        <div className='al_cardactions'>
                                                            <i className='icon_alfred_closecircle'></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>BotBehavior</td>
                                                    <td>5MB</td>
                                                    <td>DOC</td>
                                                    <td>
                                                        <div className='al_cardactions'>
                                                            <i className='icon_alfred_closecircle'></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>BotIntro</td>
                                                    <td>2MB</td>
                                                    <td>TXT</td>
                                                    <td>
                                                        <div className='al_cardactions'>
                                                            <i className='icon_alfred_closecircle'></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='mt-2 al-pad pt-0'>
                            <button
                                type="button"
                                className="al_cancelbgbutton me-3"
                                onClick={() => setView("view")}
                            >Cancel
                            </button>
                            <button
                                type="submit"
                                className="al_savebtn"
                                onClick={() => setView("view")}
                            >Save
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}