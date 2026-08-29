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
            <div className='my-1 flex flex-wrap justify-between'>
                {
                    loading === false ? (
                        brand ? (
                            brand.data.slice(0, 5).map((item, index) => {
                                return (<BrandCard id={item._id} key={index} img={item.image} />)
                            })
                        ) : <h4>لا يوجد ماركات</h4>
                    ) : <TwSpinner />
                }
            </div>



        </div>
    )
}

export default BrandFeatured
