import React from 'react'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../../components/Category/CategoryHeader'
import CardProductsContainer from '../../components/Products/CardProductsContainer'
import ProductDetails from '../../components/Products/ProductDetails'
import RateContainer from '../../components/Rate/RateContainer'
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [item, , , , prod] = ViewProductsDetalisHook(id);
    let items = [];
    try {
        if (Array.isArray(prod) && prod.length) {
            const filtered = prod.filter(p => (p._id || p.id) !== id);
            items = (filtered.length ? filtered : prod).slice(0, 4);
        }
    } catch (e) { items = []; }

    const rateAvg = item ? item.ratingsAverage : 0;
    const rateQty = item ? item.ratingsQuantity : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <CategoryHeader />
            <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-20 py-3 sm:py-6">
                {/* Main product card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-5 lg:p-8 mb-4 sm:mb-6">
                    <ProductDetails />
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-5 lg:p-8 mb-4 sm:mb-6">
                    <RateContainer rateAvg={rateAvg} rateQty={rateQty} />
                </div>

                {/* Similar products */}
                {items.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-5 lg:p-8">
                        <CardProductsContainer products={items} title="منتجات قد تعجبك" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetailsPage
