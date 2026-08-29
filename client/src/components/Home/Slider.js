import React from 'react'

import sliderimg from "../../assets/images/slider1.png";

const Slider = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5 lg:px-20 mt-4">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-[#DAEBF7]">
                <div className="d-flex flex-row justify-content-center align-items-center flex-wrap p-3">
                    <img
                        style={{ height: "296px", width: "313.53px", maxWidth: "100%", objectFit: "contain" }}
                        src={sliderimg}
                        alt="slider"
                    />
                    <div className="text-center">
                        <h3 className="slider-title">هناك خصم كبير</h3>
                        <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider
