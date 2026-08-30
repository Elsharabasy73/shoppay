import React, { useState, useEffect } from 'react'
import SubTitle from '../common/SubTitle'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../store/actions/wishListAction';
import CardContainerHook from '../../hooks/products/card-container-hook';

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {

    const [favProd] = CardContainerHook()

    return (
        <div className="max-w-[1400px] mx-auto px-5">
            {products ? (<SubTitle title={title} btntitle={btntitle} pathText={pathText} />) : null}
            <div className='my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                {
                    products ? (
                        products.map((item, index) => <ProductCard favProd={favProd} key={index} item={item} />)
                    ) : null
                }
            </div>
        </div>
    )
}

export default CardProductsContainer
