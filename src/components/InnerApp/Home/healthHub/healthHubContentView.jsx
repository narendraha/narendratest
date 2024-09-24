import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Carousel, CarouselIndicators, CarouselItem, Col, Row } from "reactstrap";
import { getActivetab } from "../../../../_mock/internalJsControl";
import { setActiveTabRequest, setHealthHubSkippedWeekRequest } from "../../../../store/Home/slice";
import { Button, Modal, ModalBody } from "reactstrap";
import congrats from '../../../../images/congrats.png';

const HealthHubContentView = () => {
    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const { healthHubWeeklyContent, selectedHealthHubWeek } = useSelector((state) => state?.homePageSlice);

    const handleSetTabs = () => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.HEALTHHUB, nextOrBackTab: getActivetab.EXPTMONITORING }))
        dispatch(setHealthHubSkippedWeekRequest({ selectedHealthHubWeek, isUpdateSkipWeek: true }))
    }

    const getCarosuelItem = (content, index) => {
        const items = [
            {
                id: 1,
                altText: 'Slide 1',
                type: index % 2 === 0 ? 'image' : 'video',
                src: index % 2 === 0 ? content?.photo : content?.video,
            },
            {
                id: 2,
                altText: 'Slide 2',
                type: index % 2 === 0 ? 'video' : 'image',
                src: index % 2 === 0 ? content?.video : content?.photo,
            }
        ];
        return items;
    }

    const next = (content, index) => {
        if (animating) return;
        let items = getCarosuelItem(content, index);
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = (content, index) => {
        if (animating) return;
        let items = getCarosuelItem(content, index);
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slideHandler = (content, index) => {
        let carosuelItem = getCarosuelItem(content, index);
        return carosuelItem.map((item) => (
            <CarouselItem
                key={item.id}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                {item.type === "image" ? (
                    <img
                        src={item.src}
                        alt={item.altText}
                        style={{ height: "200px", objectFit: "cover", width: "100%", marginBottom: "6px" }}
                    />
                ) : (
                    <iframe
                        width="100%"
                        height="200"
                        src={item.src}
                        title={item.altText}
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    ></iframe>
                )}
            </CarouselItem>
        ));
    }

    useEffect(() => {
        if (healthHubWeeklyContent?.content) {
            const interval = setInterval(() => {
                next(healthHubWeeklyContent?.content[0], 0);
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [activeIndex, animating, healthHubWeeklyContent]);

    return (
        <React.Fragment>
            <Row className="align-items-center">
                <Col>
                    <h6 className="mb-0 fw-semibold">{healthHubWeeklyContent?.week_title}</h6>
                    <div className="fw-normal lh-normal text-small text-grey mb-3">{healthHubWeeklyContent?.week_desc}</div>
                </Col>
            </Row>
            <Row className='al_hubpreviw'>
                {healthHubWeeklyContent?.content?.map((content, index) => (
                    <Col sm="12" className='mb-3' key={content.id}>
                        <Card className='al_cardview'>
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col sm="5">
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={() => next(content, index)}
                                            previous={() => previous(content, index)}
                                            className="al_preview_carousel"
                                        >
                                            <CarouselIndicators
                                                items={getCarosuelItem(content, index)}
                                                activeIndex={activeIndex}
                                                onClickHandler={goToIndex}
                                            />
                                            {slideHandler(content, index)}
                                        </Carousel>
                                    </Col>
                                    <Col sm="7">
                                        <strong className="d-block mb-2">{content?.title}</strong>
                                        <p>{content?.description}</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row >
            <div className="mt-3">
                <button
                    type="button"
                    className="al_savebtn"
                    onClick={handleSetTabs}
                >
                    Proceed
                </button>
            </div>
            <Modal
                isOpen={false}
                className="al_confirm_modal"
                wrapClassName="al_outerparentwp"
            >
                <ModalBody className="text-center">
                    <img src={congrats} alt="congrats" width={130} />
                    <h5 className="text-info text-wrap al_modal_heading mt-3 mb-1">
                        Congratulations
                    </h5>
                    <h5 className="text-wrap al_modal_subheading">
                        on completing your weekly health hub study plan
                    </h5>
                </ModalBody>

                <div className="modelFooter text-center my-3">
                    <Button
                        type="button"
                        className="text-capitalize btn al_button_add"
                        onClick={() => { }}
                    >
                        OK
                    </Button>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default HealthHubContentView;
