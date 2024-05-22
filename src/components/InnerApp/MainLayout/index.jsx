import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import SideNav from './SideNav';
import LayoutAlertMessage from './LayoutAlertMessage';
import ConfirmationAction from './ConfirmationAction';
import ChatBot from '../../ChatBot';
import { Popover, PopoverBody, Button } from 'reactstrap';
import chatBot from '../../../images/chatboticon.svg';
// import Loading from './Loading';

export default function MainLayout() {
    const [botisOpen, setBotIsOpen] = useState(true);
    const [isShowmenu, setIsShowmenu] = useState(true);

    return <React.Fragment>
        <Suspense fallback={<></>}>
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
                    {botisOpen && <ChatBot botisOpen={botisOpen} setBotIsOpen={setBotIsOpen} />}
                </div>
                <Button id="homechatpopover" type="button" className='p-0 al_chat'>
                    {!botisOpen && <img src={chatBot} alt="bot" id="homechatpopover" onClick={() => setBotIsOpen(!botisOpen)} />
                    }</Button>

                {!botisOpen && <Popover
                    placement="left"
                    target="homechatpopover"
                    trigger="legacy"
                    isOpen={!botisOpen}
                    modifiers={{ preventOverflow: { boundariesElement: 'window' } }}
                >
                    <PopoverBody>
                        Hello, I am Alfred! How can i Assist you today?
                    </PopoverBody>
                </Popover>
                }
            </div>
        </Suspense>
    </React.Fragment >
}
