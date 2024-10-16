import React from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, Table } from "reactstrap";
import { getActionTypes } from "../../../../_mock/helperIndex";
import { setActionTypeAndActionData } from "../../../../store/UtilityCallFunction/slice";

export const HealthHubOverview = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }))
    }

    return (
        <React.Fragment>
            <Modal className='modal-md detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>Overview</h6>
                    <i className="icon_alfred_close pointer" title="Close" onClick={handleClose}></i>
                </div>
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll mb-3'>
                        <Table borderless className='al_listtable al-pad pt-0 mb-0'>
                            <thead className='sticky_header'>
                                <tr>
                                    <th className="w-25">Weeks</th>
                                    <th>Overview</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="w-25">Week 1</td>
                                    <td><strong>Understanding AF: causes, symptoms, diagnosis and quick overview of treatment.</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand how atrial fibrillation starts, and the symptoms and main pillars of treatment of atrial fibrillation</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 2</td>
                                    <td><strong>Rate Control Medications: types how they work, and side effects.</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand role of rate control in AF treatment and types of medications</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 3</td>
                                    <td><strong>Rhythm Control with Antiarrhythmic Medications</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand role of rhythm control and purpose of medications</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 4</td>
                                    <td><strong>Rhythm Control with Catheter Ablation</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand ablation, risks of procedure, and what to look for after procedure</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 5</td>
                                    <td><strong>Rhythm Control with Surgical Ablation</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand surgical ablation and differences from catheter ablation</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 6</td>
                                    <td><strong>Rhythm Control with Electrical Cardioversion</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand what DCCV is, purpose of procedure, how it differs from ablation</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 7</td>
                                    <td><strong>Stroke Prevention</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Learn various aspects of stroke prevention in atrial fibrillation</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 8</td>
                                    <td><strong>Importance of Lifestyle modifications</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand importance of lifestyle modifications to reduce recurrence of afib and improve overall burden.</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 9</td>
                                    <td><strong>Importance of  Risk factors</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Learn various aspects of managing modifiable risk factors in atrial fibrillation</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 10</td>
                                    <td><strong>Managing symptoms: dealing with fatigue, palpitations, and stress</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Learn how to manage symptoms of afib</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 11</td>
                                    <td><strong>AF treatment complications and how to prevent them</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Learning overview of complications that can occur in atrial fibrillation treatment plans and their prevention.</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 12</td>
                                    <td><strong>Follow-up care, summarization and long-term management</strong>
                                        <ol type="1" className="mb-0 mt-1">
                                            <li className="mb-1">Understand the need for continued follow-up care and role of long-term management in treatment of afib</li>
                                            <li className="mb-1">Activities</li>
                                            <li className="mb-1">Quiz</li>
                                        </ol>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
