import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Carousel, CarouselIndicators, CarouselItem, Col, Row } from "reactstrap";
import { getActivetab } from "../../../../_mock/internalJsControl";
import { setActiveTabRequest } from "../../../../store/Home/slice";

const HealthHubContentView = () => {
    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const { healthHubWeeklyContent } = useSelector((state) => state?.homePageSlice);

    const handleSetTabs = () => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.HEALTHHUB, nextOrBackTab: getActivetab.EXPTMONITORING }))
    }

    const getCarosuelItem = (content) => {
        return [{
            id: 1,
            altText: 'Slide 1',
            type: 'video',
            src: "https://www.youtube.com/embed/Opvz0mnwvYo?si=a_dDmbH74VXc9bfv"
        },
        {
            id: 2,
            altText: 'Slide 2',
            type: 'image',
            src: content?.photo
        }]
    }



    const next = (content) => {
        if (animating) return;
        let items = getCarosuelItem(content);
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = (content) => {
        if (animating) return;
        let items = getCarosuelItem(content);
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slideHandler = (content) => {
        let carosuelItem = getCarosuelItem(content);
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
                next(healthHubWeeklyContent?.content[0]);
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
                {healthHubWeeklyContent?.content?.map((content) => (
                    <Col sm="12" className='mb-3' key={content.id}>
                        <Card className='al_cardview'>
                            <CardBody>
                                <Row className="align-items-center">
                                    <Col sm="5">
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={() => next(content)}
                                            previous={() => previous(content)}
                                            className="al_preview_carousel"
                                        >
                                            <CarouselIndicators
                                                items={getCarosuelItem(content)}
                                                activeIndex={activeIndex}
                                                onClickHandler={goToIndex}
                                            />
                                            {slideHandler(content)}
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
        </React.Fragment>
    );
}

export default HealthHubContentView;
