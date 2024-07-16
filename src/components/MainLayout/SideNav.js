import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import { getProfileCmpDetails } from '../../_mock/helperIndex';
import smalllogo from "../../images/alfredlogoicon.svg";
import logo from "../../images/alfredlogowhite.svg";
import ModalView from "../Utilities/ModalView";

export default function SideNav(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileCmpModalProps, setProfileCmpModalProps] = useState("");

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
      moduleId: "2",
      name: "Home",
      link: "home",
      icon: "icon_alfred_home",
      subModules: [
        { id: "1", name: "Home", link: "home", icon: "icon_alfred_home" },
      ],
    },
    {
      moduleId: "3",
      name: "Behavioural",
      link: "chat",
      icon: "icon_alfred_bot",
      subModules: [
        {
          id: "1",
          name: "Behavioural Chat",
          link: "chat",
          icon: "icon_alfred_bot",
        },
      ],
    },
    {
      moduleId: "4",
      name: "Bot Manager",
      link: "historychat",
      icon: "icon_alfred_botquestionnaire",
      subModules: [
        {
          id: "2",
          name: "History Bot",
          link: "historychat",
          icon: "icon_alfred_botquestionnaire",
        },
        // {
        //   id: "3",
        //   name: "Upload Document",
        //   link: "uploaddocument",
        //   icon: "icon_alfred_uploaddocument",
        // }
      ],
    },
    {
      moduleId: "5",
      name: "Reports",
      link: "transcriptsummary",
      icon: "icon_alfred_reports",
      subModules: [
        {
          id: "1",
          name: "History Transcript Summary",
          link: "transcriptsummary",
          icon: "icon_alfred_reports",
        },
      ],
    },
    // {
    //   moduleId: '6',
    //   name: 'User Management',
    //   link: 'roles',
    //   icon: 'icon_alfred_roles',
    //   subModules: [
    //     { id: "1", name: "Role Management", link: 'roles', icon: 'icon_alfred_roles' },
    //     { id: "2", name: "Users", link: 'users', icon: 'icon_alfred_menu_client_user' },
    //     { id: "3", name: "List of Patients", link: 'patientslist', icon: 'icon_alfred_patientslist' },
    //     { id: "4", name: "Your Doctors", link: 'doctorslist', icon: 'icon_alfred_doctors' },
    //     { id: "5", name: "Approve Users", link: 'approveusers', icon: 'icon_alfred_approveusers' }
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
    // }
  ];

  useEffect(() => { }, [props.isShowmenu]);

  const handleClose = () => {
    setProfileCmpModalProps({ ...profileCmpModalProps, isModalVisible: false });
  };

  const handleMenuClick = async (link) => {
    const result = await getProfileCmpDetails(link, false, true);
    setProfileCmpModalProps(result);
    if (result?.navigationLink && result?.navigationLink !== "")
      navigate(result?.navigationLink)
  };

  const getIsmodalVisibleProp = (data) => {
    if (data?.isModalVisible)
      handleMenuClick(data?.path, true)
  }
  let { redirectionPath, isModalVisible, modalMessage } = profileCmpModalProps;

  return (
    <>
      {isModalVisible && (
        <ModalView
          msg={modalMessage}
          handleClose={handleClose}
          isModalVisible={isModalVisible}
          path={redirectionPath}
          modelVisibleProp={getIsmodalVisibleProp}
        />
      )}
      <nav
        className={
          "al_menu_navigator " + (props.isShowmenu ? "al_slide_out " : "")
        }
      >
        <>
          <i
            className="icon_alfred_close al_menuClose"
            onClick={() => props.setIsShowmenu(!props.isShowmenu)}
          ></i>

          <div className="al_logo_container">
            <img src={smalllogo} className="alsmallLogo" alt="logo icon" />
            <img src={logo} className="alLargeLogo" alt="logo" />
          </div>
          <div className="al_menus">
            <div className="navbar">
              {menuData.map((menu, index) => {
                return (
                  <React.Fragment key={index}>
                    {menu.subModules.length > 0 && (
                      <>
                        {/* <h6 className="w-100">{menu.name}</h6> */}
                        {menu.subModules.map((subModules, index) => (
                          <div className="al_submenu w-100" key={index}>
                            <div
                              className={
                                "menu-item " +
                                (location.pathname === "/" + subModules.link
                                  ? "active"
                                  : "")
                              }
                            >
                              <div
                                id={subModules.link + subModules.id}
                                onClick={() => handleMenuClick(subModules.link)}
                              >
                                <i className={subModules.icon}></i>
                                <span>{subModules.name}</span>
                              </div>
                              {props.isShowmenu && (
                                <UncontrolledTooltip
                                  modifiers={[{
                                    preventOverflow: {
                                      boundariesElement: "window",
                                    },
                                  }]}
                                  placement="top"
                                  target={subModules.link + subModules.id}
                                >
                                  {subModules.name}
                                </UncontrolledTooltip>
                              )}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      </nav>
    </>
  );
}
