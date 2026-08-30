import React, { useEffect } from 'react'
import CategoryCard from './../Category/CategoryCard';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../store/actions/categoryAction'
import TwSpinner from '../common/TwSpinner';

const CategoryContainer = ({ data, loading }) => {

    const colors = ["#FFD3E8", "#F4DBA5", "#55CFDF", "#FF6262", "#0034FF", "#FFD3E8"]
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className="admin-content-text mt-2 ">كل التصنيفات</div>
            <div className='my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6'>
                {
                    loading === false ? (
                        data ? (
                            data.map((item, index) => {
                                return (<CategoryCard key={index} id={item._id} title={item.name} img={item.image} background={colors[index % colors.length]} />)
                            })
                        ) : <h4>لا يوجد تصنيفات</h4>
                    ) : <div className="col-span-full flex justify-center"><TwSpinner /></div>
                }
            </div>
        </div>
    )
}

export default CategoryContainer
