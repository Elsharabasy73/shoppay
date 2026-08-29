import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'

const ProductDetails = () => {
   
    return (
        <div>
            <Row className='py-2 g-4'>
                <Col lg="5">
                    <ProductGallery  />
                </Col>

                <Col lg="7">

                    <ProductText  />
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetails
