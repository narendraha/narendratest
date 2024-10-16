import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, FormGroup, Label, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { getAdminUserStatus, getRole } from '../../../_mock/helperIndex';
import {
    setApproveUsersActiveTab,
    setApproveUserSelection,
    setApproveUsersSearchKey
} from '../../../store/ApproveUsers/slice';

let navItemsList = [
    { key: getAdminUserStatus.PENDING, navLink: "Pending" },
    { key: getAdminUserStatus.APPROVE, navLink: "Approved" },
    { key: getAdminUserStatus.HOLD, navLink: "Hold" },
    { key: getAdminUserStatus.REJECT, navLink: "Rejected" },
];

export const ApproveusersFilter = React.memo(() => {
    const dispatch = useDispatch();

    const approveUserSelection = useSelector((state) => (state?.approveUsersSlice?.approveUserSelection));
    const activetab = useSelector((state) => (state?.approveUsersSlice?.approveUsersActiveTab));
    const usersListWithStatus = useSelector((state) => (state?.approveUsersSlice?.usersListWithStatus));

    const handleUserSelection = (selectedUser) => {
        dispatch(setApproveUserSelection(selectedUser))
    }

    let getActivetab = (key) => {
        return key === activetab ? 'active' : ''
    }

    const handleActiveTab = (key) => {
        dispatch(setApproveUsersActiveTab(key))
    }

    const searchHandle = (e) => {
        dispatch(setApproveUsersSearchKey(e.target.value));
    };

    return (
        <React.Fragment>
            <Nav tabs className="al_tabs_border mt-0 al-mar">
                {navItemsList && navItemsList.map((navItem) => (
                    <NavItem>
                        <NavLink className={getActivetab(navItem.key)}
                            onClick={() => handleActiveTab(navItem.key)}>
                            <span className="d-none d-sm-block">{navItem.navLink}</span>
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <Row className='d-flex align-items-center al-pad py-1 flex-xs-column'>
                <Col className='d-flex align-items-center'>
                    <FormGroup
                        check
                        inline
                        className="d-flex me-0 ps-0 flex-wrap"
                    >
                        <Label
                            className="d-flex align-center me-3"
                        >
                            <input
                                type="radio"
                                name="usertype"
                                className="me-2"
                                checked={approveUserSelection === getRole.PATIENT}
                                onChange={() => handleUserSelection(getRole.PATIENT)} />
                            Patient
                        </Label>
                        <Label
                            className="d-flex align-center me-3"
                        >
                            <input
                                type="radio"
                                name="usertype"
                                className="me-2"
                                disabled={true}
                                checked={approveUserSelection === getRole.PHYSICIAN}
                                onChange={() => handleUserSelection(getRole.PHYSICIAN)} />
                            Doctor
                        </Label>
                    </FormGroup>
                </Col>
                <div className='w-auto px-3'>
                    <div className="al_searchleft px-0">
                        <input type="text" className="form-control" placeholder="Search"
                            disabled={usersListWithStatus?.length === 0}
                            onChange={searchHandle}
                        />
                        <i className="icon_alfred_search"></i>
                    </div>
                </div>
            </Row>
        </React.Fragment>
    )
});
