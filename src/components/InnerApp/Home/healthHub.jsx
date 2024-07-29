import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { Card, CardBody, Col, Row, UncontrolledTooltip, Carousel, CarouselControl, CarouselItem, CarouselIndicators } from "reactstrap";
import { getActionTypes } from "../../../_mock/helperIndex";
import { getActivetab } from "../../../_mock/internalJsControl";
import antiarrhythmicmed from "../../../images/antiarrhythmicmed.png";
import antiarrhythmicrisk from "../../../images/antiarrhythmicrisk.jpg";
import atrialfib from "../../../images/atrialfib.png";
import catheterrisk from "../../../images/catheterrisk.jpg";
import cathetertypes from "../../../images/cathetertypes.jpg";
import flecainiderisks from "../../../images/flecainiderisks.jpg";
import nervepalsy from "../../../images/nervepalsy.jpg";
import rhythm from "../../../images/rhythm.jpg";
import whytreatment from "../../../images/whytreatment.png";
import { setActiveTabRequest } from "../../../store/Home/slice";
import { setActionTypeAndActionData } from "../../../store/UtilityCallFunction/slice";

const weekoptions = [
    { value: "Week 1", label: "Week 1" },
    { value: "Week 2", label: "Week 2" },
    { value: "Week 3", label: "Week 3" },
    { value: "Week 4", label: "Week 4", disabled: true },
    { value: "Week 5", label: "Week 5", disabled: true }
];

const horizontalLabels = {
    0: "Knowledge",
    25: "Awareness",
    50: "Exposure",
    75: "Experience",
    95: "Expertise",
};

