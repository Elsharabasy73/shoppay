import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../../components/Category/CategoryHeader'
import CardProductsContainer from '../../components/Products/CardProductsContainer'
import ProductDetails from '../../components/Products/ProductDetails'
import RateContainer from '../../components/Rate/RateContainer'
import ViewHomeProductsHook from '../../hooks/products/view-home-products-hook';
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';
const ProductDetailsPage = () => {
    const { id } = useParams();
    const [item, images, cat, brand, prod] = ViewProductsDetalisHook(id);
    let items = []
    try {
        if (Array.isArray(prod) && prod.length) {
            const filtered = prod.filter(p => (p._id || p.id) !== id)
            items = (filtered.length ? filtered : prod).slice(0, 4)
        }
    } catch (e) { items = [] }
    try {
        if (item) {
            var rateAvg = item.ratingsAverage
            var rateQty = item.ratingsQuantity
        }
    } catch (e) { }
    return (
        <div style={{ minHeight: '670px' }} className="bg-[#F2F8FD]">
            <CategoryHeader />
            <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-20 py-4 sm:py-6">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-[#DAEBF7] p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                    <ProductDetails />
                </div>
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-[#DAEBF7] p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                    <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
                </div>
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-[#DAEBF7] p-3 sm:p-4 lg:p-6">
                    <CardProductsContainer products={items} title="منتجات قد تعجبك" />
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage
