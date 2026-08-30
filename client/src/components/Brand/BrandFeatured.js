import React from 'react'
import SubTitle from '../common/SubTitle'
import BrandCard from './BrandCard'
import brand1 from "../../assets/images/brand1.png";
import HomeBrandHook from '../../hooks/brand/home-brand-hook'
import TwSpinner from '../common/TwSpinner';

const BrandFeatured = ({ title, btntitle }) => {

    const [brand, loading] = HomeBrandHook();

    return (
        <div className="max-w-[1400px] mx-auto px-5">


            <SubTitle title={title} btntitle={btntitle} pathText="/allbrand" />
            <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                {
                    loading === false ? (
                        brand ? (
                            brand.data.slice(0, 6).map((item, index) => {
                                return (<BrandCard id={item._id} key={index} img={item.image} />)
                            })
                        ) : <h4>لا يوجد ماركات</h4>
                    ) : <div className="col-span-full flex justify-center"><TwSpinner /></div>
                }
            </div>



        </div>
    )
}

export default BrandFeatured
