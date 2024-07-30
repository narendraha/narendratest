import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody, Table } from "reactstrap";
import { getActionTypes } from '../../../../_mock/helperIndex';
import { setActionTypeAndActionData } from '../../../../store/UtilityCallFunction/slice';

const ExpertMonitoringLastUpdateView = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }))
    }
    return (
        <React.Fragment>
            <Modal className='modal-md detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>Last Updated Vital (18-06-2024)</h6>
                    <i className="icon_alfred_close pointer" title="Close" onClick={handleClose}></i>
                </div>
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll mb-3'>
                        <Table borderless className='al_listtable al-pad pt-0 mb-0 al_symtomdetails'>
                            <thead className='sticky_header'>
                                <tr>
                                    <th>Weight</th>
                                    <th>Blood Pressure</th>
                                    <th>Pulse</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1000 (lbs)</td>
                                    <td>200/210 (mmHg)</td>
                                    <td>120 (BPM)</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default ExpertMonitoringLastUpdateView;
