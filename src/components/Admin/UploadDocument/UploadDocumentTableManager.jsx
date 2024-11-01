import React from 'react'
import { UploadDocumentTableView } from './UploadDcoumentTableView';
import { Row, Col, Table } from 'reactstrap';

export const UploadDocumentTableManager = React.memo(() => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
});
