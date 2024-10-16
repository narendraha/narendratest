import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Carousel, CarouselIndicators, CarouselItem, Col, Row } from "reactstrap";
import { getActionTypes, getActivetab, getParsedData, getSplitContentIntoChunks } from "../../../../_mock/internalJsControl";
import { getHealthHubContentVedioRequest, setActiveTabRequest, setHealthHubSkippedWeekRequest } from "../../../../store/Home/slice";
import { setActionTypeAndActionData } from "../../../../store/UtilityCallFunction/slice";

const HealthHubContentView = () => {
    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [chunkIndices, setChunkIndices] = useState([]);

    const { healthHubWeeklyContent, selectedHealthHubWeek } = useSelector((state) => state?.homePageSlice);

    useEffect(() => {
        // Initialize chunkIndices array with 0 for each content item
        if (healthHubWeeklyContent?.content) {
            setChunkIndices(healthHubWeeklyContent?.content.map(() => 0));
        }
    }, [healthHubWeeklyContent]);

    const handleSetTabs = () => {
        dispatch(setActiveTabRequest({ setTab: getActivetab.HEALTHHUB, nextOrBackTab: getActivetab.EXPTMONITORING }));
        dispatch(setHealthHubSkippedWeekRequest({ selectedHealthHubWeek, isUpdateSkipWeek: true }));
    };

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
    };

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
                        rel="noreferrer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    ></iframe>
                )}
            </CarouselItem>
        ));
    };

    // content carousel
    const handleNextChunk = (contentIndex, description) => {
        let contentChunks = getSplitContentIntoChunks(description, 150);

        setChunkIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            if (newIndices[contentIndex] < contentChunks.length - 1) {
                newIndices[contentIndex] += 1;
            }
            return newIndices;
        });
    };

    const handlePreviousChunk = (contentIndex) => {
        setChunkIndices((prevIndices) => {
            const newIndices = [...prevIndices];
            if (newIndices[contentIndex] > 0) {
                newIndices[contentIndex] -= 1;
            }
            return newIndices;
        });
    };

    // to handle vedio model 
    const vedioSelectHandle = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.SELECT, actionData: { isVedioModel: true } }));
        dispatch(getHealthHubContentVedioRequest())
    }

    return (
        <React.Fragment>
            {healthHubWeeklyContent && <>
                <Row className="align-items-center">
                    <Col>
                        <h6 className="mb-0 fw-semibold ">{healthHubWeeklyContent?.week_title}</h6>
                    </Col>
                    <div className="w-auto">
                        <button type="button" className="al_button_sm px-3 py-1 al_testbtn" style={{ backgroundColor: "#1a2942", borderColor: "#1a2942" }}
                            onClick={vedioSelectHandle}>
                            <i className="icon_alfred_video me-2" style={{ verticalAlign: "middle" }}></i>
                            Videos</button>
                    </div>
                </Row>
                <Row>
                    {healthHubWeeklyContent?.week_objective && <div className="mb-0">
                        <span className="fw-semibold">Lesson Objective: </span>
                        <span className="text-grey text-small">{getParsedData(healthHubWeeklyContent?.week_objective)?.map((obj) => obj)}</span>
                    </div>}
                    {healthHubWeeklyContent?.week_activity && <div className="mb-0">
                        <span className="fw-semibold">Activities: </span>
                        <span className="text-grey text-small">{healthHubWeeklyContent?.week_activity}</span>
                    </div>}
                    {healthHubWeeklyContent?.week_desc && <div className="fw-normal lh-normal text-small my-2" style={{ fontSize: "1rem" }}>{healthHubWeeklyContent?.week_desc}</div>}
                    {healthHubWeeklyContent?.week_explanation && <div className="fw-normal lh-normal text-grey mb-3">
                        <div dangerouslySetInnerHTML={{ __html: healthHubWeeklyContent?.week_explanation }} />
                    </div>}
                </Row>
                <Row className="al_hubpreviw">
                    {healthHubWeeklyContent?.content?.map((content, index) => (
                        <Col sm="12" className="mb-3" key={content.id}>
                            <Card className="al_cardview">
                                <CardBody>
                                    <div className="text-end mb-2">
                                        <i className='icon_alfred_share pointer' onClick={() => { }} ></i>
                                    </div>
                                    <Row>
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
                                        <Col sm="7" className="d-flex flex-column">
                                            <strong className="d-block mb-2">{content?.title}</strong>
                                            <div className="flex-grow-1">
                                                <div dangerouslySetInnerHTML={getSplitContentIntoChunks(content?.description, 150)?.[chunkIndices[index]]} />
                                            </div>
                                            {getSplitContentIntoChunks(content?.description, 150)?.length > 1 && <div className="d-flex align-items-center justify-content-center mt-3 al_morecontent">
                                                <i className="icon_alfred_left_arrow" onClick={() => handlePreviousChunk(index)}></i>
                                                <i className="icon_alfred_right_arrow" onClick={() => handleNextChunk(index, content?.description)}></i>
                                            </div>}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="mt-3">
                    <button
                        type="button"
                        className="al_savebtn"
                        onClick={handleSetTabs}
                    >
                        Proceed
                    </button>
                </div>
            </>}
        </React.Fragment>
    );
};

export default HealthHubContentView;
