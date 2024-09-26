import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, PopoverBody, UncontrolledPopover } from 'reactstrap';
import noNotifications from '../../images/noNotifications.svg';
import { logoutRequest } from '../../store/SessionStore/slice';
import { getPatientDetailsRequest } from '../../store/UtilityCallFunction/slice';

export default function Topbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState();
  const [isOpenModel, setOpenModel] = useState(false);

  const { getProfileDetails, profilePicture } = useSelector((state) => (state?.utilityCallFunctionSlice));
  const { menuData } = useSelector((state) => (state?.sessionStoreSlice));

  useEffect(() => {
    dispatch(getPatientDetailsRequest())
  }, [dispatch]);

  const handleProfile = () => {
    navigate('/profile')
  }
  const handleLogOut = () => {
    dispatch(logoutRequest())
    navigate('/signin')
  }

  const lPathName = useLocation().pathname;
  const sideMenu = lPathName === "/" ? menuData?.[0] : menuData?.find(s => '/' + s.link === lPathName?.replace('/*', '') || s.subModules.findIndex(y => '/' + y.link === lPathName?.replace('/*', '')) !== -1)
  const sideSubMenu = lPathName === "/" ? sideMenu?.subModules?.[0] : sideMenu?.subModules?.find(y => ('/' + y.link === lPathName?.replace('/*', '')));

  const handleCloseAndOpen = () => {
    setOpenModel(!isOpenModel)
  }

  return (
    <>
      <header className='al_top_navigation al-pad'>
        <div className='al_top_left w-100'>
          <div>
            <i className='icon_alfred_wmainmenu' onClick={() => props.setIsShowmenu(!props.isShowmenu)}></i>
          </div>
          <div className='d-flex'>
            <div className='position-relative mx-4'>
              <button type="button" id="notificationpopover"><i className='icon_alfred_notification pointer' onClick={() => handleCloseAndOpen()}></i></button>
              <div className="badge badge-pill badge-danger al_noti-icon-badge">0</div>
              <UncontrolledPopover
                placement="top"
                target="notificationpopover"
                trigger="legacy"
                className='alnotification_panel'
                isOpen={isOpenModel}
                modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
              >
                <PopoverBody className='d-flex flex-column'>
                  <div className='flex-grow-1 h-100 p-2 d-flex flex-column h-100'>
                    <div className='d-flex align-items-center justify-content-between'>
                      <h6 className='mb-0'>Notifications</h6>
                      <i className="icon_alfred_close pointer" title="Close" onClick={() => handleCloseAndOpen()}></i>
                    </div>
                    <div className='text-center mt-3 d-flex flex-column align-items-center justify-content-center flex-grow-1'>
                      <img src={noNotifications} alt="" width={60} />
                      <div className='mt-3'>Clear notifications, just like a steady pulse—nothing new!</div>
                    </div>

                    {/* <div className='al_nudegeitem'>
                      <div>Dr. George has accepted your request to be as your primary doctor</div>
                      <div>Dr. George has been removed as a primary doctor for you. Please choose your primary doctor from <Link to="/doctorslist" className='text-decoration-underline'>Your Doctors</Link> page</div>
                      <div>
                        <Row className='align-items-center'>
                          <Col>John smith wants you to be his primary doctor.</Col>
                          <div className='w-auto'>
                            <button type="button" className='al_button_sm al_savebtn me-2'>Accept</button>
                            <button type="button" className='al_button_sm al_cancelbgbutton'>Reject</button>
                          </div>
                        </Row>
                      </div>
                    </div> */}
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>

            <div className="d-flex ms-4">
              <div className="pointer">
                <Dropdown isOpen={menu} toggle={() => setMenu(menu => !menu)}>
                  <DropdownToggle className="nav-link" tag="a">
                    <img src={profilePicture} alt="user" className='al_useravatar al_avatar' />
                    {/* <div className="al_progresscontainer">
                      <div className='al_progressbar'>
                        <CircularProgressbar
                          value={getProfileDetails?.profile_percentage >= 0 ? getProfileDetails?.profile_percentage : 0}
                          styles={buildStyles({
                            strokeLinecap: 'round',
                            trailColor: '#dddddd',
                            backgroundColor: '#3bc0c3',
                          })}
                        />
                      </div>
                      <div className='al_profilepercent'>{`${getProfileDetails?.profile_percentage >= 0 ? getProfileDetails?.profile_percentage : 0}%`}</div> 
                    </div>*/}

                    {/* <img src={user} alt="user" className='al_useravatar al_avatar' /> */}
                    <div className='d-flex flex-column ms-2 text-capitalize'>
                      <span className='al_uName'>{getProfileDetails?.username}</span>
                    </div>
                  </DropdownToggle>
                  <DropdownMenu className="al_menu-card">
                    <DropdownItem tag="div" onClick={() => handleProfile()} >Profile</DropdownItem>
                    <DropdownItem tag="div" onClick={() => handleLogOut()}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header >
      {sideMenu && <div className='al_submenu_content'>
        <div className='al_menu_name'>{sideMenu.name}<><span><i className='icon_alfred_right_arrow'></i></span><span className='al_header_bc'>{sideSubMenu.name}</span></></div>
      </div>
      }
    </>
  )
}