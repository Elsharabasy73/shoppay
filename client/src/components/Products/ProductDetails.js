import React from 'react'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'

const ProductDetails = () => {

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="w-full lg:w-5/12">
                <ProductGallery />
            </div>

            <div className="w-full lg:w-7/12">
                <ProductText />
            </div>
        </div>
    )
}

export default ProductDetails
