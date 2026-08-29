import React from 'react'
import { Link } from 'react-router-dom'
import mobile from '../../assets/images/mobile.png'
const UserAllOrderCard = ({ item }) => {
    
    return (
        <div>


            <div className="flex flex-wrap mb-2">
                <div className="w-1/4 md:w-1/6 flex justify-start px-2">
                    <Link to={`/products/${item.product._id}`} style={{ textDecoration: 'none' }}>
                        <img width="93px" height="120px" src={item.product.imageCover} alt="" />
                    </Link>
                </div>
                <div className="w-2/3 md:w-1/2 px-2">
                    <div className="inline pt-2 cat-title">
                        {item.product.title || ''}
                    </div>
                    <div className="inline pt-2 cat-rate me-2">{item.product.ratingsAverage ?
                        item.product.ratingsAverage : 0}</div>
                    <div className="rate-count inline p-1 pt-2">({`${item.product.ratingsQuantity || 0} تقييم`})</div>
                    <div className="mt-3 flex">
                        <div className="cat-text mt-1  inline">الكميه</div>
                        <input
                            value={item.quantity}
                            readOnly
                            className="mx-2 "
                            type="number"
                            style={{ width: "40px", height: "30px" }}
                        />
                        <div
                            className="color  inline"
                            style={{ backgroundColor: item.color }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAllOrderCard
