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
            <div className='my-2 flex flex-wrap justify-between'>

                {
                    loading === false ? (
                        data ? (
                            data.map((item, index) => {
                                return (<CategoryCard key={index} id={item._id} title={item.name} img={item.image} background={colors[Math.floor(Math.random() * 5) + 1]} />)
                            })
                        ) : <h4>لا يوجد تصنيفات</h4>
                    ) : <TwSpinner />

                }

            </div>
        </div>
    )
}

export default CategoryContainer
