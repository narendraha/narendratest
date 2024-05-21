import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import user from '../../../images/puser.jpg';
import { jwtDecode } from "jwt-decode";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Topbar(props) {
  const [menu, setMenu] = useState();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('profile')
  }
  const handleLogOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/signin')
  }

  const menuData = [
    {
      moduleId: '1',
      name: 'Dashboard',
      link: 'dashboard',
      icon: 'icon_alfred_dashboard',
      subModules: [
        { id: "1", name: "Dashboard", link: 'dashboard', icon: 'icon_alfred_dashboard' }
      ]
    },
    {
      moduleId: '2',
      name: 'Home',
      link: 'home',
      icon: 'icon_alfred_home',
      subModules: [
        { id: "1", name: "Home", link: 'home', icon: 'icon_alfred_home' }
      ]
    },
    {
      moduleId: '3',
      name: 'Reports',
      link: 'transcriptsummary',
      icon: 'icon_alfred_reports',
      subModules: [
        { id: "1", name: "History Transcript Summary", link: 'transcriptsummary', icon: 'icon_alfred_reports' }
      ]
    }
  ]
  const lPathName = useLocation().pathname;
  const sideMenu = menuData.find(s => '/' + s.link === lPathName?.replace('/*', '') || s.subModules.findIndex(y => '/' + y.link === lPathName?.replace('/*', '')) !== -1);
  const sideSubMenu = sideMenu?.subModules?.find(y => ('/' + y.link === lPathName?.replace('/*', '')))

  return (
    <>
      <header className='al_top_navigation al-pad'>
        <div className='al_top_left w-100'>
          <div>
            <i className='icon_alfred_wmainmenu' onClick={() => props.setIsShowmenu(!props.isShowmenu)}></i>
          </div>
          <div className='d-flex'>
            <div className='position-relative mx-4'>
              <i className='icon_alfred_notification pointer'></i>
              <div className="badge badge-pill badge-danger al_noti-icon-badge">0</div>
            </div>

            <div className="d-flex ms-4">
              <div className="pointer">
                <Dropdown isOpen={menu} toggle={() => setMenu(menu => !menu)}>
                  <DropdownToggle className="nav-link" tag="a">
                    <div className="al_progresscontainer">
                      <img src={user} alt="user" className='al_useravatar al_avatar' />
                      <div className='al_progressbar'>
                        <CircularProgressbar
                          value={45}
                          styles={buildStyles({
                            strokeLinecap: 'round',
                            trailColor: '#dddddd',
                            backgroundColor: '#3bc0c3',
                          })}
                        />
                      </div>
                      <div className='al_profilepercent'>45%</div>
                    </div>

                    {/* <img src={user} alt="user" className='al_useravatar al_avatar' /> */}
                    <div className='d-flex flex-column ms-2'>
                      <span className='al_uName'>{decoded?.username}</span>
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
      </header>
      {sideMenu && <div className='al_submenu_content'>
        <div className='al_menu_name'>{sideMenu.name}<><span><i className='icon_alfred_right_arrow'></i></span><span className='al_header_bc'>{sideSubMenu.name}</span></></div>
      </div>}
    </>
  )
}