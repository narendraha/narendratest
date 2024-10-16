import React from 'react';
import { useSelector } from 'react-redux';
import { getActionTypes, getActivetab } from '../../../../_mock/helperIndex';
import { HealthHubContentVedioMdal } from './healthHubContentVedioModel';
import HealthHubContentView from './healthHubContentView';
import { HealthHubOverview } from './healthHubOverview';
import HealthubFilter from './healthubFilter';

const HealthHubManager = () => {

    const actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType);
    const actionData = useSelector((state) => state?.utilityCallFunctionSlice?.actionData);
    const activeTab = useSelector((state) => state?.homePageSlice?.activeTab);

    return (
        <React.Fragment>
            <HealthubFilter />
            <HealthHubContentView />
            {activeTab === getActivetab.HEALTHHUB && actionType === getActionTypes.SELECT && !actionData?.isVedioModel && <HealthHubOverview />}
            {activeTab === getActivetab.HEALTHHUB && actionType === getActionTypes.SELECT && actionData?.isVedioModel && <HealthHubContentVedioMdal />}
        </React.Fragment>
    )
}

export default HealthHubManager