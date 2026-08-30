import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ background, img, title, id }) => {
    return (
        <Link 
            to={`/products/category/${id}`} 
            className="group no-underline block w-full"
        >
            <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: background || '#F2F8FD' }}
                >
                    <img 
                        alt={title} 
                        src={img} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:rotate-2" 
                    />
                </div>
                <p className="text-[#1A3F60] font-bold text-xs sm:text-sm mt-3 text-center truncate w-full group-hover:text-[#206EA9] transition-colors">
                    {title}
                </p>
            </div>
        </Link>
    )
}

export default CategoryCard

