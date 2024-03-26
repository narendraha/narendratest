import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import user from '../../../images/userprofileImg.png';

export default function Topbar(props) {
  const [menu, setMenu] = useState();
  const [slang, setSlang] = useState();
  const navigate = useNavigate();

  const selectedLanguage = "en";

  const handleProfile = () => {
    navigate('profile')
  }
  const handleLogOut = () => {
    navigate('/')
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
              <i className='icon_alfred_notification pointer'></i>
              <div className="badge badge-pill badge-danger al_noti-icon-badge">0</div>
            </div>

            <div className="d-flex ms-4">
              <div className="pointer">
                <Dropdown isOpen={menu} toggle={() => setMenu(menu => !menu)}>
                  <DropdownToggle className="nav-link" tag="a">
                    <img src={user} alt="user" className='al_useravatar al_avatar' />
                    <div className='d-flex flex-column ms-2'>
                      <span className='al_uName'>Alfred user</span>
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
      <div className='al_submenu_content'>
        <div className='al_menu_name'>Dashboard<><span><i className='icon_alfred_right_arrow'></i></span><span className='al_header_bc'>Dashboard</span></></div>
      </div>
    </>
  )
}