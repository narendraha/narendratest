import { ErrorMessage, Field, Form, Formik } from "formik";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import * as Yup from "yup";
import {
  allowsOnlyNumericOnly3Digit,
  allowsOnlyNumericOnly4Digit,
} from "../../../_mock/RegularExp";
import { AxiosInstance } from "../../../_mock/utilities";
import bulp from "../../../images/idea.png";
import Loading from "../../InnerApp/LoadingComponent";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import { createResource } from "../createResource";
import { HealthHub } from "./healthHub";
import { LifeStyleGoal } from "./lifeStyleGoal";
import { RiskOptimization } from "./riskOptimization";
import { SymptomsListForm } from "./symptomsListForm";

// import { lifeStyleGoalSymptomsKeys } from '../../../_mock/helperIndex'

export default function Home() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [getTabStatus, setGetStatus] = useState({});
  const [tab, setTab] = useState(
    location?.state?.activeTab ? location?.state?.activeTab : "1"
  );
  // const [labelValues, setLabelValues] = useState(0);
  // const [labelValues1, setLabelValues1] = useState(0);
  // const [labelValues2, setLabelValues2] = useState(0);
  // const [labelValues3, setLabelValues3] = useState(0);
  // const [labelValues4, setLabelValues4] = useState(0);
  // const [labelValues5, setLabelValues5] = useState(0);
  // const [labelValues6, setLabelValues6] = useState(0);
  // const [labelValues7, setLabelValues7] = useState(0);
  // const [labelValues8, setLabelValues8] = useState(0);
  // const [labelValues9, setLabelValues9] = useState(0);
  // const [labelValues10, setLabelValues10] = useState(0);
  // const [labelValues11, setLabelValues11] = useState(0);
  // const [labelValues12, setLabelValues12] = useState(0);
  // const [showconfirm, setShowconfirm] = useState(false);
  const [isShowconfirm, setIsShowconfirm] = useState(false);
  const [resource, setResource] = useState(null);
  const [getLastUpdated, setgetLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // chart
  const [chartOptions, setChartOptions] = useState(null);
  const [symptomData, getSymptomData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // chart end

  // const [getActiveLifestyleGoal, setActiveLifestleGoal] = useState(
  //   EGoalTimePeriod.WEEKWISE
  // );
  // symptoms
  // const [breathlessness, setBreathlessness] = useState({
  //   breathnessda: { frequency: "" },
  //   breathnessea: { frequency: "" },
  //   dizziness: { frequency: "" },
  //   col_swet: { frequency: "" },
  //   p_tiredness: { frequency: "" },
  //   chest_pain: { frequency: "" },
  //   pressurechest: { frequency: "" },
  //   worry: { frequency: "" },
  //   weakness: { frequency: "" },
  //   infirmity: { frequency: "" },
  //   nsynacpe: { frequency: "" },
  //   syncope: { frequency: "" },
  //   tirednessafterwards: { frequency: "" },
  // });
  const [patientAndSymptomsDetails, setPatientAndSymptomsDetails] = useState({
    patientDetails: null,
    symptomsDetails: null,
  });

  // const handleFrequencyChange = (category, value) => {
  //   setBreathlessness((prevState) => ({
  //     ...prevState,
  //     [category]: { frequency: value },
  //   }));
  // };

  // const [qualityOfLife, setQualityOfLife] = useState({
  //   breathnessda: { quality_of_life: "" },
  //   breathnessea: { quality_of_life: "" },
  //   dizziness: { quality_of_life: "" },
  //   col_swet: { quality_of_life: "" },
  //   p_tiredness: { quality_of_life: "" },
  //   chest_pain: { quality_of_life: "" },
  //   pressurechest: { quality_of_life: "" },
  //   worry: { quality_of_life: "" },
  //   weakness: { quality_of_life: "" },
  //   infirmity: { quality_of_life: "" },
  //   nsynacpe: { quality_of_life: "" },
  //   syncope: { quality_of_life: "" },
  //   tirednessafterwards: { quality_of_life: "" },
  // });

  // const handleQualityOfLifeChange = (category, value) => {
  //   setQualityOfLife((prevState) => ({
  //     ...prevState,
  //     [category]: { quality_of_life: value },
  //   }));
  // };

  // health hub
  const [show1, setShow1] = useState(false);

  // heath details
  const [show2, setShow2] = useState(false);
  const [healthDetails, setHealthDetails] = useState();
  // const horizontalLabels = {
  //   0: "None",
  //   20: "Mild",
  //   45: "Moderate",
  //   70: "Severe",
  //   90: "Extreme",
  // };
  // const handleValueChange = (value, setValue) => {
  //   setValue(value);
  // };
  // const handleValueChangeEnd = (value, setValue) => {
  //   if (value <= 30 && value > 10) {
  //     setValue(20);
  //   } else if (value <= 55 && value > 35) {
  //     setValue(45);
  //   } else if (value <= 80 && value > 55) {
  //     setValue(70);
  //   } else if (value <= 100 && value > 80) {
  //     setValue(90);
  //   } else {
  //     setValue(0);
  //   }
  // };

  // // For the first slider
  // const handleValueChangeSlider = (value) => {
  //   handleValueChange(value, setLabelValues);
  // };

  // const handleValueChangeEndSlider = (value) => {
  //   handleValueChangeEnd(value, setLabelValues);
  // };

  // // For the second slider
  // const handleValueChangeSlider1 = (value) => {
  //   handleValueChange(value, setLabelValues1);
  // };

  // const handleValueChangeEndSlider1 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues1);
  // };
  // // For the third slider
  // const handleValueChangeSlider2 = (value) => {
  //   handleValueChange(value, setLabelValues2);
  // };

  // const handleValueChangeEndSlider2 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues2);
  // };
  // // For the 4 slider
  // const handleValueChangeSlider3 = (value) => {
  //   handleValueChange(value, setLabelValues3);
  // };

  // const handleValueChangeEndSlider3 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues3);
  // };
  // // For the 5 slider
  // const handleValueChangeSlider4 = (value) => {
  //   handleValueChange(value, setLabelValues4);
  // };

  // const handleValueChangeEndSlider4 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues4);
  // };
  // // For the 6 slider
  // const handleValueChangeSlider5 = (value) => {
  //   handleValueChange(value, setLabelValues5);
  // };

  // const handleValueChangeEndSlider5 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues5);
  // };
  // // For the 7 slider
  // const handleValueChangeSlider6 = (value) => {
  //   handleValueChange(value, setLabelValues6);
  // };

  // const handleValueChangeEndSlider6 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues6);
  // };
  // // For the 8 slider
  // const handleValueChangeSlider7 = (value) => {
  //   handleValueChange(value, setLabelValues7);
  // };

  // const handleValueChangeEndSlider7 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues7);
  // };
  // // For the 9 slider
  // const handleValueChangeSlider8 = (value) => {
  //   handleValueChange(value, setLabelValues8);
  // };

  // const handleValueChangeEndSlider8 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues8);
  // };
  // // For the 10 slider
  // const handleValueChangeSlider9 = (value) => {
  //   handleValueChange(value, setLabelValues9);
  // };

  // const handleValueChangeEndSlider9 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues9);
  // };
  // // For the 11 slider
  // const handleValueChangeSlider10 = (value) => {
  //   handleValueChange(value, setLabelValues10);
  // };

  // const handleValueChangeEndSlider10 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues10);
  // };
  // // For the 11 slider
  // const handleValueChangeSlider11 = (value) => {
  //   handleValueChange(value, setLabelValues11);
  // };

  // const handleValueChangeEndSlider11 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues11);
  // };
  // // For the 11 slider
  // const handleValueChangeSlider12 = (value) => {
  //   handleValueChange(value, setLabelValues12);
  // };

  // const handleValueChangeEndSlider12 = (value) => {
  //   handleValueChangeEnd(value, setLabelValues12);
  // };

  // const getOutputNumber = (value) => {
  //   return horizontalLabels[value];
  // };

  // const lifeMappings = {
  //   Yes: "true",
  //   No: "false",
  // };

  // const getLifeValue = (value) => {
  //   return lifeMappings[value.quality_of_life] !== undefined
  //     ? lifeMappings[value.quality_of_life]
  //     : ""; // If value.quality_of_life is not found in lifeMappings, return an empty string
  // };

  // const handleSubmit = (data) => {
  //   setIsShowconfirm(data);
  //   if (data) {
  //     const output = `${getOutputNumber(labelValues)}
  //     ${getOutputNumber(labelValues1)}
  //     ${getOutputNumber(labelValues2)}
  //     ${getOutputNumber(labelValues3)}
  //     ${getOutputNumber(labelValues4)}
  //     ${getOutputNumber(labelValues5)}
  //     ${getOutputNumber(labelValues6)}
  //     ${getOutputNumber(labelValues7)}
  //     ${getOutputNumber(labelValues8)}
  //     ${getOutputNumber(labelValues9)}
  //     ${getOutputNumber(labelValues10)}
  //     ${getOutputNumber(labelValues11)}
  //     ${getOutputNumber(labelValues12)}`;

  //     let newData = {
  //       breathnessda: {
  //         frequency: breathlessness.breathnessda.frequency,
  //         severity: getOutputNumber(labelValues),
  //         quality_of_life: getLifeValue(qualityOfLife.breathnessda),
  //       },
  //       breathnessea: {
  //         frequency: breathlessness.breathnessea.frequency,
  //         severity: getOutputNumber(labelValues1),
  //         quality_of_life: getLifeValue(qualityOfLife.breathnessea),
  //       },
  //       dizziness: {
  //         frequency: breathlessness.dizziness.frequency,
  //         severity: getOutputNumber(labelValues2),
  //         quality_of_life: getLifeValue(qualityOfLife.dizziness),
  //       },
  //       col_swet: {
  //         frequency: breathlessness.col_swet.frequency,
  //         severity: getOutputNumber(labelValues3),
  //         quality_of_life: getLifeValue(qualityOfLife.col_swet),
  //       },
  //       p_tiredness: {
  //         frequency: breathlessness.p_tiredness.frequency,
  //         severity: getOutputNumber(labelValues4),
  //         quality_of_life: getLifeValue(qualityOfLife.p_tiredness),
  //       },
  //       chest_pain: {
  //         frequency: breathlessness.chest_pain.frequency,
  //         severity: getOutputNumber(labelValues5),
  //         quality_of_life: getLifeValue(qualityOfLife.chest_pain),
  //       },
  //       pressurechest: {
  //         frequency: breathlessness.pressurechest.frequency,
  //         severity: getOutputNumber(labelValues6),
  //         quality_of_life: getLifeValue(qualityOfLife.pressurechest),
  //       },
  //       worry: {
  //         frequency: breathlessness.worry.frequency,
  //         severity: getOutputNumber(labelValues7),
  //         quality_of_life: getLifeValue(qualityOfLife.worry),
  //       },
  //       weakness: {
  //         frequency: breathlessness.weakness.frequency,
  //         severity: getOutputNumber(labelValues8),
  //         quality_of_life: getLifeValue(qualityOfLife.weakness),
  //       },
  //       infirmity: {
  //         frequency: breathlessness.infirmity.frequency,
  //         severity: getOutputNumber(labelValues9),
  //         quality_of_life: getLifeValue(qualityOfLife.infirmity),
  //       },
  //       nsynacpe: {
  //         frequency: breathlessness.nsynacpe.frequency,
  //         severity: getOutputNumber(labelValues10),
  //         quality_of_life: getLifeValue(qualityOfLife.nsynacpe),
  //       },
  //       syncope: {
  //         frequency: breathlessness.syncope.frequency,
  //         severity: getOutputNumber(labelValues11),
  //         quality_of_life: getLifeValue(qualityOfLife.syncope),
  //       },
  //       tirednessafterwards: {
  //         frequency: breathlessness.tirednessafterwards.frequency,
  //         severity: getOutputNumber(labelValues12),
  //         quality_of_life: getLifeValue(qualityOfLife.tirednessafterwards),
  //       },
  //     };
  //     setIsShowconfirm(!data);
  //     AxiosInstance("application/json")
  //       .post(`/add_symptoms`, newData)
  //       .then((res) => {
  //         if (res && res.data && res.status === 200) {
  //           if (res.data?.statuscode === 200) {
  //             toast(res.data?.message, {
  //               position: "top-right",
  //               type: "success",
  //             });
  //             changeStatus();
  //             setTab("4");
  //             getPatientDetails();
  //           } else {
  //             toast(res.data?.message, {
  //               position: "top-right",
  //               type: "error",
  //             });
  //           }
  //         }
  //       })
  //       .catch((er) => {
  //         toast(er?.response?.data?.message, {
  //           position: "top-right",
  //           type: "error",
  //         });
  //       });
  //   }
  // };
  // const shownextStep = () => {
  //   setShowconfirm(!showconfirm);
  //   if (showconfirm) {
  //     setTab("3");
  //   }
  // };
  const fetchData = async (data) => {
    let graphData = {
      start_date: data?.start_date,
      end_date: data?.end_date,
    };
    AxiosInstance("application/json")
      .post(`/health_details_graph`, graphData)
      .then((res) => {
        if (res && res.data && res.status === 200) {
          if (res.data?.statuscode === 200) {
            const data = res?.data?.data || [];
            getSymptomData(data);
          } else {
            toast(res.data?.message, {
              position: "top-right",
              type: "error",
            });
          }
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };
  useEffect(() => {
    getPatientDetails();
  }, []);
  useEffect(() => {
    if (tab === "2") {
      fetchData();
    }
  }, [tab]);
  // Format dates in YYYY-MM-DD format

  useEffect(() => {
    if (!symptomData || !symptomData.length) {
      // Data not yet available or empty
      return;
    }
    // Extract unique dates from data
    const uniqueDates = Array.from(
      new Set(symptomData?.length > 0 && symptomData.map((item) => item.tdate))
    );

    // Sort unique dates in ascending order
    // uniqueDates.sort();

    // Format dates in YYYY-MM-DD format
    const formattedDates = uniqueDates.map((date) =>
      Highcharts.dateFormat("%Y-%m-%d", new Date(date))
    );

    const prepareSeries = (data) => {
      const systolicSeries = {
        name: "Systolic",
        data: [],
      };

      const diastolicSeries = {
        name: "Diastolic",
        data: [],
      };

      data.forEach((item) => {
        if (item.tdate !== null) {
          systolicSeries.data.push({
            x: formattedDates.indexOf(item.tdate),
            y: item.systolic_p,
            customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b><br/>`,
          });
          diastolicSeries.data.push({
            x: formattedDates.indexOf(item.tdate),
            y: item.diastolic_p,
            customTooltip: `Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b><br/>`,
          });
        }
      });

      return [systolicSeries, diastolicSeries];
    };
    const series = prepareSeries(symptomData);

    const options = {
      chart: {
        type: "line",
        style: {
          fontFamily: "Poppins",
        },
      },
      title: {
        text: "Blood Pressure Records",
        style: {
          fontSize: "16px",
          fontWeight: "500",
        },
      },
      xAxis: {
        categories: formattedDates,
        title: {
          text: "Date",
        },
      },
      yAxis: {
        title: {
          text: "Blood Pressure (BPM)",
        },
      },
      credits: {
        enabled: false, // Hides the Highcharts watermark
      },
      tooltip: {
        formatter: function () {
          const index = this.series.xAxis.categories.indexOf(this.x);
          const date = formattedDates[index];
          return `<b>${date}</b><br/>${this.point.customTooltip}`;
        },
      },
      series: series,
      plotOptions: {
        series: {
          lineWidth: 1,
          marker: {
            enabled: true,
          },
        },
      },
    };

    setChartOptions(options);
  }, [symptomData]);

  const sorteddata = [
    [Date.UTC(2024, 2, 21), 81],
    [Date.UTC(2024, 2, 22), 95],
    [Date.UTC(2024, 2, 23), 91],
    [Date.UTC(2024, 2, 24), 98],
    [Date.UTC(2024, 2, 25), 83],
    [Date.UTC(2024, 2, 26), 95],
    [Date.UTC(2024, 2, 27), 80],
    [Date.UTC(2024, 2, 28), 90],
    [Date.UTC(2024, 2, 29), 100],
  ];

  useEffect(() => {
    setResource(createResource(getTabListStatus()));
    getLastUpdatedHealthDetails();
  }, [tab]);

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById("expertmonitoringgraph")) {
        Highcharts.chart("expertmonitoringgraph", {
          chart: {
            type: "area",
            style: {
              fontFamily: "Poppins",
            },
            panning: true,
          },
          title: {
            text: "",
          },
          xAxis: {
            type: "datetime",
            min: Math.min.apply(
              null,
              sorteddata.slice(-7).map(function (point) {
                return point[0];
              })
            ),
            max: Math.max.apply(
              null,
              sorteddata.slice(-7).map(function (point) {
                return point[0];
              })
            ),
            labels: {
              distance: 5,
              padding: 5,
              overflow: "justify",
              style: {
                fontSize: "11px",
              },
              formatter: function () {
                return Highcharts.dateFormat("%d-%m-%Y", new Date(this.value));
              },
              rotation: -45,
            },
            title: {
              text: null,
            },
            scrollbar: {
              enabled: true,
            },
            tickLength: 0,
            gridLineWidth: 0,
            lineWidth: 0,
            showLastLabel: true,
            showEmpty: false,
          },
          yAxis: {
            min: 0,
            title: {
              text: "Pulse",
            },
            labels: {
              distance: 5,
              padding: 5,
              style: {
                fontSize: "11px",
              },
            },
            endOnTick: false,
            gridLineWidth: 1,
            showEmpty: false,
          },
          tooltip: {
            valueSuffix: " bpm",
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
              },
            ],
          },
          plotOptions: {
            area: {
              marker: {
                enabled: false,
                symbol: "circle",
                radius: 2,
                states: {
                  hover: {
                    enabled: true,
                  },
                },
              },
              color: "#0079ca",
            },
            series: {
              groupPadding: 1,
              pointPadding: 1,
              pointPlacement: "on",
              borderWidth: 0,
              pointWidth: 50,
            },
          },
          navigator: {
            enabled: true,
          },
          credits: {
            enabled: false,
          },
          legend: { enabled: false },
          series: [
            {
              name: "Pulse",
              data: sorteddata,
            },
          ],
        });
      }
    }, 4000);
  }, [tab, getLastUpdated]);

  const handleHeathDetails = async (data) => {
    setShow2(data);
    if (data) {
      let finalData = {
        ...healthDetails,
        tdate: moment(healthDetails?.tdate).format("YYYY-MM-DD"),
        bloodp: `${healthDetails?.systolic}/${healthDetails?.diastolic}`,
      };
      delete finalData?.isCheckMedicalRecords;
      delete finalData?.systolic;
      delete finalData?.diastolic;
      setShow2(!data);
      await AxiosInstance("application/json")
        .post("/health_details", finalData)
        .then((res) => {
          if (res && res.data && res.status == 200) {
            if (res.data?.statuscode === 200) {
              toast(res.data?.message, {
                position: "top-right",
                type: "success",
              });
              changeStatus();
              setTab("3");
            } else {
              toast(res.data?.message, {
                position: "top-right",
                type: "error",
              });
            }
          }
        })
        .catch((er) => {
          toast(er?.response?.data?.message || er?.message, {
            position: "top-right",
            type: "error",
          });
        });
    }
  };

  const getTabListStatus = async () => {
    setIsLoading(true);
    await AxiosInstance("application/json")
      .get("/getstatus")
      .then((response) => {
        if (response && response?.status == 200) {
          setGetStatus(response.data?.data);
          setIsLoading(false);
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  const getLastUpdatedHealthDetails = async () => {
    await AxiosInstance("application/json")
      .get("/healthdetails_lastupdate")
      .then((response) => {
        if (response && response?.status == 200) {
          setgetLastUpdated(response.data?.data);
        }
      })
      .catch((er) => {
        console.log(er);
        console.log("er?.message: ", er?.message);
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  const changeStatus = async () => {
    const tabKeys = {
      1: "health_hub",
      2: "expert_monitoring",
      3: "list_your_symptoms",
      4: "lifestyle_goals",
      5: "optimal_risk_management",
    };
    let key = tabKeys[tab] || "";
    let payload = {
      [key]: 1,
    };
    await AxiosInstance("application/json")
      .post("/setstatus", payload)
      .then((res) => {
        if (res && res.data && res.status == 200) {
          if (res.data?.statuscode === 200) {
            // toast(res.data?.message, {
            //   position: "top-right",
            //   type: "success",
            // });
            getTabListStatus();
          } else {
            // toast(res.data?.message, {
            //   position: "top-right",
            //   type: "error",
            // });
          }
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  const handlehealthHub = (data) => {
    setShow1(data);
    if (data) {
      setShow1(!data);
      setTimeout(() => {
        changeStatus();
        setTab("2");
      }, 1000);
    }
  };

  const getPatientDetails = async () => {
    await AxiosInstance("application/json")
      .get("/userdetails")
      .then((response) => {
        if (response && response?.status == 200) {
          setPatientAndSymptomsDetails({ patientDetails: response.data?.data });
          setIsLoading(false);
        }
      })
      .catch((er) => {
        toast(er?.response?.data?.message || er?.message, {
          position: "top-right",
          type: "error",
        });
      });
  };

  useEffect(() => {
    setTab(location?.state?.activeTab ? location?.state?.activeTab : "1");
  }, [location]);

  return (
    <>
      <ConfirmationAction
        // newFun={
        //   isShowconfirm
        //     ? handleSubmit
        //     : show1
        //       ? handlehealthHub
        //       : show2 && handleHeathDetails
        // }
        open={isShowconfirm || show1 || show2}
      />
      {isLoading && <Loading />}
      <div className="wflexLayout">
        <div className="wflexScroll al-pad">
          <h3 className="bc_main_text mb-1 text-capitalize">
            Hello, {patientAndSymptomsDetails?.patientDetails?.username}!
          </h3>
          <Row className="al_hometabs">
            <Col sm="12">
              <Nav tabs className="mb-3">
                <NavItem>
                  <NavLink
                    className={tab === "1" ? "active" : ""}
                    onClick={() => {
                      setTab("1");
                    }}
                  >
                    <div>
                      <span
                        className={
                          getTabStatus?.health_hub === 1 ? "active" : ""
                        }
                      >
                        H
                      </span>
                      <span className="d-none d-sm-block">Health Hub</span>
                      {/* <i className="icon_alfred_back-arrow"></i> */}
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "2" ? "active" : ""}
                    onClick={() => {
                      setTab("2");
                    }}
                  >
                    <div>
                      <span
                        className={
                          getTabStatus?.expert_monitoring === 1 ? "active" : ""
                        }
                      >
                        E
                      </span>
                      <span className="d-none d-sm-block">
                        Expert Monitoring
                      </span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "3" ? "active" : ""}
                    onClick={() => {
                      setTab("3");
                    }}
                  >
                    <div>
                      <span
                        className={
                          getTabStatus?.list_your_symptoms === 1 ? "active" : ""
                        }
                      >
                        L
                      </span>
                      <span className="d-none d-sm-block">
                        List your Symptoms
                      </span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "4" ? "active" : ""}
                    onClick={() => {
                      setTab("4");
                      getPatientDetails();
                    }}
                  >
                    <div>
                      <span
                        className={
                          getTabStatus?.lifestyle_goals === 1 ? "active" : ""
                        }
                      >
                        L
                      </span>
                      <span className="d-none d-sm-block">Lifestyle Goals</span>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={tab === "5" ? "active" : ""}
                    onClick={() => {
                      setTab("5");
                    }}
                  >
                    <div>
                      <span
                        className={
                          getTabStatus?.optimal_risk_managemment === 1
                            ? "active"
                            : ""
                        }
                      >
                        O
                      </span>
                      <span className="d-none d-sm-block">
                        Optimal Risk Management
                      </span>
                    </div>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={tab}>
                <TabPane tabId="1">
                  <HealthHub />
                </TabPane>
                <TabPane tabId="2">
                  <div className="d-flex justify-content-between mb-2">
                    <h5 className="mb-0">Health details </h5>
                    {getLastUpdated?.difference >= 0 ? (
                      <div className="d-flex align-items-center justify-content-end gap-1 al_note_content">
                        <img src={bulp} alt="" width={20} />
                        You, Last gave your symptoms{" "}
                        <span style={{ color: "#3bc0c3" }}>
                          {" "}
                          {getLastUpdated?.difference}
                        </span>{" "}
                        days ago on
                        <span style={{ color: "#3bc0c3" }}>
                          {getLastUpdated?.date}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <Row className="flex-row-xs-reverse">
                    <Col lg="6" sm="12">
                      <Formik
                        initialValues={{
                          tdate: new Date(),
                          weight: "",
                          // height: "",
                          systolic: "",
                          diastolic: "",
                          pulse: "",
                          isCheckMedicalRecords: false,
                        }}
                        validationSchema={Yup.object().shape({
                          weight: Yup.number()
                            .min(22, "Weight must be at least 22 lbs")
                            .max(1400, "Weight is too high!")
                            .required("Weight is required"),
                          // height: Yup.number()
                          //   .typeError("Must be a number")
                          //   .required("This field is required"),
                          systolic: Yup.number()
                            .max(370, "Systolic is too high!")
                            .required("Systolic is required"),
                          diastolic: Yup.number().when('systolic', {
                            is: (systolic) => systolic <= 370,
                            then: Yup.number().max(360, "Diastolic is Too high!").required("Diastolic is required"),
                            otherWise: Yup.number().optional()
                          }),
                          // diastolic: Yup.number()
                          //   .max(120, "Diastolic is Too high!")
                          //   .required("This field is required"),
                          pulse: Yup.number()
                            .max(200, "BPM is Too high!")
                            .required("BPM is required"),
                          tdate: Yup.date().nullable().required("This field is required"),
                          isCheckMedicalRecords: Yup.boolean()
                            .oneOf([true], "This field is required")
                            .required("This field is required"),
                        })}
                        onSubmit={(values) => {
                          setShow2(true);
                          setHealthDetails(values);
                        }}
                      >
                        {({ setFieldValue, values, setFieldTouched, errors }) => {
                          return (
                            <Form>
                              {/* <Row>
                                <Col sm="4">
                                  <FormGroup>
                                    <Label>Height(ft)</Label>
                                    <Field
                                      type="text"
                                      name="height"
                                      placeholder="Enter Height"
                                      className="form-control"
                                    />
                                    <ErrorMessage
                                      name="height"
                                      component={"div"}
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                              </Row> */}

                              <Row>
                                <Col sm="6" className="mb-3">
                                  <Label>Date</Label>
                                  <DatePicker
                                    className="form-control al_calendarIcon"
                                    name="tdate"
                                    placeholderText="e.g.MM/DD/YYYY"
                                    popperPlacement="auto"
                                    popperModifiers={[
                                      {
                                        flip: {
                                          behavior: ["bottom"],
                                        },
                                        preventOverflow: {
                                          enabled: false,
                                        },
                                      },
                                    ]}
                                    selected={
                                      // values?.tdate ? values?.tdate : new Date()
                                      values?.tdate
                                    }
                                    onChange={(e) => {
                                      setFieldValue("tdate", e);
                                    }}
                                    minDate={new Date().setMonth(
                                      new Date().getMonth() - 3
                                    )}
                                    dateFormat={"MM/dd/yyyy"}
                                    maxDate={new Date()}
                                    onBlur={() =>
                                      setFieldTouched("tdate", true)
                                    }
                                    autoComplete="off"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                  />
                                  <ErrorMessage
                                    name="tdate"
                                    component={"div"}
                                    className="text-danger"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="4" lg="6" sm="4" className="mb-3">
                                  <div className="al_vitalunits h-100">
                                    <i
                                      className="icon_alfred_weight"
                                      style={{ color: "#9086f7" }}
                                    ></i>
                                    <FormGroup className="mb-0">
                                      <Label>Weight</Label>
                                      <Field
                                        type="text"
                                        name="weight"
                                        placeholder="e.g.100"
                                        className="form-control"
                                        onKeyPress={(e) =>
                                          allowsOnlyNumericOnly4Digit(e)
                                        }
                                      />
                                      <ErrorMessage
                                        name="weight"
                                        component={"div"}
                                        className="text-danger"
                                      />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(lbs)</div>
                                  </div>
                                </Col>
                                <Col xl="4" lg="6" sm="4" className="mb-3">
                                  <div className="al_vitalunits h-100">
                                    <i
                                      className="icon_alfred_bp"
                                      style={{ color: "#efbc06" }}
                                    ></i>
                                    <FormGroup className="mb-0">
                                      <Label>Blood Pressure</Label>
                                      <div className="d-flex gap-2">
                                        <div>
                                          <Field
                                            type="text"
                                            name="systolic"
                                            placeholder="e.g.120"
                                            className="form-control"
                                            onKeyPress={(e) =>
                                              allowsOnlyNumericOnly3Digit(e)
                                            }
                                          />
                                        </div>
                                        <div className="mt-2 text-muted">/</div>
                                        <div>
                                          <Field
                                            type="text"
                                            name="diastolic"
                                            placeholder="e.g.80"
                                            className="form-control"
                                            onKeyPress={(e) =>
                                              allowsOnlyNumericOnly3Digit(e)
                                            }
                                          />
                                        </div>
                                      </div>
                                      <ErrorMessage
                                        name="systolic"
                                        component={"div"}
                                        className="text-danger systolic"
                                      />
                                      <ErrorMessage
                                        name="diastolic"
                                        component={"div"}
                                        className="text-danger diastolic"
                                      />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(mmHg)</div>
                                  </div>
                                </Col>
                                <Col xl="4" lg="6" sm="4" className="mb-3">
                                  <div className="al_vitalunits h-100">
                                    <i
                                      className="icon_alfred_pulse"
                                      style={{ color: "#7ff1e4" }}
                                    ></i>
                                    <FormGroup className="mb-0">
                                      <Label>Pulse</Label>
                                      <Field
                                        type="text"
                                        name="pulse"
                                        placeholder="e.g.70"
                                        className="form-control"
                                        onKeyPress={(e) =>
                                          allowsOnlyNumericOnly3Digit(e)
                                        }
                                      />
                                      <ErrorMessage
                                        name="pulse"
                                        component={"div"}
                                        className="text-danger"
                                      />
                                    </FormGroup>
                                    <div className="text-grey mt-1">(BPM)</div>
                                  </div>
                                </Col>
                              </Row>

                              <FormGroup
                                check
                                inline
                                className="me-0 ps-0 w-100"
                              >
                                <Label
                                  check
                                  className="me-2 d-flex align-items-center"
                                >
                                  <Field
                                    type="checkbox"
                                    name="isCheckMedicalRecords"
                                  />
                                  <span>
                                    Above mentioned details are valid as per the
                                    medical records
                                  </span>
                                </Label>
                                <ErrorMessage
                                  name="isCheckMedicalRecords"
                                  component={"div"}
                                  className="text-danger"
                                />
                              </FormGroup>
                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="al_grey_borderbtn"
                                  onClick={() => {
                                    setTab("1");
                                  }}
                                >
                                  Back
                                </button>
                                <button
                                  type="submit"
                                  className="al_savebtn mx-3"
                                >
                                  Proceed
                                </button>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Col>
                    <Col lg="6" sm="12">
                      {/* 
                        * old graph
                      <div
                        id="expertmonitoringgraph"
                        style={{ height: "350px" }}
                      ></div> */}

                      <Formik
                        initialValues={{
                          start_date: null,
                          end_date: null,
                        }}
                        validationSchema={Yup.object().shape({
                          start_date: Yup.date()
                            .nullable()
                            .required("Start Date is required"),
                          end_date: Yup.date()
                            .nullable()
                            .min(
                              Yup.ref("start_date"),
                              "End Date should be greater than or equal to Start Date"
                            )
                            .max(
                              new Date(),
                              "End Date should not be in the future"
                            )
                            .required("End Date is required"),
                        })}
                        onSubmit={(values) => {
                          let data = {
                            start_date: moment(values.start_date).format(
                              "YYYY-MM-DD"
                            ),
                            end_date: moment(values.end_date).format(
                              "YYYY-MM-DD"
                            ),
                          };
                          fetchData(data);
                        }}
                      >
                        {({
                          values,
                          setFieldValue,
                          errors,
                          touched,
                          setFieldTouched,
                        }) => {
                          return (
                            <Form>
                              <Row className="flex-xs-column">
                                <Col>
                                  <FormGroup>
                                    <Label>
                                      <span className="requiredLabel">*</span>
                                      Start Date:
                                    </Label>
                                    <DatePicker
                                      className="form-control al_calendarIcon"
                                      name="start_date"
                                      placeholderText="Select start date"
                                      popperPlacement="auto"
                                      popperModifiers={[
                                        {
                                          flip: {
                                            behavior: ["bottom"],
                                          },
                                          preventOverflow: {
                                            enabled: false,
                                          },
                                        },
                                      ]}
                                      selected={
                                        values?.start_date
                                          ? new Date(values?.start_date)
                                          : null
                                      }
                                      onChange={(date) =>
                                        setFieldValue("start_date", date)
                                      }
                                      onBlur={() =>
                                        setFieldTouched("start_date", true)
                                      }
                                      dateFormat="yyyy/MM/dd"
                                      maxDate={new Date()}
                                      autoComplete="off"
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                    />
                                    <ErrorMessage
                                      name="start_date"
                                      component={"div"}
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                                <Col>
                                  <FormGroup>
                                    <Label>
                                      <span className="requiredLabel">*</span>
                                      End Date:
                                    </Label>
                                    <DatePicker
                                      className="form-control al_calendarIcon"
                                      name="end_date"
                                      placeholderText="Select end date"
                                      popperPlacement="auto"
                                      popperModifiers={[
                                        {
                                          flip: {
                                            behavior: ["bottom"],
                                          },
                                          preventOverflow: {
                                            enabled: false,
                                          },
                                        },
                                      ]}
                                      selected={
                                        values?.end_date
                                          ? new Date(values?.end_date)
                                          : null
                                      }
                                      onChange={(date) =>
                                        setFieldValue("end_date", date)
                                      }
                                      onBlur={() =>
                                        setFieldTouched("end_date", true)
                                      }
                                      dateFormat="yyyy/MM/dd"
                                      maxDate={new Date()}
                                      autoComplete="off"
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                    />
                                    <ErrorMessage
                                      name="end_date"
                                      component={"div"}
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                                <div className="mt-4 pt-2 w-auto">
                                  <button type="submit" className="al_savebtn">
                                    Submit
                                  </button>
                                </div>
                              </Row>
                            </Form>
                          );
                        }}
                      </Formik>

                      {Array.isArray(symptomData) && symptomData?.length > 0 ? (
                        <Card className="al_cardview h-auto mb-3">
                          <CardBody>
                            {chartOptions && (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={chartOptions}
                              />
                            )}
                          </CardBody>
                        </Card>
                      ) : (
                        <div>No date found!!</div>
                      )}
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="3">
                  <SymptomsListForm />
                </TabPane>

                <TabPane tabId="4">
                  <LifeStyleGoal />
                </TabPane>

                <TabPane tabId="5">
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
