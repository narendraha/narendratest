import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TabContent, TabPane, Table } from 'reactstrap';
import {
    getAdminUserStatus,
    getNoDataFoundOrNoResult,
    getSearchedDataByKeyValues,
} from '../../../_mock/helperIndex';
import { getUsersListWithStatusRequest } from '../../../store/ApproveUsers/slice';
import Pagination from '../../Utilities/Pagination';
import { ApproveUsersTableView } from './ApproveUsersTableView';

let pandingTable = {
    patient: [
        { label: "User Name", value: "username" },
        { label: "Email", value: "email" },
        { label: "Gender", value: "gender" },
        { label: "Mobile", value: "mobile" },
        { label: "DOB", value: "dob" },
    ],
    doctor: []
};

let approveTable = {
    patient: [
        { label: "User Name", value: "username" },
        { label: "Email", value: "email" },
        { label: "Gender", value: "gender" },
        { label: "Mobile", value: "mobile" },
        { label: "DOB", value: "dob" },
        { label: "Approved By", value: "approvedBy" },
        { label: "Approved Date", value: "approvedDate" },
    ],
    doctor: [{}]
};

let holdTable = {
    patient: [
        { label: "User Name", value: "username" },
        { label: "Email", value: "email" },
        { label: "Gender", value: "gender" },
        { label: "Mobile", value: "mobile" },
        { label: "DOB", value: "dob" },
        { label: "Hold By", value: "holdBy" },
        { label: "Hold Date", value: "holdDate" },
        { label: "Remark", value: "remark" },
    ],
    doctor: [{}]
};

let rejectTable = {
    patient: [
        { label: "User Name", value: "username" },
        { label: "Email", value: "email" },
        { label: "Gender", value: "gender" },
        { label: "Mobile", value: "mobile" },
        { label: "DOB", value: "dob" },
        { label: "Rejected By", value: "rejectedBy" },
        { label: "Rejected Date", value: "rejectedDate" },
        { label: "Remark", value: "remark" },
    ],
    doctor: [{}]
};

export const ApproveUsersTableManager = React.memo(() => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // asc or desc

    const activetab = useSelector((state) => (state?.approveUsersSlice?.approveUsersActiveTab));
    const approveUserSelection = useSelector((state) => (state?.approveUsersSlice?.approveUserSelection));
    const usersListWithStatus = useSelector((state) => (state?.approveUsersSlice?.usersListWithStatus));
    const searchKey = useSelector((state) => state?.approveUsersSlice?.searchKey);

    let tableColumnsByTabId = (activetab === getAdminUserStatus.PENDING) ? pandingTable[approveUserSelection] :
        (activetab === getAdminUserStatus.APPROVE) ? approveTable[approveUserSelection] :
            (activetab === getAdminUserStatus.HOLD) ? holdTable[approveUserSelection] :
                (activetab === getAdminUserStatus.REJECT) ? rejectTable[approveUserSelection] : [];

    const displayedColumns = usersListWithStatus?.length > 0 ? Object.keys(usersListWithStatus[0]) : [];
    const filteredUssersList = searchKey !== ''
        ? getSearchedDataByKeyValues(usersListWithStatus, displayedColumns, searchKey)
        : usersListWithStatus;

    let noDataFoundOrNoResult = getNoDataFoundOrNoResult(usersListWithStatus, filteredUssersList);

    // const itemsPerPage = getPaginationItem;
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredUssersList?.length / itemsPerPage);
    const paginatedUsersList = filteredUssersList?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

    useEffect(() => {
        dispatch(getUsersListWithStatusRequest(activetab));
        setCurrentPage(1);
    }, [activetab, dispatch]);

    // Function to handle sorting
    const handleSort = (column) => {
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);
    };

    // Sort users based on the selected column and order
    const sortedUsersList = paginatedUsersList && [...paginatedUsersList].sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <React.Fragment>
            <TabContent activeTab={activetab} className="wflexLayout">
                <TabPane tabId={activetab} className="wflexLayout">
                    <div className='wflexLayout'>
                        <div className='wflexScroll d-flex flex-column mb-2'>
                            <div className='flex-grow-1'>
                                {filteredUssersList?.length > 0 ? (
                                    <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                        <thead className='sticky_header'>
                                            <tr>
                                                {tableColumnsByTabId && tableColumnsByTabId?.map((tableKey) => (
                                                    <th key={tableKey.value} onClick={() => handleSort(tableKey.value)}>
                                                        <div>
                                                            {tableKey?.label}
                                                            {sortColumn === tableKey.value ? (
                                                                sortOrder === 'asc' ? (
                                                                    <i className="icon_alfred_tablesortup" />
                                                                ) : (
                                                                    <i className="icon_alfred_tablesortdown" />
                                                                )
                                                            ) : (
                                                                <i className="icon_alfred_tablesort" />
                                                            )}
                                                        </div>
                                                    </th>
                                                ))}
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedUsersList && sortedUsersList?.map((users) => (
                                                <ApproveUsersTableView key={users.patient_id} users={users} />
                                            ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    noDataFoundOrNoResult && (
                                        <div className="d-flex flex-column align-items-center pt-5">
                                            <img src={noDataFoundOrNoResult.img} width={220} alt="" />
                                            <h6 className="mt-3 mb-0">{noDataFoundOrNoResult.msg}</h6>
                                        </div>
                                    ))
                                }
                            </div>
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
                </TabPane>
            </TabContent>
        </React.Fragment>
    )
});
