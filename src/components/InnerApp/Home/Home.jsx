import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
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
  TabPane,
  Table,
} from "reactstrap";
import * as Yup from "yup";
import {
  allowsOnlyNumericOnly3Digit,
  allowsOnlyNumericOnly4Digit,
} from "../../../_mock/RegularExp";
import { AxiosInstance } from "../../../_mock/utilities";
import atrialfib from "../../../images/atrialfib.png";
import bulp from "../../../images/idea.png";
import rhythm from "../../../images/rhythm.png";
import riskmanagement from "../../../images/riskmanagement.png";
import riskmanagement2 from "../../../images/riskmanagement2.jpg";
import riskmanagement3 from "../../../images/riskmanagement3.jpg";
import whytreatment from "../../../images/whytreatment.png";
import Loading from "../../InnerApp/LoadingComponent";
import ConfirmationAction from "../MainLayout/ConfirmationAction";
import { createResource } from "../createResource";
import nodata from '../../../images/nodata.svg';
import nosearchdata from '../../../images/nosearchdata.svg';
// import { lifeStyleGoalSymptomsKeys } from '../../../_mock/helperIndex'
export const EGoalTimePeriod = {
  WEEKWISE: 0,
  DAYSWISE: 1,
  MONTHWISE: 2,
};

export default function Home() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [getTabStatus, setGetStatus] = useState({});
  const [tab, setTab] = useState(
    location?.state?.activeTab ? location?.state?.activeTab : "1"
  );
  const [labelValues, setLabelValues] = useState(0);
  const [labelValues1, setLabelValues1] = useState(0);
  const [labelValues2, setLabelValues2] = useState(0);
  const [labelValues3, setLabelValues3] = useState(0);
  const [labelValues4, setLabelValues4] = useState(0);
  const [labelValues5, setLabelValues5] = useState(0);
  const [labelValues6, setLabelValues6] = useState(0);
  const [labelValues7, setLabelValues7] = useState(0);
  const [labelValues8, setLabelValues8] = useState(0);
  const [labelValues9, setLabelValues9] = useState(0);
  const [labelValues10, setLabelValues10] = useState(0);
  const [labelValues11, setLabelValues11] = useState(0);
  const [labelValues12, setLabelValues12] = useState(0);
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

  const [getActiveLifestyleGoal, setActiveLifestleGoal] = useState(
    EGoalTimePeriod.WEEKWISE
  );
  // symptoms
  const [breathlessness, setBreathlessness] = useState({
    breathnessda: { frequency: "" },
    breathnessea: { frequency: "" },
    dizziness: { frequency: "" },
    col_swet: { frequency: "" },
    p_tiredness: { frequency: "" },
    chest_pain: { frequency: "" },
    pressurechest: { frequency: "" },
    worry: { frequency: "" },
    weakness: { frequency: "" },
    infirmity: { frequency: "" },
    nsynacpe: { frequency: "" },
    syncope: { frequency: "" },
    tirednessafterwards: { frequency: "" },
  });
  const [patientAndSymptomsDetails, setPatientAndSymptomsDetails] = useState({
    patientDetails: null,
    symptomsDetails: null,
  });

  const handleFrequencyChange = (category, value) => {
    setBreathlessness((prevState) => ({
      ...prevState,
      [category]: { frequency: value },
    }));
  };

  const [qualityOfLife, setQualityOfLife] = useState({
    breathnessda: { quality_of_life: "" },
    breathnessea: { quality_of_life: "" },
    dizziness: { quality_of_life: "" },
    col_swet: { quality_of_life: "" },
    p_tiredness: { quality_of_life: "" },
    chest_pain: { quality_of_life: "" },
    pressurechest: { quality_of_life: "" },
    worry: { quality_of_life: "" },
    weakness: { quality_of_life: "" },
    infirmity: { quality_of_life: "" },
    nsynacpe: { quality_of_life: "" },
    syncope: { quality_of_life: "" },
    tirednessafterwards: { quality_of_life: "" },
  });

  const handleQualityOfLifeChange = (category, value) => {
    setQualityOfLife((prevState) => ({
      ...prevState,
      [category]: { quality_of_life: value },
    }));
  };

  // health hub
  const [show1, setShow1] = useState(false);

  // heath details
  const [show2, setShow2] = useState(false);
  const [healthDetails, setHealthDetails] = useState();
  const horizontalLabels = {
    0: "None",
    20: "Mild",
    45: "Moderate",
    70: "Severe",
    90: "Extreme",
  };
  const handleValueChange = (value, setValue) => {
    setValue(value);
  };
  const handleValueChangeEnd = (value, setValue) => {
    if (value <= 30 && value > 10) {
      setValue(20);
    } else if (value <= 55 && value > 35) {
      setValue(45);
    } else if (value <= 80 && value > 55) {
      setValue(70);
    } else if (value <= 100 && value > 80) {
      setValue(90);
    } else {
      setValue(0);
    }
  };

  // For the first slider
  const handleValueChangeSlider = (value) => {
    handleValueChange(value, setLabelValues);
  };

  const handleValueChangeEndSlider = (value) => {
    handleValueChangeEnd(value, setLabelValues);
  };

  // For the second slider
  const handleValueChangeSlider1 = (value) => {
    handleValueChange(value, setLabelValues1);
  };

  const handleValueChangeEndSlider1 = (value) => {
    handleValueChangeEnd(value, setLabelValues1);
  };
  // For the third slider
  const handleValueChangeSlider2 = (value) => {
    handleValueChange(value, setLabelValues2);
  };

  const handleValueChangeEndSlider2 = (value) => {
    handleValueChangeEnd(value, setLabelValues2);
  };
  // For the 4 slider
  const handleValueChangeSlider3 = (value) => {
    handleValueChange(value, setLabelValues3);
  };

  const handleValueChangeEndSlider3 = (value) => {
    handleValueChangeEnd(value, setLabelValues3);
  };
  // For the 5 slider
  const handleValueChangeSlider4 = (value) => {
    handleValueChange(value, setLabelValues4);
  };

  const handleValueChangeEndSlider4 = (value) => {
    handleValueChangeEnd(value, setLabelValues4);
  };
  // For the 6 slider
  const handleValueChangeSlider5 = (value) => {
    handleValueChange(value, setLabelValues5);
  };

  const handleValueChangeEndSlider5 = (value) => {
    handleValueChangeEnd(value, setLabelValues5);
  };
  // For the 7 slider
  const handleValueChangeSlider6 = (value) => {
    handleValueChange(value, setLabelValues6);
  };

  const handleValueChangeEndSlider6 = (value) => {
    handleValueChangeEnd(value, setLabelValues6);
  };
  // For the 8 slider
  const handleValueChangeSlider7 = (value) => {
    handleValueChange(value, setLabelValues7);
  };

  const handleValueChangeEndSlider7 = (value) => {
    handleValueChangeEnd(value, setLabelValues7);
  };
  // For the 9 slider
  const handleValueChangeSlider8 = (value) => {
    handleValueChange(value, setLabelValues8);
  };

  const handleValueChangeEndSlider8 = (value) => {
    handleValueChangeEnd(value, setLabelValues8);
  };
  // For the 10 slider
  const handleValueChangeSlider9 = (value) => {
    handleValueChange(value, setLabelValues9);
  };

  const handleValueChangeEndSlider9 = (value) => {
    handleValueChangeEnd(value, setLabelValues9);
  };
  // For the 11 slider
  const handleValueChangeSlider10 = (value) => {
    handleValueChange(value, setLabelValues10);
  };

  const handleValueChangeEndSlider10 = (value) => {
    handleValueChangeEnd(value, setLabelValues10);
  };
  // For the 11 slider
  const handleValueChangeSlider11 = (value) => {
    handleValueChange(value, setLabelValues11);
  };

  const handleValueChangeEndSlider11 = (value) => {
    handleValueChangeEnd(value, setLabelValues11);
  };
  // For the 11 slider
  const handleValueChangeSlider12 = (value) => {
    handleValueChange(value, setLabelValues12);
  };

  const handleValueChangeEndSlider12 = (value) => {
    handleValueChangeEnd(value, setLabelValues12);
  };

  const getOutputNumber = (value) => {
    return horizontalLabels[value];
  };

  const lifeMappings = {
    Yes: "true",
    No: "false",
  };

  const getLifeValue = (value) => {
    return lifeMappings[value.quality_of_life] !== undefined
      ? lifeMappings[value.quality_of_life]
      : ""; // If value.quality_of_life is not found in lifeMappings, return an empty string
  };

  const handleSubmit = (data) => {
    setIsShowconfirm(data);
    if (data) {
      const output = `${getOutputNumber(labelValues)}
      ${getOutputNumber(labelValues1)}
      ${getOutputNumber(labelValues2)}
      ${getOutputNumber(labelValues3)}
      ${getOutputNumber(labelValues4)}
      ${getOutputNumber(labelValues5)}
      ${getOutputNumber(labelValues6)}
      ${getOutputNumber(labelValues7)}
      ${getOutputNumber(labelValues8)}
      ${getOutputNumber(labelValues9)}
      ${getOutputNumber(labelValues10)}
      ${getOutputNumber(labelValues11)}
      ${getOutputNumber(labelValues12)}`;

      let newData = {
        breathnessda: {
          frequency: breathlessness.breathnessda.frequency,
          severity: getOutputNumber(labelValues),
          quality_of_life: getLifeValue(qualityOfLife.breathnessda),
        },
        breathnessea: {
          frequency: breathlessness.breathnessea.frequency,
          severity: getOutputNumber(labelValues1),
          quality_of_life: getLifeValue(qualityOfLife.breathnessea),
        },
        dizziness: {
          frequency: breathlessness.dizziness.frequency,
          severity: getOutputNumber(labelValues2),
          quality_of_life: getLifeValue(qualityOfLife.dizziness),
        },
        col_swet: {
          frequency: breathlessness.col_swet.frequency,
          severity: getOutputNumber(labelValues3),
          quality_of_life: getLifeValue(qualityOfLife.col_swet),
        },
        p_tiredness: {
          frequency: breathlessness.p_tiredness.frequency,
          severity: getOutputNumber(labelValues4),
          quality_of_life: getLifeValue(qualityOfLife.p_tiredness),
        },
        chest_pain: {
          frequency: breathlessness.chest_pain.frequency,
          severity: getOutputNumber(labelValues5),
          quality_of_life: getLifeValue(qualityOfLife.chest_pain),
        },
        pressurechest: {
          frequency: breathlessness.pressurechest.frequency,
          severity: getOutputNumber(labelValues6),
          quality_of_life: getLifeValue(qualityOfLife.pressurechest),
        },
        worry: {
          frequency: breathlessness.worry.frequency,
          severity: getOutputNumber(labelValues7),
          quality_of_life: getLifeValue(qualityOfLife.worry),
        },
        weakness: {
          frequency: breathlessness.weakness.frequency,
          severity: getOutputNumber(labelValues8),
          quality_of_life: getLifeValue(qualityOfLife.weakness),
        },
        infirmity: {
          frequency: breathlessness.infirmity.frequency,
          severity: getOutputNumber(labelValues9),
          quality_of_life: getLifeValue(qualityOfLife.infirmity),
        },
        nsynacpe: {
          frequency: breathlessness.nsynacpe.frequency,
          severity: getOutputNumber(labelValues10),
          quality_of_life: getLifeValue(qualityOfLife.nsynacpe),
        },
        syncope: {
          frequency: breathlessness.syncope.frequency,
          severity: getOutputNumber(labelValues11),
          quality_of_life: getLifeValue(qualityOfLife.syncope),
        },
        tirednessafterwards: {
          frequency: breathlessness.tirednessafterwards.frequency,
          severity: getOutputNumber(labelValues12),
          quality_of_life: getLifeValue(qualityOfLife.tirednessafterwards),
        },
      };
      setIsShowconfirm(!data);
      AxiosInstance("application/json")
        .post(`/add_symptoms`, newData)
        .then((res) => {
          if (res && res.data && res.status === 200) {
            if (res.data?.statuscode === 200) {
              toast(res.data?.message, {
                position: "top-right",
                type: "success",
              });
              changeStatus();
              setTab("4");
              getPatientDetails();
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
    }
  };
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
      let data = {
        start_date: "",
        end_date: "",
      };
      fetchData(data);
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
      const weightSeries = {
        name: "Weight",
        data: [],
      };

      const pulseSeries = {
        name: "Pulse",
        data: [],
      };

      data.forEach((item) => {
        if (item.tdate !== null) {
          systolicSeries.data.push({
            x: formattedDates.indexOf(item.tdate),
            y: item.systolic_p,
            customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/> Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
          });
          diastolicSeries.data.push({
            x: formattedDates.indexOf(item.tdate),
            y: item.diastolic_p,
            customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/>Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
          });
          weightSeries.data.push({
            x: formattedDates.indexOf(item.tdate),
            y: Number(item.weight),
            customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/> Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
          });
          pulseSeries.data.push({
            x: formattedDates.indexOf(item.tdate),
            y: Number(item.pulse),
            customTooltip: `Systolic: <b>${item.systolic_p}</b> mmHg <br/>Diastolic: <b>${item.diastolic_p}</b> mmHg <br/>Pulse: <b>${item.pulse}</b> BPM<br/>Weight: <b>${item.weight}</b>`,
          });
        }
      });

      return [systolicSeries, diastolicSeries, weightSeries, pulseSeries];
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
        text: "Health Details",
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
          text: "Health Details",
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
        newFun={
          isShowconfirm
            ? handleSubmit
            : show1
              ? handlehealthHub
              : show2 && handleHeathDetails
        }
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
                  <p>Knowing about AF will reduce the risk</p>
                  <Row>
                    <Col lg="7" sm="12">
                      <Row>
                        <Col sm="6">
                          <div className="mb-4">
                            <h6>Understand Atrial fibrillation(AF)</h6>
                            <img
                              src={atrialfib}
                              alt=""
                              style={{ height: "120px", objectFit: "contain" }}
                            />
                            <p className="mt-3">
                              Atrial fibrillation (AF) is a type of arrhythmia,
                              which means that the heart beats fast and
                              irregularly. The risk of AF increases markedly
                              with age. Some of the known causes of AF include
                              chronic high blood pressure, heart valve diseases
                              and hyperthyroidism.
                            </p>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-4">
                            <h6>Why treatment?</h6>
                            <img
                              src={whytreatment}
                              alt=""
                              style={{ height: "120px", objectFit: "contain" }}
                            />
                            <p className="mt-3">
                              The way the heart beats in atrial fibrillation
                              means there's a risk of blood clots forming in the
                              heart chambers. If these enter the bloodstream,
                              they can cause a stroke. Your doctor will assess
                              and discuss your risk with you, and try to
                              minimise your chance of having a stroke.
                            </p>
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-4">
                            <h6>Rhythm</h6>
                            <img
                              src={rhythm}
                              alt=""
                              style={{ height: "120px", objectFit: "contain" }}
                            />
                            <p className="mt-3">
                              Atrial fibrillation (Afib) is an irregular and
                              often very rapid heart rhythm. An irregular heart
                              rhythm is called an arrhythmia. Afib can lead to
                              blood clots in the heart. The condition also
                              increases the risk of stroke, heart failure and
                              other heart-related complications.
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg="5" sm="12">
                      <Card
                        className="al_cardnoborder"
                        style={{
                          backgroundColor: "#F7F7F7",
                          boxShadow: "none",
                        }}
                      >
                        <CardBody>
                          <h6>Videos</h6>
                          <Row className="mt-3 al_knowldgebank">
                            <Col sm="6" className="mb-3">
                              <Card className="al_cardnoborder h-100">
                                <CardBody>
                                  <iframe
                                    width="100%"
                                    height="130"
                                    src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="mt-2">
                                    Text of the printing and typesetting
                                    industry.Text of the printing and
                                    typesetting industry.
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col sm="6" className="mb-3">
                              <Card className="al_cardnoborder h-100">
                                <CardBody>
                                  <iframe
                                    width="100%"
                                    height="130"
                                    src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="mt-2">
                                    Text of the printing and typesetting
                                    industry.
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                            <Col sm="6" className="mb-3">
                              <Card className="al_cardnoborder h-100">
                                <CardBody>
                                  <iframe
                                    width="100%"
                                    height="130"
                                    src="https://www.youtube.com/embed/TcJg4Dc_w90?si=k2yXOI4qMxa8AohV"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="mt-2">
                                    Text of the printing and typesetting
                                    industry.
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="al_savebtn"
                      onClick={() => {
                        setShow1(true);
                      }}
                    >
                      Proceed
                    </button>
                  </div>
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
                          diastolic: Yup.number().when("systolic", {
                            is: (systolic) => systolic <= 370,
                            then: Yup.number()
                              .max(360, "Diastolic is Too high!")
                              .required("Diastolic is required"),
                            otherWise: Yup.number().optional(),
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
                                      // disabled={symptomData?.length ===0}
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
                                      // disabled={symptomData?.length ===0}
                                    />
                                    <ErrorMessage
                                      name="end_date"
                                      component={"div"}
                                      className="text-danger"
                                    />
                                  </FormGroup>
                                </Col>
                                <div className="mt-4 pt-2 w-auto">
                                  <button
                                    type="submit"
                                    className="al_savebtn"
                                    //  disabled={symptomData?.length ===0}
                                  >
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
                        <div className="d-flex flex-column align-items-center pt-5">
                          <img src={nodata} width={220} alt="" />
                          <h6 className="mt-3 mb-0">No data found!</h6>
                        </div>
                      )}
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <p>Select the symptoms range listed below</p>
                  <div className="al_symptoms">
                    <Row>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Breathlessness during activity</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.breathnessda.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="breathnessda"
                                      value={frequency}
                                      checked={
                                        breathlessness.breathnessda
                                          .frequency === frequency
                                      }
                                      onChange={(e) => {
                                        handleFrequencyChange(
                                          "breathnessda",
                                          e.target.value
                                        );
                                      }}
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues}
                                onChange={handleValueChangeSlider}
                                onChangeComplete={handleValueChangeEndSlider}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="breathnessda"
                                      value={life}
                                      checked={
                                        qualityOfLife.breathnessda
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "breathnessda",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Breathlessness even at rest</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.breathnessea.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="breathnessea"
                                      value={frequency}
                                      checked={
                                        breathlessness.breathnessea
                                          .frequency === frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "breathnessea",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues1}
                                onChange={handleValueChangeSlider1}
                                onChangeComplete={handleValueChangeEndSlider1}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="breathnessea"
                                      value={life}
                                      checked={
                                        qualityOfLife.breathnessea
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "breathnessea",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Dizziness</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.dizziness.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="dizziness"
                                      value={frequency}
                                      checked={
                                        breathlessness.dizziness.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "dizziness",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues2}
                                onChange={handleValueChangeSlider2}
                                onChangeComplete={handleValueChangeEndSlider2}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="dizziness"
                                      value={life}
                                      checked={
                                        qualityOfLife.dizziness
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "dizziness",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Cold sweat</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.col_swet.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="col_swet"
                                      value={frequency}
                                      checked={
                                        breathlessness.col_swet.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "col_swet",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues3}
                                onChange={handleValueChangeSlider3}
                                onChangeComplete={handleValueChangeEndSlider3}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="col_swet"
                                      value={life}
                                      checked={
                                        qualityOfLife.col_swet
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "col_swet",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Pronounced tiredness</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.p_tiredness.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="p_tiredness"
                                      value={frequency}
                                      checked={
                                        breathlessness.p_tiredness.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "p_tiredness",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues4}
                                onChange={handleValueChangeSlider4}
                                onChangeComplete={handleValueChangeEndSlider4}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="p_tiredness"
                                      value={life}
                                      checked={
                                        qualityOfLife.p_tiredness
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "p_tiredness",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Chest pain</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.chest_pain.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="chest_pain"
                                      value={frequency}
                                      checked={
                                        breathlessness.chest_pain.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "chest_pain",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues5}
                                onChange={handleValueChangeSlider5}
                                onChangeComplete={handleValueChangeEndSlider5}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="chest_pain"
                                      value={life}
                                      checked={
                                        qualityOfLife.chest_pain
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "chest_pain",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Pressure / discomfort in chest</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.pressurechest.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="pressurechest"
                                      value={frequency}
                                      checked={
                                        breathlessness.pressurechest
                                          .frequency === frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "pressurechest",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues6}
                                onChange={handleValueChangeSlider6}
                                onChangeComplete={handleValueChangeEndSlider6}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="pressurechest"
                                      value={life}
                                      checked={
                                        qualityOfLife.pressurechest
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "pressurechest",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Worry</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.worry.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="worry"
                                      value={frequency}
                                      checked={
                                        breathlessness.worry.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "worry",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues7}
                                onChange={handleValueChangeSlider7}
                                onChangeComplete={handleValueChangeEndSlider7}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="worry"
                                      value={life}
                                      checked={
                                        qualityOfLife.worry.quality_of_life ===
                                        life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "worry",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Weakness</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.weakness.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="weakness"
                                      value={frequency}
                                      checked={
                                        breathlessness.weakness.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "weakness",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues8}
                                onChange={handleValueChangeSlider8}
                                onChangeComplete={handleValueChangeEndSlider8}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="weakness"
                                      value={life}
                                      checked={
                                        qualityOfLife.weakness
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "weakness",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Infirmity</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.infirmity.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="infirmity"
                                      value={frequency}
                                      checked={
                                        breathlessness.infirmity.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "infirmity",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues9}
                                onChange={handleValueChangeSlider9}
                                onChangeComplete={handleValueChangeEndSlider9}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="infirmity"
                                      value={life}
                                      checked={
                                        qualityOfLife.infirmity
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "infirmity",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Near syncope</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.nsynacpe.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="nsynacpe"
                                      value={frequency}
                                      checked={
                                        breathlessness.nsynacpe.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "nsynacpe",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues10}
                                onChange={handleValueChangeSlider10}
                                onChangeComplete={handleValueChangeEndSlider10}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="nsynacpe"
                                      value={life}
                                      checked={
                                        qualityOfLife.nsynacpe
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "nsynacpe",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Syncope</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.syncope.frequency ===
                                      frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="syncope"
                                      value={frequency}
                                      checked={
                                        breathlessness.syncope.frequency ===
                                        frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "syncope",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues11}
                                onChange={handleValueChangeSlider11}
                                onChangeComplete={handleValueChangeEndSlider11}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="syncope"
                                      value={life}
                                      checked={
                                        qualityOfLife.syncope
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "syncope",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                      <Col lg="4" md="6" sm="12">
                        <div className="mb-4">
                          <h6>Tiredness afterwards</h6>
                          <Card className="mb-0 al_cardnoborder">
                            <CardBody>
                              <strong>Frequency</strong>
                              <div
                                className="btn-group btn-group-toggle al_frequencylist"
                                data-toggle="buttons"
                              >
                                {[
                                  "Never",
                                  "Occasionally",
                                  "Often",
                                  "Always",
                                ].map((frequency) => (
                                  <label
                                    key={frequency}
                                    className={`btn ${breathlessness.tirednessafterwards
                                      .frequency === frequency
                                      ? "active"
                                      : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="tirednessafterwards"
                                      value={frequency}
                                      checked={
                                        breathlessness.tirednessafterwards
                                          .frequency === frequency
                                      }
                                      onChange={(e) =>
                                        handleFrequencyChange(
                                          "tirednessafterwards",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    {frequency.charAt(0).toUpperCase() +
                                      frequency.slice(1)}
                                  </label>
                                ))}
                              </div>
                              <strong>Severity</strong>
                              <Slider
                                range
                                min={0}
                                max={100}
                                marks={horizontalLabels}
                                tooltip={false}
                                value={labelValues12}
                                onChange={handleValueChangeSlider12}
                                onChangeComplete={handleValueChangeEndSlider12}
                              />
                              <br />
                              <strong className="mb-2">
                                Effecting quality of life (limiting them to do
                                stuff)
                              </strong>

                              <FormGroup
                                check
                                inline
                                className="d-flex me-0 ps-0 flex-wrap"
                              >
                                {["Yes", "No"].map((life) => (
                                  <Label
                                    key={life}
                                    className="d-flex align-center me-3"
                                  >
                                    <input
                                      type="radio"
                                      name="tirednessafterwards"
                                      value={life}
                                      checked={
                                        qualityOfLife.tirednessafterwards
                                          .quality_of_life === life
                                      }
                                      onChange={(e) =>
                                        handleQualityOfLifeChange(
                                          "tirednessafterwards",
                                          e.target.value
                                        )
                                      }
                                    />{" "}
                                    &nbsp;
                                    {life.charAt(0).toUpperCase() +
                                      life.slice(1)}
                                  </Label>
                                ))}
                              </FormGroup>
                            </CardBody>
                          </Card>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="al_grey_borderbtn"
                      onClick={() => {
                        setTab("2");
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="al_savebtn mx-3"
                      onClick={() => setIsShowconfirm(true)}
                    >
                      Proceed
                    </button>
                  </div>
                </TabPane>
                {
                  <TabPane tabId="4">
                    <p>Select where you want to be coached in</p>
                    <div className="w-100">
                      <Row className="al_goalslist mb-4">
                        <Col lg="3">
                          <Label
                            check
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>Diet</span>
                            <input type="checkbox" name="diet" />
                          </Label>
                        </Col>
                        <Col lg="3">
                          <Label
                            check
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>Exercise</span>
                            <input type="checkbox" name="exercise" />
                          </Label>
                        </Col>
                        <Col lg="3">
                          <Label
                            check
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>Weight</span>
                            <input type="checkbox" name="weight" />
                          </Label>
                        </Col>
                        <Col lg="3">
                          <Label
                            check
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>Blood pressure</span>
                            <input type="checkbox" name="bloodpressure" />
                          </Label>
                        </Col>
                      </Row>
                      <hr />
                      <div className="mt-4">
                        <Row className="mb-3">
                          <Col lg="4" sm="6">
                            <p className="al_note">Your Details</p>
                            <h5 className="mb-2 text-capitalize">
                              Hello,{" "}
                              {patientAndSymptomsDetails?.patientDetails
                                ?.username || "N/A"}
                              !
                            </h5>
                            <div>
                              <strong>Age: </strong>
                              <span>
                                {patientAndSymptomsDetails?.patientDetails
                                  ?.age || "N/A"}
                              </span>
                            </div>
                            <div>
                              <strong>Gender: </strong>
                              <span>
                                {patientAndSymptomsDetails?.patientDetails
                                  ?.gender || "N/A"}
                              </span>
                            </div>
                            <div>
                              <strong>Residence type: </strong>
                              <span>
                                {patientAndSymptomsDetails?.patientDetails
                                  ?.rtype || "N/A"}
                              </span>
                            </div>
                            <div>
                              <strong>Education: </strong>
                              <span>
                                {patientAndSymptomsDetails?.patientDetails
                                  ?.education || "N/A"}
                              </span>
                            </div>
                          </Col>
                          <Col lg="3">
                            <Label
                              check
                              className="d-flex align-items-center justify-content-between"
                            >
                              <span>Exercise</span>
                              <input type="checkbox" name="exercise" />
                            </Label>
                          </Col>
                          <Col lg="3">
                            <Label
                              check
                              className="d-flex align-items-center justify-content-between"
                            >
                              <span>Weight</span>
                              <input type="checkbox" name="weight" />
                            </Label>
                          </Col>
                          <Col lg="3">
                            <Label
                              check
                              className="d-flex align-items-center justify-content-between"
                            >
                              <span>Blood pressure</span>
                              <input type="checkbox" name="bloodpressure" />
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <div className="mt-4">
                          <Row className="mb-3">
                            <Col lg="4" sm="6">
                              <p className="al_note">Your Details</p>
                              <h5 className="mb-2 text-capitalize">
                                Hello,{" "}
                                {patientAndSymptomsDetails?.patientDetails
                                  ?.username || "N/A"}
                                !
                              </h5>
                              <div>
                                <strong>Age: </strong>
                                <span>
                                  {patientAndSymptomsDetails?.patientDetails
                                    ?.age || "N/A"}
                                </span>
                              </div>
                              <div>
                                <strong>Gender: </strong>
                                <span>
                                  {patientAndSymptomsDetails?.patientDetails
                                    ?.gender || "N/A"}
                                </span>
                              </div>
                              <div>
                                <strong>Residence type: </strong>
                                <span>
                                  {patientAndSymptomsDetails?.patientDetails
                                    ?.rtype || "N/A"}
                                </span>
                              </div>
                              <div>
                                <strong>Education: </strong>
                                <span>
                                  {patientAndSymptomsDetails?.patientDetails
                                    ?.education || "N?A"}
                                </span>
                              </div>
                            </Col>
                            <Col lg="8" sm="6">
                              <h6 className="mt-3 mb-2">Your Medication</h6>
                              <Row>
                                <Col lg="6" sm="12">
                                  <Table borderless responsive>
                                    <thead>
                                      <tr>
                                        <th>Symptoms</th>
                                        <th className="w-25">Range</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {/* {patientAndSymptomsDetails.symptomsDetails && Object.keys(patientAndSymptomsDetails.symptomsDetails)?.map((key, index) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{lifeStyleGoalSymptomsKeys[key]}</td>
                                      <td className="text-warning">{patientAndSymptomsDetails?.symptomsDetails[key]?.severity}</td>
                                    </tr>
                                  </>
                                )
                              })} */}
                                      <tr>
                                        <td>Breathlessness even at rest</td>
                                        <td className="text-warning">
                                          Moderate
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Dizziness</td>
                                        <td className="text-success">Mild</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                          <hr />
                          <h6 className="mt-3">
                            Choose the time period to set your goal
                          </h6>

                          <Row className="mb-4">
                            <Col lg="3" sm="6">
                              <div
                                className={`al_lightbgbutton ${
                                  getActiveLifestyleGoal ===
                                  EGoalTimePeriod.WEEKWISE
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setActiveLifestleGoal(
                                    EGoalTimePeriod.WEEKWISE
                                  )
                                }
                              >
                                Create goal for <strong>1 week</strong>
                              </div>
                            </Col>
                            <Col lg="3" sm="6">
                              <div
                                className={`al_lightbgbutton ${
                                  getActiveLifestyleGoal ===
                                  EGoalTimePeriod.DAYSWISE
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setActiveLifestleGoal(
                                    EGoalTimePeriod.DAYSWISE
                                  )
                                }
                              >
                                Create goal for <strong>15 days</strong>
                              </div>
                            </Col>
                            <Col lg="3" sm="6">
                              <div
                                className={`al_lightbgbutton ${
                                  getActiveLifestyleGoal ===
                                  EGoalTimePeriod.MONTHWISE
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  setActiveLifestleGoal(
                                    EGoalTimePeriod.MONTHWISE
                                  )
                                }
                              >
                                Create goal for <strong>1 month</strong>
                              </div>
                            </Col>
                          </Row>
                          <p className="al_note mb-3">
                            Disclaimer: Goal will be created based on the list
                            of symptoms you have selected and the data you have
                            provided in this application{" "}
                          </p>

                          <button
                            type="button"
                            className="al_savebtn"
                            onClick={() => setTab("5")}
                          >
                            OK
                          </button>
                          {/* <LayoutAlertMessage /> */}
                        </div>
                      </div>
                    </div>
                  </TabPane>
                }
                <TabPane tabId="5">
                  <Row className="mt-4">
                    <Col xl="4" md="6" sm="12" className="mb-3">
                      <div className="flip-card card al_cardnoborder">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img src={riskmanagement} alt="" />
                            <div className="p-3">
                              <p>
                                Refer to your managing my AF and risk of stroke
                                guide if you get an episode of AF
                              </p>
                              <div className="text-info text-end fw-medium">
                                Know more
                                <i
                                  className="icon_alfred_right_arrow ms-1"
                                  style={{
                                    verticalAlign: "middle",
                                    fontSize: "10px",
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                          <ul className="standardPlans p-4 ps-5 flip-card-back">
                            <li>
                              Refer to your managing my AF and risk of stroke
                              guide if you get an episode of AF
                            </li>
                            <li>Learn about your AF medicines</li>
                            <li>Feel your pulse every morning and evening</li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col xl="4" md="6" sm="12" className="mb-3">
                      <div className="flip-card card al_cardnoborder">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img src={riskmanagement2} alt="" />
                            <div className="p-3">
                              <p>
                                Take your AF medications the way doctor tells
                                you, and do not run out of medication
                              </p>
                              <div className="text-info text-end fw-medium">
                                Know more
                                <i
                                  className="icon_alfred_right_arrow ms-1"
                                  style={{
                                    verticalAlign: "middle",
                                    fontSize: "10px",
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                          <ul className="standardPlans p-4 ps-5 flip-card-back">
                            <li>
                              Take your AF medications the way doctor tells you,
                              and do not run out of medication
                            </li>
                            <li>
                              Visit your doctors regularly and ask questions if
                              you have any concerns
                            </li>
                            <li>
                              Keep an up-to-date list of all medications which
                              you are using
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                    <Col xl="4" md="6" sm="12" className="mb-3">
                      <div className="flip-card card al_cardnoborder">
                        <div className="flip-card-inner">
                          <div className="flip-card-front">
                            <img src={riskmanagement3} alt="" />
                            <div className="p-3">
                              <p>
                                Know your stroke risk factors and keep a record
                                of your CHADS score in this booklet
                              </p>
                              <div className="text-info text-end fw-medium">
                                Know more
                                <i
                                  className="icon_alfred_right_arrow ms-1"
                                  style={{
                                    verticalAlign: "middle",
                                    fontSize: "10px",
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>
                          <ul className="standardPlans p-4 ps-5 flip-card-back">
                            <li>
                              Know your stroke risk factors and keep a record of
                              your CHADS score in this booklet
                            </li>
                            <li>
                              Reduce your risk of more frequent or severe AF and
                              risk of stroke by choosing a healthy lifestyle
                            </li>
                            <li>
                              If you take Warfarin, make sure that you have
                              regular blood tests and keep a record of your
                              results
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
