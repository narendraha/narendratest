import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import SideNav from './SideNav';
import LayoutAlertMessage from './LayoutAlertMessage';
import ConfirmationAction from './ConfirmationAction';

export default function MainLayout() {
    
    const [isShowmenu, setIsShowmenu] = useState(true);

    return <React.Fragment>
        <div className='al_site_container'>
            {/* <LayoutAlertMessage /> */}
            {/* <ConfirmationAction /> */}
            <div className='wflexLayout flex-row position-relative'>
                <SideNav isShowmenu={isShowmenu} setIsShowmenu={setIsShowmenu} />
                <div className='al_right_container'>
                    <Topbar isShowmenu={isShowmenu} setIsShowmenu={setIsShowmenu} />
                    <main className='al_main_container'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    </React.Fragment >
}
