import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CategoryHeader from '../../components/Category/CategoryHeader'
import CardProductsContainer from '../../components/Products/CardProductsContainer'
import Pagination from '../../components/common/Pagination'
import SearchCountResult from '../../components/common/SearchCountResult'
import SideFilter from '../../components/common/SideFilter'
import ViewSearchProductsHook from '../../hooks/products/view-search-products-hook';

const ShopProductsPage = () => {

    const [items, pagination, onPress, getProduct, results] = ViewSearchProductsHook();
    if (pagination)
        var pageCount = pagination;
    else
        pageCount = 0;

    return (
        <div style={{ minHeight: '670px' }}>
            <CategoryHeader />
            <Container>
                <SearchCountResult onClick={getProduct} title={`هناك ${results} نتيجة بحث`} />
                <Row className='d-flex flex-row'>
                    <Col sm="2" xs="2" md="1" className='d-flex'>
                        <SideFilter />
                    </Col>
                    <Col sm="10" xs="10" md="11">
                        <CardProductsContainer products={items} title="" btntitle="" />
                    </Col>
                </Row>
                <Pagination pageCount={pageCount} onPress={onPress} />
            </Container>
        </div>
    )
}

export default ShopProductsPage
