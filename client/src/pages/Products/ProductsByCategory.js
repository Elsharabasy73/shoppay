import React from 'react';
import Pagination from '../../components/common/Pagination';
import CardProductsContainer from './../../components/Products/CardProductsContainer';
import { useParams } from 'react-router-dom';
import ViewAllProductsCategoryHook from '../../hooks/products/view-all-products-category-hook';

const ProductsByCategory = () => {

    const { id } = useParams()


    const [items, pagination, onPress] = ViewAllProductsCategoryHook(id)
    if (pagination)
        var pageCount = pagination
    else
        pageCount = 0

    return (
        <div style={{ minHeight: '670px' }}>

            <div className="max-w-[1400px] mx-auto px-5">
                <div className='flex flex-row'>

                    <div className="sm:w-full">
                        <CardProductsContainer products={items} title="" btntitle="" />
                    </div>
                </div>

                <Pagination pageCount={pageCount} onPress={onPress} />
            </div>
        </div>
    )
}

export default ProductsByCategory
