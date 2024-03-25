import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import logo from '../../../images/alfredlogowhite.svg';
import smalllogo from '../../../images/alfredlogoicon.svg';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SideNav(props) {
  const location = useLocation();

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
      // } ,
      // {
      //   moduleId: '3',
      //   name: 'Expert Monitoring',
      //   link: 'monitoring',
      //   icon: 'icon_alfred_E',
      //   subModules: [
      //     { id: "1", name: "Expert Monitoring", link: 'monitoring', icon: 'icon_alfred_E' }
      //   ]
      // },
      // {
      //   moduleId: '4',
      //   name: 'List your Symptoms',
      //   link: 'symptoms',
      //   icon: 'icon_alfred_L',
      //   subModules: [
      //     { id: "1", name: "List your Symptoms", link: 'symptoms', icon: 'icon_alfred_L' }
      //   ]
      // },
      // {
      //   moduleId: '5',
      //   name: 'Life Style Goals',
      //   link: 'goals',
      //   icon: 'icon_alfred_L',
      //   subModules: [
      //     { id: "1", name: "Life Style Goals", link: 'goals', icon: 'icon_alfred_L' }
      //   ]
      // },
      // {
      //   moduleId: '6',
      //   name: 'Optimal Risk Management',
      //   link: 'riskmanagement',
      //   icon: 'icon_alfred_O',
      //   subModules: [
      //     { id: "1", name: "Optimal Risk Management", link: 'riskmanagement', icon: 'icon_alfred_O' }
      //   ]
      // },
      // {
      //   moduleId: '7',
      //   pid: 1000,
      //   name: 'Doctors',
      //   link: 'doctors',
      //   icon: 'icon_alfred_doctor',
      //   subModules: [
      //     { id: "1", name: "Doctors", link: 'doctors', icon: 'icon_alfred_doctor' }
      //   ]
      // },
      // {
      //   moduleId: '8',
      //   name: 'Schedules',
      //   link: 'schedules',
      //   icon: 'icon_alfred_schedules',
      //   subModules: [
      //     { id: "1", name: "Schedules", link: 'schedules', icon: 'icon_alfred_schedules' },
      //   ]
      // },
      // {
      //   moduleId: '9',
      //   name: 'Knowledge Bank',
      //   link: 'knowledgebank',
      //   icon: 'icon_alfred_knowledgebank',
      //   subModules: [
      //     { id: "1", name: "Knowledge Bank", link: 'knowledgebank', icon: 'icon_alfred_knowledgebank' },
      //   ]
    }
  ]

  useEffect(() => {

  }, [props.isShowmenu])

  return (
    <>
      <nav className={'al_menu_navigator ' + (props.isShowmenu ? 'al_slide_out ' : '')}>
        <>
          <i className='icon_alfred_close al_menuClose' onClick={() => props.setIsShowmenu(!props.isShowmenu)}></i>

          <div className='al_logo_container'>
            <img src={smalllogo} className="alsmallLogo" alt="logo icon" />
            <img src={logo} className="alLargeLogo" alt="logo" />
          </div>
          <div className='al_menus'>
            <div className="navbar">
              {menuData.map((menu, index) => {
                return <React.Fragment key={index}>
                  {menu.subModules.length > 0 &&
                    <>
                      {/* <h6 className="w-100">{menu.name}</h6> */}
                      {menu.subModules.map((subModules, index) =>
                        <div className='al_submenu w-100' key={index}>
                          <div className={'menu-item ' + (location.pathname === '/' + subModules.link ? 'active' : '')}>
                            {/* <div id={subModules.link + subModules.id} onClick={redirectPath(subModules.link)}>
                              <i className={subModules.icon}></i><span>{subModules.name}</span>
                            </div> */}
                            <Link to={"/" + subModules.link}>
                              <div id={subModules.link + subModules.id}>
                                <i className={subModules.icon}></i><span>{subModules.name}</span>
                              </div>
                            </Link>
                            {props.isShowmenu && <UncontrolledTooltip
                              placementPrefix="al_bs_tooltip"
                              modifiers={{ preventOverflow: { boundariesElement: 'window' } }}
                              placement='top' target={subModules.link + subModules.id}>
                              {menu.name}
                            </UncontrolledTooltip>
                            }
                          </div>
                        </div>
                      )
                      }
                    </>
                  }
                </React.Fragment>
              })}
            </div>
          </div>
        </>
      </nav>
    </>
  )
}