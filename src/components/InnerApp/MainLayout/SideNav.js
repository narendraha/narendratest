import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UncontrolledTooltip } from 'reactstrap';
import { AxiosInstance } from '../../../_mock/utilities';
import smalllogo from '../../../images/alfredlogoicon.svg';
import logo from '../../../images/alfredlogowhite.svg';

export default function SideNav(props) {
  const location = useLocation();
// const [isProfileCompleted,setIsProfileCompleted]= useState();
const navigate = useNavigate()
  const menuData = [
    // {
    //   moduleId: '1',
    //   name: 'Dashboard',
    //   link: 'dashboard',
    //   icon: 'icon_alfred_dashboard',
    //   subModules: [
    //     { id: "1", name: "Dashboard", link: 'dashboard', icon: 'icon_alfred_dashboard' }
    //   ]
    // },
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
    },
    {
      moduleId: '3',
      name: 'Bot Manager',
      link: 'uploaddocument',
      icon: 'icon_alfred_botquestionnaire',
      subModules: [
        { id: "2", name: "History Bot", link: 'historychat', icon: 'icon_alfred_botquestionnaire' }
      ]
      // },
      // {
      //   moduleId: '4',
      //   name: 'User Management',
      //   link: 'roles',
      //   icon: 'icon_alfred_roles',
      //   subModules: [
      //     { id: "1", name: "Role Management", link: 'roles', icon: 'icon_alfred_roles' },
      //     { id: "2", name: "Users", link: 'users', icon: 'icon_alfred_menu_client_user' }
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

  const getHistoryBotQues = async () => {
    try {
      const response = await AxiosInstance("application/json").get("/profile_completion");
      if (response && response.status === 200 && response.data.statuscode === 200) {
        return response.data?.data?.reached_75_percent;
      }
    } catch (error) {
      console.error("Error fetching profile completion status:", error);
      return false;
    }
  };
  const handleMenuClick = async (link) => {
    console.log('link: ', link);
    if (link === 'transcriptsummary') {
      const isCompleted = await getHistoryBotQues();
      if (isCompleted) {
        navigate('/transcriptsummary');
      } else {
        toast("Profile is not complete. You cannot access this page.", {
          position: "top-right",
          type: "error",
        });
        toast.error();
      }
    } else {
      navigate(`/${link}`);
    }
  };
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
                            <div id={subModules.link + subModules.id} onClick={() => handleMenuClick(subModules.link)}>
                              <i className={subModules.icon}></i><span>{subModules.name}</span>
                            </div>
                            {props.isShowmenu && <UncontrolledTooltip
                              placementPrefix="al_bs_tooltip"
                              modifiers={{ preventOverflow: { boundariesElement: 'window' } }}
                              placement='top' target={subModules.link + subModules.id}>
                              {subModules.name}
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