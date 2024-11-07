import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getActionTypes } from '../../../_mock/helperIndex';
import { setUploadDocumentSearchKey } from '../../../store/UploadDocumnet/slice';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';

export const UploadDocumentFilter = React.memo(() => {
    const dispatch = useDispatch();

    const totalUploadedDocuments = useSelector((state) => (state?.uploadDocumentSlice?.totalUploadedDocuments) || undefined);

    const handleAdd = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.ADD }));
    };

    const searchHandle = (e) => {
        dispatch(setUploadDocumentSearchKey(e.target.value));
    };

    return (
        <React.Fragment>
            <Row className='d-flex align-items-center al-pad pb-1'>
                <Col className='d-flex align-items-center'>
                    <h3 className='bc_main_text mb-0 me-4'>Upload Documents</h3>
                    <button type="button" className="al_add_dashed_button mb-0" onClick={handleAdd}>
                        <i className='icon_alfred_plus me-2'></i>
                        Upload New Document
                    </button>
                </Col>
                <div className='w-auto px-3'>
                    <div className="al_searchleft px-0">
                        <input type="text" className="form-control" placeholder="Search"
                            disabled={totalUploadedDocuments?.length === 0}
                            onChange={searchHandle}
                        />
                        <i className="icon_alfred_search"></i>
                    </div>
                </div>
            </Row>
        </React.Fragment>
    )
})
