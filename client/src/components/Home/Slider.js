import React, { useState } from 'react'
import { Navbar, Container, Carousel, FormControl, Nav } from 'react-bootstrap'

import sliderimg from "../../assets/images/slider1.png";
import slider4 from "../../assets/images/slider4.png";
import prod3 from "../../assets/images/prod3.png";
import prod4 from "../../assets/images/prod4.png";

const Slider = () => {
    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }
    return (
        <div className="max-w-[1400px] mx-auto px-5 lg:px-20 mt-4">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#DAEBF7]">
                <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className="slider-background" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap p-3">
                    <img
                        style={{ height: "296px", width: "313.53px", maxWidth: "100%", objectFit: "contain" }}
                        src={slider4}
                        alt="First slide"
                    />
                    <div className="text-center">
                        <h3 className="slider-title">هناك خصم كبير</h3>
                        <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item className="slider-background2" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap p-3">
                    <img
                        style={{ height: "296px", width: "313.53px", maxWidth: "100%", objectFit: "contain" }}
                        src={sliderimg}
                        alt="Second slide"
                    />
                    <div className="text-center">
                        <h3 className="slider-title">هناك خصم كبير</h3>
                        <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item className="slider-background3" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap p-3">
                    <img
                        style={{ height: "296px", width: "313.53px", maxWidth: "100%", objectFit: "contain" }}
                        src={prod3}
                        alt="Third slide"
                    />
                    <div className="text-center">
                        <h3 className="slider-title">هناك خصم كبير</h3>
                        <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item className="slider-background4" interval={2000}>
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap p-3">
                    <img
                        style={{ height: "296px", width: "313.53px", maxWidth: "100%", objectFit: "contain" }}
                        src={prod4}
                        alt="Fourth slide"
                    />
                    <div className="text-center">
                        <h3 className="slider-title">هناك خصم كبير</h3>
                        <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
            </div>
        </div>
    )
}

export default Slider
