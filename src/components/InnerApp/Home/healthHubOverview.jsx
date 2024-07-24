import React from "react";
import { Modal, ModalBody, Table } from "reactstrap";

export const HealthHubOverview = (props) => {

    return (
        <React.Fragment>
            <Modal className='modal-md detailsModal' isOpen={true} wrapClassName="al_outerparentwp">
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>Overview</h6>
                    <i className="icon_alfred_close pointer" title="Close" onClick={() => { props.setShowOverview(false) }}></i>
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
                                    <td>General Knowledge
                                        <ol type="1" className="mb-0">
                                            <li className="mb-1">Introduction</li>
                                            <li className="mb-1">Content</li>
                                            <li className="mb-1">Videos</li>
                                        </ol>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 2</td>
                                    <td>Anti</td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 3</td>
                                    <td>200/210 (mmHg)</td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 4</td>
                                    <td>200/210 (mmHg)</td>
                                </tr>
                                <tr>
                                    <td className="w-25">Week 5</td>
                                    <td>200/210 (mmHg)</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
