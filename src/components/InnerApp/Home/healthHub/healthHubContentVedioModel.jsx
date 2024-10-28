import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Modal, ModalBody, Row } from "reactstrap";
import { getActionTypes } from "../../../../_mock/helperIndex";
import { setActionTypeAndActionData } from "../../../../store/UtilityCallFunction/slice";

export const HealthHubContentVedioMdal = React.memo(() => {
    const dispatch = useDispatch();

    const healthHubVedioContent = useSelector((state) => (state?.homePageSlice?.healthHubVedioContent) || undefined)

    const vedioSelectHandle = () => {
        dispatch(setActionTypeAndActionData({ actionType: getActionTypes.UNSELECT, actionData: { isVedioModel: false } }));
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={healthHubVedioContent && healthHubVedioContent?.length > 0}
                className='modal-lg detailsModal'
                wrapClassName="al_outerparentwp"
            >
                <div className='d-flex align-items-center justify-content-between p-4'>
                    <h6 className='mb-0'>Videos</h6>
                    <i className="icon_alfred_close pointer" title="Close" onClick={vedioSelectHandle}></i>
                </div>
                <ModalBody className="wflexLayout p-0">
                    <div className='wflexScroll px-4 my-3'>
                        <Row>
                            {healthHubVedioContent && healthHubVedioContent?.map((embededUrl, index) => (
                                <Col lg="4" sm="6" className="mb-3" key={index}>
                                    <Card className="al_cardbg mb-0">
                                        <CardBody className="p-0">
                                            <iframe
                                                id={index}
                                                width="100%"
                                                height="150"
                                                src={embededUrl}
                                                title="video1"
                                                frameBorder="0"
                                                allowFullScreen
                                                rel="noreferrer"
                                                style={{ borderRadius: "8px" }}
                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                                            ></iframe>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
});