export const HealthHub = () => {
    const dispatch = useDispatch();
    const [week, setWeek] = useState({ value: "Week 3", label: "Week 3" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [items, setItems] = useState([]);

    const next = () => {
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        setActiveIndex(newIndex);
    };

    const handleSetTabs = () => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.HEALTHHUB, nextOrBackTab: getActivetab.EXPTMONITORING }))
    }

    const selectWeek = (e) => {
        setWeek(e);
    }

    const handleSelect = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: null }))
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                key={item.id}
                tag="div"
            >
                {item.type === "image" ?
                    <img
                        src={item.src}
                        alt={item.altText}
                        style={{ height: "130px", objectFit: "cover", width: "100%", marginBottom: "6px" }}
                    />
                    : <iframe
                        width="100%"
                        height="130"
                        src={item.src}
                        title={item.altText}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    ></iframe>
                }
            </CarouselItem>
        )
    }
    )

    useEffect(() => {
        setItems(week.value === "Week 1" ? [
            {
                id: 1,
                altText: 'Slide 1',
                type: 'video',
                src: 'https://www.youtube.com/embed/Opvz0mnwvYo?si=36N46RkXdf8KXv6B',
            },
            {
                id: 2,
                altText: 'Slide 2',
                type: 'image',
                src: rhythm
            }
        ] : [
            {
                id: 1,
                altText: 'Slide 1',
                type: 'video',
                src: 'https://www.youtube.com/embed/UJtJnBYmf5w?si=mLLMNYuBIUi4jJKX',
            },
            {
                id: 2,
                altText: 'Slide 2',
                type: 'image',
                src: antiarrhythmicmed
            }
        ]);
    }, [week]);

    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col className="d-flex align-items-center mb-3">
                    <div className="w-25">
                        <Select
                            options={weekoptions}
                            name="weeklevel"
                            className="inputSelect"
                            value={week}
                            onChange={(e) => { selectWeek(e) }}
                            isOptionDisabled={(option) => option.disabled}
                        />
                    </div>
                    <i className="icon_alfred_overview al_text_link text-decoration-none pointer mx-3" id="overviewtooltip" style={{ fontSize: "22px" }} onClick={handleSelect}></i>
                    <UncontrolledTooltip
                        modifiers={[{
                            preventOverflow: {
                                boundariesElement: "window",
                            },
                        }]}
                        placement="right"
                        trigger='hover'
                        target="overviewtooltip"
                    >
                        Overview
                    </UncontrolledTooltip>
                </Col>
                <Col lg="4" md="6" sm="6">
                    <Row className="align-items-center">
                        <span className="w-auto">Progress</span>
                        <Col className="healthhubprogress">
                            <Slider
                                dots
                                min={0}
                                max={100}
                                step={25}
                                dotStyle={{ borderColor: '#c5c5c5' }}
                                activeDotStyle={{ borderColor: '#1dffa4' }}
                                value={week.value === "Week 1" ? 0 : week.value === "Week 2" ? 25 : week.value === "Week 3" ? 50 : week.value === "Week 4" ? 75 : 100}
                                onChange={(e) => { }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {week.value === "Week 1" &&
                <>
                    <h6 className="mb-3 fw-semibold">General Knowledge - <small className="fw-normal text-grey">Understanding Atrial Fibrillation (Afib)</small></h6>
                    <Row className='al_hubpreviw'>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">Understand Atrial fibrillation(AF)</strong>
                                        <img
                                            src={atrialfib}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
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
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">Why treatment?</strong>
                                        <img
                                            src={whytreatment}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
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
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">Rhythm</strong>
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={next}
                                            previous={previous}
                                            interval={null}
                                            className="al_preview_carousel">
                                            <CarouselIndicators
                                                items={items}
                                                activeIndex={activeIndex}
                                                onClickHandler={goToIndex}
                                            />
                                            {slides}
                                            <CarouselControl
                                                direction="prev"
                                                directionText=""
                                                onClickHandler={previous}
                                            />
                                            <CarouselControl
                                                direction="next"
                                                directionText=""
                                                onClickHandler={next}
                                            />
                                        </Carousel>
                                        <p className="mt-3">
                                            Atrial fibrillation (Afib) is an irregular and
                                            often very rapid heart rhythm. An irregular heart
                                            rhythm is called an arrhythmia. Afib can lead to
                                            blood clots in the heart. The condition also
                                            increases the risk of stroke, heart failure and
                                            other heart-related complications.
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </>
            }
            {week.value === "Week 2" &&
                <>
                    <h6 className="mb-3 fw-semibold">Antiarrhythmic Knowledge</h6>
                    <Row>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">What is an antiarrhythmic medication or drug?</strong>
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={next}
                                            previous={previous}
                                            interval={null}
                                            className="al_preview_carousel">
                                            <CarouselIndicators
                                                items={items}
                                                activeIndex={activeIndex}
                                                onClickHandler={goToIndex}
                                            />
                                            {slides}
                                            <CarouselControl
                                                direction="prev"
                                                directionText=""
                                                onClickHandler={previous}
                                            />
                                            <CarouselControl
                                                direction="next"
                                                directionText=""
                                                onClickHandler={next}
                                            />
                                        </Carousel>
                                        <p className="mt-3">
                                            Antiarrhythmic medications are a type of drug used to treat abnormal heart rhythms, such as the one you're experiencing - atrial fibrillation. These drugs are designed with a special purpose: to help maintain a <strong>normal heart rhythm</strong>.
                                        </p>
                                        <p>They can be prescribed to help <strong>control your heart rate</strong> and <strong>improve your symptoms</strong>, making your day-to-day life more comfortable.</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">The risks of antiarrhythmic medication?</strong>
                                        <img
                                            src={antiarrhythmicrisk}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
                                        />
                                        <p className="mt-3">
                                            Antiarrhythmic medications can indeed be effective, but it's equally important to be aware of the potential risks. Here's what you should know:
                                        </p>
                                        <p>
                                            <strong>Your well-being and quality of life matter:</strong> Symptoms such as palpitations, shortness of breath, weakness, and anxiety can affect your overall well-being and quality of life. It's important to communicate these experiences with your healthcare provider
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">About the risks of flecainide?</strong>
                                        <img
                                            src={flecainiderisks}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
                                        />
                                        <p className="mt-3">
                                            <strong>Self-management behaviors:</strong> It's essential for your well-being to follow the prescribed regimen for taking flecainide.
                                        </p>
                                        <p>
                                            <strong>Specific adverse events:</strong> The available sources do not mention specific adverse events related to flecainide usage. However, this doesn't mean there aren't any. It's always best to stay vigilant and report any unusual symptoms to your healthcare provider.
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </>
            }

            {week.value === "Week 3" &&
                <>
                    <h6 className="mb-3 fw-semibold">Ablation Knowledge</h6>
                    <Row>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">Different types of catheter ablation available for atrial fibrillation?</strong>
                                        <img
                                            src={cathetertypes}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
                                        />
                                        <p className="mt-3">
                                            There are indeed different types of catheter ablation available for atrial fibrillation. Here are some of the commonly used types:
                                        </p>
                                        <ol type="a">
                                            <li>Radiofrequency catheter ablation of atrial foci</li>
                                            <li>Pulmonary vein isolation (PV isolation)</li>
                                            <li>Maze operation</li>
                                        </ol>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">Risks of catheter ablation of atrial fibrillation?</strong>
                                        <img
                                            src={catheterrisk}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
                                        />
                                        <p className="mt-3"><strong>Stroke: </strong> Atrial fibrillation can increase the risk of stroke, and while catheter ablation can help manage the condition, it doesn't completely eliminate this risk.</p>
                                        <p><strong>Adverse cardiovascular events: </strong>It's important to know that patients with atrial fibrillation may face a higher risk of adverse cardiovascular events such as heart failure, myocardial infarction (heart attack), and cardiovascular death</p>
                                        <p><strong>Comorbidities: </strong>Patients with atrial fibrillation often have a higher rate of comorbidities such as hypertension, diabetes, dyslipidemia, and coronary artery disease</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4" md="6" sm="12" className='mb-3'>
                            <Card className='al_cardview'>
                                <CardBody>
                                    <div>
                                        <strong className="d-block mb-2">What is called phrenic nerve palsy?</strong>
                                        <img
                                            src={nervepalsy}
                                            alt=""
                                            style={{ height: "130px", objectFit: "contain" }}
                                        />
                                        <p className="mt-3">
                                            This condition refers to the temporary or permanent paralysis of the phrenic nerve, which plays a crucial role in controlling the movement of your diaphragm and thus, your breathing function. It's indeed a serious matter and your concerns are completely valid.
                                        </p>
                                        <p>Phrenic nerve palsy can occur as a complication of catheter ablation for atrial fibrillation, specifically when the ablation procedure affects the phrenic nerve.</p>

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </>
            }
            <div className="mt-4">
                <button
                    type="button"
                    className="al_savebtn"
                    onClick={handleSetTabs}
                >
                    Proceed
                </button>
            </div>
        </React.Fragment>
    )
}
