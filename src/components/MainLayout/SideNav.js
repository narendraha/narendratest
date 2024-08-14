import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfileCmpDetails } from '../../_mock/helperIndex';
import smalllogo from "../../images/alfredlogoicon.svg";
import logo from "../../images/alfredlogowhite.svg";
import ModalView from "../Utilities/ModalView";
import { UncontrolledTooltip } from "reactstrap";
import { useSelector } from "react-redux";

export default function SideNav(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileCmpModalProps, setProfileCmpModalProps] = useState("");

  let { menuData } = useSelector((state) => (state?.sessionStoreSlice));

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
      )
      }
      <nav
        className={
          "al_menu_navigator " + (props.isShowmenu ? "al_slide_out " : "")
        }
      >
        <>
          <i
            className="icon_alfred_close al_menuClose"
            onClick={() => props.setIsShowmenu(!props.isShowmenu)}
          > </i>

          < div className="al_logo_container" >
            <img src={smalllogo} className="alsmallLogo" alt="logo icon" />
            <img src={logo} className="alLargeLogo" alt="logo" />
          </div>
          < div className="al_menus" >
            <div className="navbar" >
              {menuData && menuData?.map((menu, index) => {
                return (
                  <React.Fragment key={index} >
                    {menu?.subModules && menu?.subModules?.map((subModules, subIndex) => (
                      <div className="al_submenu w-100" key={subIndex} >
                        <div className={"menu-item " + (location.pathname === "/" + subModules.link ? "active" : "")}>
                          < div
                            id={subModules.link}
                            onClick={() => handleMenuClick(subModules.link)}
                          >
                            <i className={subModules.icon} > </i>
                            < span > {subModules.name} </span>
                          </div>
                          {/* <UncontrolledTooltip
                            modifiers={
                              [{
                                preventOverflow: {
                                  boundariesElement: "window",
                                },
                              }]}
                            placement="top"
                            trigger='hover'
                            target={subModules.link}
                          >
                            {subModules.name}
                          </UncontrolledTooltip> */}
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </>
      </nav >
    </>
  );
}
