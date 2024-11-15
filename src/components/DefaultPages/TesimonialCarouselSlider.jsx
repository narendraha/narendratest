import React, { useRef } from 'react';
import Slider from 'react-slick';
import IconBoxStyle7 from '../DefaultPages/IconBox/IconBoxStyle7';


function TestimonialStyle3({ item }) {
    return (
        <>
            <div className="cs_testimonial cs_style_3 cs_radius_20 cs_white_bg text-start p-0">
                <IconBoxStyle7 item={item} />
            </div>
        </>
    );
}

export default function TestimonialCarouselStyle2({ data }) {
    const sliderRef = useRef(null);

    const next = () => {
        sliderRef.current.slickNext();
    };

    const previous = () => {
        sliderRef.current.slickPrev();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 4000,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="cs_testimonial_carousel cs_gap_20 position-relative">
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    <Slider ref={sliderRef} {...settings} className="cs_slider_activate">
                        {data?.map((item, index) => (
                            <div className="cs_slide" key={index}>
                                <TestimonialStyle3 item={item} />
                            </div>
                        ))
                        }
                    </Slider>
                </div>
            </div>
            <div className="cs_slider_navigation cs_style_2">
                <div className="cs_slider_prev cs_center" onClick={previous}>
                    <img src="/images/icons/left_arrow_blue.svg" alt="Prev" />
                </div>
                <div className="cs_slider_next cs_center" onClick={next}>
                    <img src="/images/icons/right_arrow_blue.svg" alt="Next" />
                </div>
            </div>
        </div>
    );
}
