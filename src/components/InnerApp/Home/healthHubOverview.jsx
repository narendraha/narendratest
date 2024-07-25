import React from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, Table } from "reactstrap";
import { getActionTypes } from "../../../_mock/helperIndex";
import { setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";

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
                                    <td><strong>General Knowledge</strong>
                                        <ol type="1" className="mb-0">
                                            <li className="mb-1">Introduction</li>
                                            <li className="mb-1">Content</li>
                                            <li className="mb-1">Videos</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 2</td>
                                    <td><strong>Antiarrhythmic Knowledge</strong>
                                        <ol type="1" className="mb-0">
                                            <li className="mb-1">Introduction</li>
                                            <li className="mb-1">Content</li>
                                            <li className="mb-1">Videos</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 3</td>
                                    <td><strong>Ablation Knowledge</strong>
                                        <ol type="1" className="mb-0">
                                            <li className="mb-1">Introduction</li>
                                            <li className="mb-1">Content</li>
                                            <li className="mb-1">Videos</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 4</td>
                                    <td><strong>Blood thinners</strong>
                                        <ol type="1" className="mb-0">
                                            <li className="mb-1">Introduction</li>
                                            <li className="mb-1">Content</li>
                                            <li className="mb-1">Videos</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 5</td>
                                    <td><strong>Left atrial appendage</strong>
                                        <ol type="1" className="mb-0">
                                            <li className="mb-1">Introduction</li>
                                            <li className="mb-1">Content</li>
                                            <li className="mb-1">Videos</li>
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
