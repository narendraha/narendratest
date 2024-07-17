import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody, Table } from "reactstrap";
import { getActionTypes } from '../../../_mock/helperIndex';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

const SymptomsLastUpdatedView = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }))
    }
    return (
        <React.Fragment>
            <Modal className='modal-md detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>Last Updated Symptoms (18-06-2024)</h6>
                    <i className="icon_alfred_close pointer" title="Close" onClick={handleClose}></i>
                </div>
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll mb-3'>
                        <Table borderless className='al_listtable al-pad pt-0 mb-0 al_symtomdetails'>
                            <thead className='sticky_header'>
                                <tr>
                                    <th>Symptom</th>
                                    <th>Frequency</th>
                                    <th>Severity</th>
                                    <th>Effecting quality of life</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cold sweat</td>
                                    <td>Occasionally</td>
                                    <td>Extreme</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Chest Pain</td>
                                    <td>Often</td>
                                    <td>Moderate</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Pressure/Discomfort in chest</td>
                                    <td>Always</td>
                                    <td>Extreme</td>
                                    <td>Yes</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default SymptomsLastUpdatedView;
