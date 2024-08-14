import React from 'react';
import { useSelector } from 'react-redux';
import { getActionTypes, getActivetab } from '../../../../_mock/helperIndex';
import HealthHubContentView from './healthHubContentView';
import { HealthHubOverview } from './healthHubOverview';
import HealthubFilter from './healthubFilter';

const HealthHubManager = () => {

    const { actionType } = useSelector((state) => state?.utilityCallFunctionSlice);
    const { activeTab } = useSelector((state) => state?.homePageSlice);

    return (
        <React.Fragment>
            <HealthubFilter />
            <HealthHubContentView />
            {activeTab === getActivetab.HEALTHHUB && actionType === getActionTypes.SELECT && <HealthHubOverview />}
        </React.Fragment>
    )
}

export default HealthHubManager