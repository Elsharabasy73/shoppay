import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import SubTitle from '../common/SubTitle'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../store/actions/wishListAction';
import CardContainerHook from '../../hooks/products/card-container-hook';

const CardProductsContainer = ({ title, btntitle, pathText, products }) => {

    const [favProd] = CardContainerHook()

    return (
        <Container>
            {products ? (<SubTitle title={title} btntitle={btntitle} pathText={pathText} />) : null}
            <Row className='my-2 d-flex justify-content-between'>
                {
                    products ? (
                        products.map((item, index) => <ProductCard favProd={favProd} key={index} item={item} />)
                    ) : null

                }

            </Row>
        </Container>
    )
}

export default CardProductsContainer
