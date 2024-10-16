import React, { useState } from 'react';
import { Table, Row, Col, Label, FormGroup, Card, CardBody, Carousel, CarouselControl, CarouselItem, CarouselIndicators } from 'reactstrap';
import Select from "react-select";
import fileupload from '../../../images/fileupload.svg';
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import rhythm from "../../../images/rhythm.jpg";
import whytreatment from "../../../images/whytreatment.jpg";
import atrialfib from "../../../images/atrialfib.png";
import Switch from "react-switch";

export default function HealthHubBuilder() {
    const [view, setView] = useState("view");
    const [value, setValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const weekoptions = [
        { value: "Week 1", label: "Week 1" },
        { value: "Week 2", label: "Week 2" },
        { value: "Week 3", label: "Week 3" },
        { value: "Week 4", label: "Week 4" },
        { value: "Week 5", label: "Week 5" },
        { value: "Week 6", label: "Week 6" }
    ];

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

    const items = [
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
    ];

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
                        src="https://www.youtube.com/embed/Opvz0mnwvYo?si=36N46RkXdf8KXv6B"
                        title={item.altText}
                        frameBorder="0"
                        allowFullScreen
                        rel="noreferrer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    ></iframe>
                }
            </CarouselItem>
        )
    }
    )
    return (
        <>
            {view === "view" &&
                <div className="wflexLayout">
                    <Row className='d-flex align-items-center al-pad pb-1'>
                        <div className='w-auto px-3 d-flex align-items-center'>
                            <h3 className='bc_main_text mb-0 me-4'>Weekly Curriculum</h3>
                            <button type="button" className="al_add_dashed_button mb-0" onClick={() => setView("add")}>
                                <i className='icon_alfred_plus me-2'></i>
                                Add Curriculum
                            </button>
                        </div>
                        <Col className='d-flex align-items-center justify-content-end'>
                            <Select
                                options={weekoptions}
                                name="weekfilter"
                                className="inputSelect w-25 me-3"
                            // value={week}
                            // onChange={(e) => { selectWeek(e) }}
                            />
                            <div className="al_searchleft px-0">
                                <input type="text" className="form-control" placeholder="Search" />
                                <i className="icon_alfred_search"></i>
                            </div>
                        </Col>
                    </Row>
                    <div className="wflexLayout">
                        <div className='wflexScroll d-flex flex-column'>
                            <div className='flex-grow-1'>
                                <Table borderless responsive className='al_listtable al-pad mb-0 al_curriculumtable w-80'>
                                    <thead>
                                        <tr>
                                            <th>Week</th>
                                            <th>Title</th>
                                            <th>Created on</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Week 1</td>
                                            <td>General content about Atrial Fibrilliation</td>
                                            <td>29-07-2024</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Week 2</td>
                                            <td>Antiarrhythmic medication(Rhythm Control)</td>
                                            <td>29-07-2024</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Week 3</td>
                                            <td>Information about Ablation(Rhythm Control)</td>
                                            <td>29-07-2024</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Week 4</td>
                                            <td>Blood Thinners(Stroke Prevention)</td>
                                            <td>29-07-2024</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Week 5</td>
                                            <td>Left Atrial Appendage Occlusion(Stroke Prevention)</td>
                                            <td>29-07-2024</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Week 6</td>
                                            <td>Lifestyle</td>
                                            <td>29-07-2024</td>
                                            <td>
                                                <div className='al_cardactions'>
                                                    <i className='icon_alfred_edit'></i>
                                                    <i className='icon_alfred_trashbin'></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {view === "add" &&
                <div className="wflexLayout">
                    <Formik
                        initialValues={{}}
                        // validationSchema={() => { }}
                        onSubmit={() => { }}
                    >
                        {() => {
                            return (
                                <Form className='wflexLayout'>
                                    <Row className='mx-0 h-100 al_healthubcontent'>
                                        <Col lg="5" md="7" sm="12" className='px-0 h-100'>
                                            <div className='wflexLayout'>
                                                <div className='wflexScroll d-flex flex-column al-pad py-0 my-3'>
                                                    <div className='flex-grow-1'>
                                                        <h3 className='bc_main_text mb-2 me-4'>Add Content</h3>
                                                        <Card className='al_cardview mb-3 h-auto'>
                                                            <CardBody>
                                                                <Row>
                                                                    <Col lg="5" sm="12">
                                                                        <FormGroup>
                                                                            <Label><span className='requiredLabel'>*</span>Week</Label>
                                                                            <Select
                                                                                options={weekoptions}
                                                                                name="weeklevel"
                                                                                className="inputSelect"
                                                                            // value={week}
                                                                            // onChange={(e) => { selectWeek(e) }}
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col lg="7" sm="12">
                                                                        <FormGroup>
                                                                            <Label><span className='requiredLabel'>*</span>Heading</Label>
                                                                            <Field
                                                                                type="text"
                                                                                name="heading"
                                                                                placeholder="Enter heading"
                                                                                className="form-control"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col sm="12">
                                                                        <FormGroup>
                                                                            <Label><span className='requiredLabel'>*</span>Title (Question)</Label>
                                                                            <Field
                                                                                type="text"
                                                                                name="title"
                                                                                placeholder="Enter Content Title"
                                                                                className="form-control"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col sm="12">
                                                                        <FormGroup className='al_quilleditor'>
                                                                            <Label><span className='requiredLabel'>*</span>Description (Answer)</Label>
                                                                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col sm="12">
                                                                        <Label><span className='requiredLabel'>*</span>Upload Image</Label>
                                                                        <div className='al_filedragupload flex-wrap flex-row p-3 mb-3 mt-0'
                                                                            onDrop={e => handleDrop(e)}
                                                                            onDragOver={e => handleDragOver(e)}
                                                                            onDragEnter={e => handleDragEnter(e)}
                                                                            onDragLeave={e => handleDragLeave(e)}
                                                                        >
                                                                            <img src={fileupload} alt="dragfile" style={{ width: "25px" }} />
                                                                            <small className='mx-2'>Drag & Drop</small>
                                                                            <h6 className='m-2'>OR</h6>
                                                                            <input
                                                                                type="file"
                                                                                id="document"
                                                                                hidden
                                                                                onChange={(e) => { }}
                                                                            />

                                                                            <div id="al_blockele" className='ms-2'>
                                                                                <label htmlFor="document" className="al_choose">
                                                                                    Browse File
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                    <Col sm="12">
                                                                        <h6 className='text-center mb-3'>OR</h6>
                                                                        <FormGroup>
                                                                            <Field
                                                                                type="text"
                                                                                name="imageurl"
                                                                                placeholder="Enter Image URL"
                                                                                className="form-control"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col sm="12">
                                                                        <FormGroup>
                                                                            <Label>Video</Label>
                                                                            <Field
                                                                                type="text"
                                                                                name="imageurl"
                                                                                placeholder="Enter Video URL"
                                                                                className="form-control"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                            </CardBody>
                                                        </Card>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <button
                                                            type="reset"
                                                            className="al_grey_borderbtn"
                                                        >Clear
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="al_greybgbutton mx-3"
                                                        >Add Question
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg="7" md="5" sm="12" className='px-0 h-100'>
                                            <div className='wflexLayout'>
                                                <div className='wflexScroll d-flex flex-column al-pad py-0 my-3'>
                                                    <div className='flex-grow-1'>
                                                        <h3 className='bc_main_text mb-2 me-4'>Preview</h3>
                                                        <Row className='al_hubpreviw'>
                                                            <Col lg="6" md="12" className='mb-3'>
                                                                <Card className='al_cardview'>
                                                                    <CardBody>
                                                                        <div className='al_cardactions justify-content-between mb-2'>
                                                                            <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                                            <div>
                                                                                <i className='icon_alfred_edit ms-3'></i>
                                                                                <i className='icon_alfred_trashbin'></i>
                                                                            </div>
                                                                        </div>
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
                                                            <Col lg="6" md="12" className='mb-3'>
                                                                <Card className='al_cardview'>
                                                                    <CardBody>
                                                                        <div className='al_cardactions justify-content-between mb-2'>
                                                                            <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                                            <div>
                                                                                <i className='icon_alfred_edit ms-3'></i>
                                                                                <i className='icon_alfred_trashbin'></i>
                                                                            </div>
                                                                        </div>
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
                                                            <Col lg="6" md="12" className='mb-3'>
                                                                <Card className='al_cardview'>
                                                                    <CardBody>
                                                                        <div className='al_cardactions justify-content-between mb-2'>
                                                                            <Switch onChange={() => { }} checkedIcon={false} uncheckedIcon={false} checked={true} onColor="#35C792" width={40} height={18} />
                                                                            <div>
                                                                                <i className='icon_alfred_edit ms-3'></i>
                                                                                <i className='icon_alfred_trashbin'></i>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <strong className="d-block mb-2">Rhythm</strong>
                                                                            <Carousel
                                                                                activeIndex={activeIndex}
                                                                                next={next}
                                                                                previous={previous}
                                                                                className="al_preview_carousel">
                                                                                <CarouselIndicators
                                                                                    items={items}
                                                                                    activeIndex={activeIndex}
                                                                                    onClickHandler={goToIndex}
                                                                                />
                                                                                {slides}
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
                                                    </div>
                                                    <div className='mt-2'>
                                                        <button
                                                            type="button"
                                                            className="al_cancelbgbutton me-3"
                                                            onClick={() => setView("view")}
                                                        >Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="al_savebtn"
                                                            onClick={() => setView("view")}
                                                        >Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }}
                    </Formik>

                </div>
            }
        </>
    )
}