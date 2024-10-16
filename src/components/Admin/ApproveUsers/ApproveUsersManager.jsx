import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setResetApproveUsersSlice } from '../../../store/ApproveUsers/slice';
import { ApproveusersFilter } from './ApproveUsersFilter';
import { ApproveUsersRemarkModal } from './ApproveUsersRemarkModal';
import { ApproveUsersTableManager } from './ApproveUsersTableManager';

const ApproveUsersManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setResetApproveUsersSlice())
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="wflexLayout">
        <div className='al-pad pb-1'>
          <h3 className='bc_main_text mb-0'>User Requests</h3>
        </div>
        <div className="wflexLayout">
          <ApproveusersFilter />
          <ApproveUsersTableManager />
          <ApproveUsersRemarkModal />
        </div>
      </div>
    </React.Fragment>
  )
}

export default ApproveUsersManager