import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, Table } from "reactstrap";
import { getActionTypes } from '../../../../_mock/helperIndex';
import { setActionTypeAndActionData } from '../../../../store/UtilityCallFunction/slice';

const SymptomsLastUpdatedView = () => {
    const dispatch = useDispatch();

    const { symptomsData } = useSelector((state) => state?.homePageSlice);

    const formatedData = Object.keys(symptomsData).reduce((acc, symptom) => {
        const { severity, frequency, quality_of_life } = symptomsData[symptom];
        if (severity || frequency || quality_of_life) {
            acc.push({
                symptom: symptom,
                frequency: frequency,
                severity: severity,
                quality_of_life: quality_of_life
            });
        }
        return acc;
    }, []);

    const handleClose = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: null }))
    }
    return (
        <React.Fragment>
            <Modal className='modal-md detailsModal' isOpen={symptomsData} wrapClassName="al_outerparentwp">
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>Last Updated Symptoms</h6>
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
                                {symptomsData && formatedData?.map((x) => (
                                    <>
                                        <tr>
                                            <td>{x?.symptom}</td>
                                            <td>{x?.frequency}</td>
                                            <td>{x?.severity}</td>
                                            <td>{x?.quality_of_life}</td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default SymptomsLastUpdatedView;
