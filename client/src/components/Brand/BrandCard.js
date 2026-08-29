import React from 'react'
import { Link } from 'react-router-dom'

const BrandCard = ({ img, id }) => {
  return (
    <div
      className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/6 my-2 flex justify-center px-2">
      <div
        className="my-1"
        style={{
          width: "100%",
          height: "151px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
        }}>
        <Link to={`/products/brand/${id}`} style={{ textDecoration: 'none' }}>
          <img style={{ width: "100%", height: "151px" }} src={img} alt="" />
        </Link>
      </div>
    </div>
  )
}

export default BrandCard
