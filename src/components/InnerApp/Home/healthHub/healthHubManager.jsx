import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActionTypes, getActivetab } from '../../../../_mock/helperIndex';
import { getHealthHubProgressRequest } from '../../../../store/Home/slice';
import HealthHubContentView from './healthHubContentView';
import { HealthHubOverview } from './healthHubOverview';
import HealthubFilter from './healthubFilter';

const HealthHubManager = () => {
    const dispatch = useDispatch();

    const { actionType } = useSelector((state) => state?.utilityCallFunctionSlice);
    const { activeTab } = useSelector((state) => state?.homePageSlice);

    // useEffect(() => {
    //     dispatch(getHealthHubProgressRequest())
    // }, []);

    return (
        <React.Fragment>
            <HealthubFilter />
            <HealthHubContentView />
            {activeTab === getActivetab.HEALTHHUB && actionType === getActionTypes.SELECT && <HealthHubOverview />}
        </React.Fragment>
    )
}

export default HealthHubManager