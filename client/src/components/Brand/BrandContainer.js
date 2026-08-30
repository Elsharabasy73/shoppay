import React from 'react'
import BrandCard from './BrandCard'
import brand1 from "../../assets/images/brand1.png";
import brand2 from "../../assets/images/brand2.png";
import brand3 from "../../assets/images/brand3.png";
import TwSpinner from '../common/TwSpinner';

const BrandContainer = ({ data,loading }) => {
   
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className="admin-content-text mt-2 ">كل الماركات</div>
            <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                {
                    loading === false ? (
                        data ? (
                            data.map((item, index) => {
                                return (<BrandCard id={item._id} key={index} img={item.image} />)
                            })
                        ) : <h4>لا يوجد ماركات</h4>
                    ) : <div className="col-span-full flex justify-center"><TwSpinner /></div>
                }
            </div>
        </div>
    )
}

export default BrandContainer
