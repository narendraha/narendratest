import React from 'react';
import { useSelector } from 'react-redux';
import { getActionTypes } from '../../../../_mock/internalJsControl';
import SymptomsLastUpdatedView from './symptomsLastUpdatedView';
import { SymptomsListForm } from './symptomsListForm';

const SymptomsListManager = () => {
    const { actionType } = useSelector((state) => state?.utilityCallFunctionSlice);

    return (
        <React.Fragment>
            <SymptomsListForm />
            {actionType === getActionTypes.SELECT && <SymptomsLastUpdatedView />}
        </React.Fragment>
    )
}

export default SymptomsListManager