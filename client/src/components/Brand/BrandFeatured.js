import React from 'react'
import { Container, Spinner, Row } from 'react-bootstrap'
import SubTitle from '../common/SubTitle'
import BrandCard from './BrandCard'
import brand1 from "../../assets/images/brand1.png";
import HomeBrandHook from '../../hooks/brand/home-brand-hook'

const BrandFeatured = ({ title, btntitle }) => {

    const [brand, loading] = HomeBrandHook();

    return (
        <Container>


            <SubTitle title={title} btntitle={btntitle} pathText="/allbrand" />
            <Row className='my-1 d-flex justify-content-between'>
                {
                    loading === false ? (
                        brand ? (
                            brand.data.slice(0, 5).map((item, index) => {
                                return (<BrandCard id={item._id} key={index} img={item.image} />)
                            })
                        ) : <h4>لا يوجد ماركات</h4>
                    ) : <Spinner animation="border" variant="primary" />
                }
            </Row>



        </Container>
    )
}

export default BrandFeatured
