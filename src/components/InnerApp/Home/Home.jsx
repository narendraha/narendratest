import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { getActivetab } from "../../../_mock/internalJsControl";
import { setActiveTabRequest } from "../../../store/Home/slice";
import { getPatientDetailsRequest } from '../../../store/UtilityCallFunction/slice';
import Loading from "../../InnerApp/LoadingComponent";
import { ExpertMonitoring } from "./expertMonitoring";
import { HealthHub } from "./healthHub";
import { LifeStyleGoal } from "./lifeStyleGoal";
import { RiskOptimization } from "./riskOptimization";
import { SymptomsListForm } from "./symptomsListForm";


let navItemsList = [
  { key: getActivetab.HEALTHHUB, navLink: "Health Hub" },
  { key: getActivetab.EXPTMONITORING, navLink: "Expert Monitoring" },
  { key: getActivetab.SYMPTOMSLIST, navLink: "List your Symptoms" },
  { key: getActivetab.LIFEGOAL, navLink: "Lifestyle Goals" },
  { key: getActivetab.ORMANAGEMENT, navLink: "Optimal Risk Management" },
];

export default function Home() {
  const dispatch = useDispatch();

  const { getProfileDetails, isUtilityLoading } = useSelector((state) => state?.utilityCallFunctionSlice);
  const { activeTab, isLoading, getCurrentTab } = useSelector((state) => state?.homePageSlice);

  useEffect(() => {
    dispatch(getPatientDetailsRequest())
  }, []);


  // const fetchData = async (data) => {
  //   let graphData = {
  //     start_date: data?.start_date,
  //     end_date: data?.end_date,
  //   };
  //   AxiosInstance("application/json")
  //     .post(`/health_details_graph`, graphData)
  //     .then((res) => {
  //       if (res && res.data && res.status === 200) {
  //         if (res.data?.statuscode === 200) {
  //           const data = res?.data?.data || [];
  //           getSymptomData(data);
  //         } else {
  //           toast(res.data?.message, {
  //             position: "top-right",
  //             type: "error",
  //           });
  //         }
  //       }
  //     })
  //     .catch((er) => {
  //       toast(er?.response?.data?.message, {
  //         position: "top-right",
  //         type: "error",
  //       });
  //     });
  // };
  // useEffect(() => {
  //   if (tab === "2") {
  //     fetchData();
  //   }
  // }, [tab]);
  // Format dates in YYYY-MM-DD format

  // useEffect(() => {
  //   if (!symptomData || !symptomData.length) {
  //     // Data not yet available or empty
  //     return;
  //   }
  //   // Extract unique dates from data
  //   const uniqueDates = Array.from(
  //     new Set(symptomData?.length > 0 && symptomData.map((item) => item.tdate))
  //   );

  //   // Sort unique dates in ascending order
  //   // uniqueDates.sort();

  //   // Format dates in YYYY-MM-DD format
  //   const formattedDates = uniqueDates.map((date) =>
  //     Highcharts.dateFormat("%Y-%m-%d", new Date(date))
  //   );

  //   const prepareSeries = (data) => {
  //     const systolicSeries = {
  //       name: "Systolic",
  //       data: [],
  //     };

  //     const diastolicSeries = {
  //       name: "Diastolic",
  //       data: [],
  //     };

  //     data.forEach((item) => {
  //       if (item.tdate !== null) {
  //         systolicSeries.data.push({
  //           x: formattedDates.indexOf(item.tdate),
  //           y: item.systolic_p,
  //           customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b><br/>`,
  //         });
  //         diastolicSeries.data.push({
  //           x: formattedDates.indexOf(item.tdate),
  //           y: item.diastolic_p,
  //           customTooltip: `Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b><br/>`,
  //         });
  //       }
  //     });

  //     return [systolicSeries, diastolicSeries];
  //   };
  //   const series = prepareSeries(symptomData);

  //   const options = {
  //     chart: {
  //       type: "line",
  //       style: {
  //         fontFamily: "Poppins",
  //       },
  //     },
  //     title: {
  //       text: "Blood Pressure Records",
  //       style: {
  //         fontSize: "16px",
  //         fontWeight: "500",
  //       },
  //     },
  //     xAxis: {
  //       categories: formattedDates,
  //       title: {
  //         text: "Date",
  //       },
  //     },
  //     yAxis: {
  //       title: {
  //         text: "Blood Pressure (BPM)",
  //       },
  //     },
  //     credits: {
  //       enabled: false, // Hides the Highcharts watermark
  //     },
  //     tooltip: {
  //       formatter: function () {
  //         const index = this.series.xAxis.categories.indexOf(this.x);
  //         const date = formattedDates[index];
  //         return `<b>${date}</b><br/>${this.point.customTooltip}`;
  //       },
  //     },
  //     series: series,
  //     plotOptions: {
  //       series: {
  //         lineWidth: 1,
  //         marker: {
  //           enabled: true,
  //         },
  //       },
  //     },
  //   };

  //   setChartOptions(options);
  // }, [symptomData]);

  // const sorteddata = [
  //   [Date.UTC(2024, 2, 21), 81],
  //   [Date.UTC(2024, 2, 22), 95],
  //   [Date.UTC(2024, 2, 23), 91],
  //   [Date.UTC(2024, 2, 24), 98],
  //   [Date.UTC(2024, 2, 25), 83],
  //   [Date.UTC(2024, 2, 26), 95],
  //   [Date.UTC(2024, 2, 27), 80],
  //   [Date.UTC(2024, 2, 28), 90],
  //   [Date.UTC(2024, 2, 29), 100],
  // ];

  // useEffect(() => {
  // setResource(createResource(getTabListStatus()));
  // getLastUpdatedHealthDetails();
  // }, [tab]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (document.getElementById("expertmonitoringgraph")) {
  //       Highcharts.chart("expertmonitoringgraph", {
  //         chart: {
  //           type: "area",
  //           style: {
  //             fontFamily: "Poppins",
  //           },
  //           panning: true,
  //         },
  //         title: {
  //           text: "",
  //         },
  //         xAxis: {
  //           type: "datetime",
  //           min: Math.min.apply(
  //             null,
  //             sorteddata.slice(-7).map(function (point) {
  //               return point[0];
  //             })
  //           ),
  //           max: Math.max.apply(
  //             null,
  //             sorteddata.slice(-7).map(function (point) {
  //               return point[0];
  //             })
  //           ),
  //           labels: {
  //             distance: 5,
  //             padding: 5,
  //             overflow: "justify",
  //             style: {
  //               fontSize: "11px",
  //             },
  //             formatter: function () {
  //               return Highcharts.dateFormat("%d-%m-%Y", new Date(this.value));
  //             },
  //             rotation: -45,
  //           },
  //           title: {
  //             text: null,
  //           },
  //           scrollbar: {
  //             enabled: true,
  //           },
  //           tickLength: 0,
  //           gridLineWidth: 0,
  //           lineWidth: 0,
  //           showLastLabel: true,
  //           showEmpty: false,
  //         },
  //         yAxis: {
  //           min: 0,
  //           title: {
  //             text: "Pulse",
  //           },
  //           labels: {
  //             distance: 5,
  //             padding: 5,
  //             style: {
  //               fontSize: "11px",
  //             },
  //           },
  //           endOnTick: false,
  //           gridLineWidth: 1,
  //           showEmpty: false,
  //         },
  //         tooltip: {
  //           valueSuffix: " bpm",
  //         },
  //         responsive: {
  //           rules: [
  //             {
  //               condition: {
  //                 maxWidth: 500,
  //               },
  //             },
  //           ],
  //         },
  //         plotOptions: {
  //           area: {
  //             marker: {
  //               enabled: false,
  //               symbol: "circle",
  //               radius: 2,
  //               states: {
  //                 hover: {
  //                   enabled: true,
  //                 },
  //               },
  //             },
  //             color: "#0079ca",
  //           },
  //           series: {
  //             groupPadding: 1,
  //             pointPadding: 1,
  //             pointPlacement: "on",
  //             borderWidth: 0,
  //             pointWidth: 50,
  //           },
  //         },
  //         navigator: {
  //           enabled: true,
  //         },
  //         credits: {
  //           enabled: false,
  //         },
  //         legend: { enabled: false },
  //         series: [
  //           {
  //             name: "Pulse",
  //             data: sorteddata,
  //           },
  //         ],
  //       });
  //     }
  //   }, 4000);
  // }, [tab, getLastUpdated]);


  // const getTabListStatus = async () => {
  //   setIsLoading(true);
  //   await AxiosInstance("application/json")
  //     .get("/getstatus")
  //     .then((response) => {
  //       if (response && response?.status == 200) {
  //         setGetStatus(response.data?.data);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch((er) => {
  //       toast(er?.response?.data?.message || er?.message, {
  //         position: "top-right",
  //         type: "error",
  //       });
  //     });
  // };

  // const getLastUpdatedHealthDetails = async () => {
  //   await AxiosInstance("application/json")
  //     .get("/healthdetails_lastupdate")
  //     .then((response) => {
  //       if (response && response?.status == 200) {
  //         setgetLastUpdated(response.data?.data);
  //       }
  //     })
  //     .catch((er) => {
  //       console.log(er);
  //       console.log("er?.message: ", er?.message);
  //       toast(er?.response?.data?.message || er?.message, {
  //         position: "top-right",
  //         type: "error",
  //       });
  //     });
  // };

  const changeActiveTabHandle = (setTab) => {
    dispatch(setActiveTabRequest({ setTab, nextOrBackTab: setTab }))
  }

  const getIsActiveTabClassName = (currentTab) => {
    return activeTab === currentTab ? "active" : ""
  }

  console.log("activeTabactiveTab", activeTab)


  return (
    <>
      {(isUtilityLoading || isLoading) && <Loading />}
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-1 text-capitalize">
            Hello, {getProfileDetails?.username}!
          </h3>
          <Row className="al_hometabs">
            <Col sm="12">
              <Nav tabs className="mb-3">
                {navItemsList?.map((item) => (
                  <>
                    <NavItem>
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
                  </>
                ))}
              </Nav>

              <TabContent activeTab={activeTab}>

                <TabPane tabId={getActivetab.HEALTHHUB}>
                  <HealthHub />
                </TabPane>

                <TabPane tabId={getActivetab.EXPTMONITORING}>
                  <ExpertMonitoring />
                </TabPane>

                <TabPane tabId={getActivetab.SYMPTOMSLIST}>
                  <SymptomsListForm />
                </TabPane>

                <TabPane tabId={getActivetab.LIFEGOAL}>
                  <LifeStyleGoal />
                </TabPane>

                <TabPane tabId={getActivetab.ORMANAGEMENT}>
                  <RiskOptimization />
                </TabPane>

              </TabContent>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
