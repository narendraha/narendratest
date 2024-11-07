import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';
import { getNoDataFoundOrNoResult, getPaginationItem, getSearchedDataByKeyValues } from '../../../_mock/helperIndex';
import { getAllUploadedDocumentRequest } from '../../../store/UploadDocumnet/slice';
import UploadDocumentTableView from './UploadDcoumentTableView';

export const UploadDocumentTableManager = React.memo(() => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const totalUploadedDocuments = useSelector((state) => (state?.uploadDocumentSlice?.totalUploadedDocuments) || undefined);
    const searchKey = useSelector((state) => (state?.uploadDocumentSlice?.searchKey) || "");

    const displayedColumns = totalUploadedDocuments?.length > 0 ? Object.keys(totalUploadedDocuments[0]) : [];
    const filterredUploadedDoc = searchKey !== ''
        ? getSearchedDataByKeyValues(totalUploadedDocuments, displayedColumns, searchKey)
        : totalUploadedDocuments;

    const itemsPerPage = getPaginationItem;
    const totalPages = Math.ceil(filterredUploadedDoc?.length / itemsPerPage);
    const paginatedUploadDocList = filterredUploadedDoc?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    let noDataFoundOrNoResult = getNoDataFoundOrNoResult(totalUploadedDocuments, filterredUploadedDoc);

    useEffect(() => {
        dispatch(getAllUploadedDocumentRequest());
    }, [])

    console.log("totalUploadedDocumentstotalUploadedDocuments", { searchKey, totalUploadedDocuments, filterredUploadedDoc, paginatedUploadDocList })
    return (
        <React.Fragment>
            <div className="wflexLayout">
                <div className='wflexScroll d-flex flex-column'>
                    <div className='flex-grow-1'>
                        {totalUploadedDocuments && paginatedUploadDocList?.length > 0 ?
                            (< Table borderless responsive className='al_listtable al-pad mb-0 al_uploadtable'>
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
                                    {paginatedUploadDocList?.map((x) => {
                                        return <UploadDocumentTableView key={x.id} props={x} />
                                    })}
                                </tbody>
                            </Table>)
                            :
                            (noDataFoundOrNoResult &&
                                <div className="d-flex flex-column align-items-center pt-5">
                                    <img src={noDataFoundOrNoResult.img} width={220} alt="" />
                                    <h6 className="mt-3 mb-0">{noDataFoundOrNoResult.msg}</h6>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
});
