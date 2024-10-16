import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { getActionTypes, getProfilePictureByGender } from '../../../_mock/helperIndex';
import Chatbot from "../../../images/alfredicon.svg";
import ChatBotMsgInterface from '../../Utilities/ChatBotMsgInterface';
import { getChatStreamRequest, setChatHistoryRequest, setInputDisableRequest } from "../../../store/EducationaChatBot/slice";
import ChatBotSearchArea from '../../Utilities/ChatBotSearchArea';
import botIcon from "../../../images/botIcon.png";
import { Document, Page, pdfjs } from 'react-pdf';

const EducationBot = (props) => {
    const dispatch = useDispatch();

    const [isShowexpandmenu, setIsShowexpandmenu] = useState(false);
    const isInputDisable = useSelector((state) => state?.educationalChatBotSlice?.isInputDisable);
    const isChatBotLoading = useSelector((state) => state?.educationalChatBotSlice?.isChatBotLoading);
    const getProfileDetails = useSelector((state) => state?.utilityCallFunctionSlice?.getProfileDetails || undefined);
    const actionType = useSelector((state) => state?.utilityCallFunctionSlice?.actionType || getActionTypes.UNSELECT);
    const profilePicture = getProfilePictureByGender(getProfileDetails);
    const chatHistory = useSelector((state) => state?.educationalChatBotSlice?.chatHistory || undefined);
    const regenerateResponse = useSelector((state) => state?.educationalChatBotSlice?.regenerateResponse);
    const [numPages, setNumPages] = useState(null);
    const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

    const handleRegenerateResponse = () => {
        handleFormSubmit(chatHistory?.[chatHistory?.length - 2]?.content)
    }

    const handleFormSubmit = (e) => {
        let inputValue = e?.target?.value || e;
        if (!inputValue.trim()) return; // Do not submit empty input
        dispatch(setInputDisableRequest(true))
        dispatch(setChatHistoryRequest({ content: inputValue, role: 'User' }))
        dispatch(getChatStreamRequest({ inputValue, innerBot: true }))
    };

    useEffect(() => {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }, []);

    return (
        <React.Fragment>
            <div className='al_edbot_expcon pt-1 pb-3'>
                <div className='al_edbot_container ms-4'>
                    <nav
                        className={
                            "al_edbot_expand pt-3 " + (isShowexpandmenu ? " al_ed_slide_out " : "")
                        }
                    >
                        <i
                            className="icon_alfred_menucollapse pointer"
                            onClick={() => setIsShowexpandmenu(!isShowexpandmenu)}
                        ></i>
                        <div className='al_left_data py-3'>
                            <div>
                                <p>Today</p>
                                <hr />
                                <ul>
                                    <li>
                                        <span>What is Afib?</span><i className='icon_alfred_vmore'></i>
                                    </li>
                                    <li>
                                        <span>Risks of Afib?</span><i className='icon_alfred_vmore'></i>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p>Previous Day</p>
                                <hr />
                                <ul>
                                    <li>
                                        <span>What are the symptoms of Afib?</span><i className='icon_alfred_vmore'></i>
                                    </li>
                                    <li>
                                        <span>How is Afib diagnosed?</span><i className='icon_alfred_vmore'></i>
                                    </li>
                                    <li>
                                        <span>What are the treatment options for Afib?</span><i className='icon_alfred_vmore'></i>
                                    </li>
                                    <li>
                                        <span>How can Afib be managed with lifestyle changes?</span><i className='icon_alfred_vmore'></i>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </nav>
                    <div className="cs_homepage mt-0 h-100">
                        <div className={"w-100 mb-2" + (isShowexpandmenu ? " ps-4" : "")}>
                            <div className="d-flex align-items-center gap-2 px-2">
                                <i
                                    className={"icon_alfred_menuexpand pointer me-3 " + (!isShowexpandmenu ? 'al_menuClose' : '')}
                                    onClick={() => setIsShowexpandmenu(!isShowexpandmenu)}
                                ></i>
                                <img src={botIcon} alt="Bot" />
                                <div style={{ lineHeight: 1.1 }}>
                                    <div className="fw-medium">Alfred</div>
                                    <small className="text-success text-small">Online</small>
                                </div>
                            </div>
                        </div>
                        <div className="w-75 al_chatbotauth pt-1 wflexLayout">
                            <div className="d-flex flex-column gap-3">
                                <div className="flex-grow-1">
                                    <div className="scrolldiv">
                                        <Row className="mb-4 al_chatcontent">
                                            <div>
                                                <img src={Chatbot} alt="Bot" id="botinitialimage" />
                                                <UncontrolledTooltip
                                                    modifiers={[{ preventOverflow: { boundariesElement: 'window' } }]}
                                                    placement='bottom' target="botinitialimage">
                                                    Alfred
                                                </UncontrolledTooltip>
                                            </div>
                                            <Col>
                                                <div>Hello, I am Alfred! How can i assist you today?</div>
                                            </Col>
                                        </Row>
                                        {chatHistory?.length > 0 && chatHistory?.map((x, index) => {
                                            return <ChatBotMsgInterface key={index} props={{ chatHistory: x, index, profilePicture, getProfileDetails, isInputDisable, actionType }} />
                                        })}
                                        {isChatBotLoading &&
                                            <Row className="mb-4 al_chatcontent al_bot-reply">
                                                <div>
                                                    <img src={Chatbot} alt="Bot" id="botimageed" />
                                                </div>
                                                <Col>
                                                    <div>
                                                        <div className="al_chatloading my-1"></div>
                                                    </div>
                                                </Col>
                                            </Row>}
                                    </div>
                                </div>
                                <div
                                    className="cs_mainsearch al_chatfooter p-3"
                                >
                                    {regenerateResponse ?
                                        <div className='text-center'>
                                            <button type="button" className='al_savebtn' onClick={handleRegenerateResponse}><i className="icon_alfred_sync me-2" style={{ verticalAlign: "middle", fontSize: "16px" }}></i>Regenerate</button>
                                        </div>
                                        :
                                        <>
                                            <ChatBotSearchArea
                                                handleFormSubmit={handleFormSubmit}
                                                isInputDisable={isInputDisable}
                                            />
                                            <div className="al_note pt-1">
                                                Disclaimer: Not a medical advice
                                            </div>
                                        </>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            "al_pdf_expand" + (isShowexpandmenu ? " al_pdf_slide_out " : "")
                        }
                    >
                        <i
                            className="icon_alfred_close px-4 mb-2 pointer text-end"
                            onClick={() => setIsShowexpandmenu(!isShowexpandmenu)}
                        ></i>
                        <Document
                            file={{ url: props.path }}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={console.log}
                        >
                            <Page pageNumber={1} />
                        </Document>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EducationBot