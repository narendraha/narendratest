import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import atrialfib from "../../../images/atrialfib.png";
import whytreatment from "../../../images/whytreatment.png";
import rhythm from "../../../images/rhythm.png";

export const HealthHub = () => {
    return (
        <React.Fragment>
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
                        // setShow1(true);
                    }}
                >
                    Proceed
                </button>
            </div>
        </React.Fragment>
    )
}
