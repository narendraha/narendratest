import React from "react";
import { Table, Col } from "reactstrap";


export const UploadDocumentRecentFileView = React.memo(() => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
});