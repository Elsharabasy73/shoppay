import React from 'react'
import { Link } from 'react-router-dom'

const BrandCard = ({ img, id }) => {
  return (
    <Link 
      to={`/products/brand/${id}`} 
      className="group no-underline block w-full"
    >
      <div className="bg-white rounded-2xl border border-slate-100 p-4 h-28 sm:h-32 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        <img 
          src={img} 
          alt="brand" 
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
    </Link>
  )
}

export default BrandCard

