import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';
import { getActionTypes, getNoDataFoundOrNoResult, getPaginationItem, getSearchedDataByKeyValues } from '../../../_mock/helperIndex';
import { getAllAdminsListRequest, setSearchKey } from '../../../store/AdminCreation/slice';
import { setActionTypeAndActionData } from '../../../store/UtilityCallFunction/slice';
import Pagination from '../../Utilities/Pagination';
import { AdminCreationTableView } from './AdminCreationTableView';

export const AdminCreationFilter = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const allAdminsList = useSelector((state) => state?.adminCreationSlice?.allAdminsList);
    const searchKey = useSelector((state) => state?.adminCreationSlice?.searchKey);

    const displayedColumns = allAdminsList?.length > 0 ? Object.keys(allAdminsList[0]) : [];
    const filteredAdminsList = searchKey !== ''
        ? getSearchedDataByKeyValues(allAdminsList, displayedColumns, searchKey)
        : allAdminsList;

    const itemsPerPage = getPaginationItem;
    const totalPages = Math.ceil(filteredAdminsList?.length / itemsPerPage);
    const paginatedAdminsList = filteredAdminsList?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    let noDataFoundOrNoResult = getNoDataFoundOrNoResult(allAdminsList, filteredAdminsList);

    const handleAdd = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.ADD }));
    };

    const searchHandle = (e) => {
        dispatch(setSearchKey(e.target.value));
    };

    useEffect(() => {
        dispatch(getAllAdminsListRequest());
    }, [dispatch]);

    return (
        <React.Fragment>
            <Row className="d-flex align-items-center al-pad pb-1">
                <Col className="d-flex align-items-center">
                    <h3 className="bc_main_text mb-0 me-4">List of Admins</h3>
                    <button type="button" className="al_add_dashed_button mb-0" onClick={handleAdd}>
                        <i className="icon_alfred_plus me-2"></i>
                        Add New Admin
                    </button>
                </Col>
                <div className="w-auto px-3">
                    <div className="al_searchleft px-0">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            disabled={allAdminsList?.length === 0}
                            onChange={searchHandle}
                        />
                        <i className="icon_alfred_search"></i>
                    </div>
                </div>
            </Row>

            <div className="wflexLayout">
                <div className="wflexScroll d-flex flex-column">
                    <div className="flex-grow-1">
                        {filteredAdminsList?.length > 0 ? (
                            <Table borderless responsive className="al_listtable al-pad mb-0 al_adminslisttable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile Number</th>
                                        <th>Designation</th>
                                        <th>Assigned Date</th>
                                        <th>Expiry Date</th>
                                        <th>Assigned By</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedAdminsList?.map((admin) => (
                                        <AdminCreationTableView key={admin.user_id} admin={admin} />
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            noDataFoundOrNoResult && (
                                <div className="d-flex flex-column align-items-center pt-5">
                                    <img src={noDataFoundOrNoResult.img} width={220} alt="" />
                                    <h6 className="mt-3 mb-0">{noDataFoundOrNoResult.msg}</h6>
                                </div>
                            )
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="px-3 pb-3 mx-auto">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};
