import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ background, img, title, id }) => {
    return (
        <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 my-4 flex justify-center px-2">
            <Link to={`/products/category/${id}`} style={{ textDecoration: 'none' }} className="relative block w-[150px]">
                <div className="absolute inset-0 bg-[#3F96D2] rounded-3xl rotate-[-1deg] z-0"></div>
                <div className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-md border border-[#DAEBF7] p-4 flex flex-col items-center">
                    <div className="w-[110px] h-[110px] rounded-full flex items-center justify-center overflow-hidden shrink-0" style={{ backgroundColor: `${background}` }}>
                        <img alt={title} src={img} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <p className="text-[#1A3F60] font-bold text-sm mt-3 text-center">{title}</p>
                </div>
            </Link>
        </div>
    )
}

export default CategoryCard
