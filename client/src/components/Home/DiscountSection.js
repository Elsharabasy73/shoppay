import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import laptops from '../../assets/images/laptops.png'
const DiscountSection = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5 lg:px-20 my-6">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#3F96D2] to-[#1A3F60] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
                <div className="font-bold text-lg md:text-xl">خصم يصل حتي ٣٠٪ علي اجهزه اللاب توب</div>
                <img className="h-[90px] object-contain" src={laptops} alt="" />
            </div>
        </div>
    )
}

export default DiscountSection
