import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { getActionTypes, getActivetab, pageTitle } from "../../../_mock/internalJsControl";
import { getActiveTabRequest, setActiveTabRequest } from "../../../store/Home/slice";
import { getPatientDetailsRequest } from '../../../store/UtilityCallFunction/slice';
import { ExpertMonitoring } from './expertMonitoring';
import ExpertMonitoringLastUpdateView from "./expertMonitoringlastUpdateView";
import { HealthHub } from "./healthHub";
import { HealthHubOverview } from "./healthHubOverview";
import { LifeStyleGoal } from "./lifeStyleGoal";
import { RiskOptimization } from "./riskOptimization";
import SymptomsListView from "./symptomsLastUpdatedView";
import { SymptomsListForm } from "./symptomsListForm";

let navItemsList = [
  { key: getActivetab.HEALTHHUB, navLink: "Health Hub" },
  { key: getActivetab.EXPTMONITORING, navLink: "Expert Monitoring" },
  { key: getActivetab.SYMPTOMSLIST, navLink: "List your Symptoms" },
  { key: getActivetab.LIFEGOAL, navLink: "Lifestyle Goals" },
  { key: getActivetab.ORMANAGEMENT, navLink: "Optimal Risk Management" },
];

export default function HomeManager() {
  const dispatch = useDispatch();

  const { getProfileDetails, actionType } = useSelector((state) => state?.utilityCallFunctionSlice);
  const { activeTab, isNavRedirection } = useSelector((state) => state?.homePageSlice);

  useEffect(() => {
    dispatch(getPatientDetailsRequest())
    /* eslint-disable*/
    if (!isNavRedirection)
      dispatch(getActiveTabRequest())
  }, []);

  const changeActiveTabHandle = (setTab) => {
    dispatch(setActiveTabRequest({ setTab: null, nextOrBackTab: setTab }))
  }

  const getIsActiveTabClassName = (currentTab) => {
    return activeTab === currentTab ? "active" : ""
  }

  let currentHometab = activeTab === getActivetab.HEALTHHUB ? "Health Hub" :
    activeTab === getActivetab.EXPTMONITORING ? "Expert Monitoring" :
      activeTab === getActivetab.SYMPTOMSLIST ? "List Of Symptoms" :
        activeTab === getActivetab.LIFEGOAL ? "Lifestyle Goal" :
          "Optimal Risk Management";

  pageTitle(`Home | ${currentHometab}`);

  return (
    <>
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-1 text-capitalize">
            Hello, {getProfileDetails?.username}!
          </h3>
          <Row className="al_hometabs">
            <Col sm="12">
              <Nav tabs className="mb-3">
                {navItemsList?.map((item) => (
                  <NavItem key={item?.key}>
                    <NavLink
                      className={getIsActiveTabClassName(item?.key)}
                      onClick={() => changeActiveTabHandle(item?.key)}
                    >
                      <div>
                        <span className={getIsActiveTabClassName(item?.key)}>{item?.navLink?.[0]}</span>
                        <span className="d-none d-sm-block">{item?.navLink}</span>
                      </div>
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>

              <TabContent activeTab={activeTab}>

                <TabPane tabId={getActivetab.HEALTHHUB}>
                  {activeTab === getActivetab.HEALTHHUB && <HealthHub />}
                  {activeTab === getActivetab.HEALTHHUB && actionType === getActionTypes.SELECT && <HealthHubOverview />}
                </TabPane>

                <TabPane tabId={getActivetab.EXPTMONITORING}>
                  {activeTab === getActivetab.EXPTMONITORING && <ExpertMonitoring />}
                  {(activeTab === getActivetab.EXPTMONITORING && actionType === getActionTypes.SELECT) ? <ExpertMonitoringLastUpdateView /> : ""}
                </TabPane>

                <TabPane tabId={getActivetab.SYMPTOMSLIST}>
                  {activeTab === getActivetab.SYMPTOMSLIST && <SymptomsListForm />}
                  {(activeTab === getActivetab.SYMPTOMSLIST && actionType === getActionTypes.SELECT) ? <SymptomsListView /> : ""}
                </TabPane>

                <TabPane tabId={getActivetab.LIFEGOAL}>
                  {activeTab === getActivetab.LIFEGOAL && <LifeStyleGoal />}
                </TabPane>

                <TabPane tabId={getActivetab.ORMANAGEMENT}>
                  {activeTab === getActivetab.ORMANAGEMENT && <RiskOptimization />}
                </TabPane>

              </TabContent>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
