import React, { useEffect } from 'react'
import CategoryContainer from '../../components/Category/CategoryContainer'
import Pagination from '../../components/common/Pagination'
import AllCategoryHook from '../../hooks/category/all-category-page-hook'
const AllCategoryPage = () => {

    const [category, loading, pageCount, getPage] = AllCategoryHook();

    return (
        <div style={{ minHeight: '670px' }}>

            <CategoryContainer data={category.data} loading={loading} />
            {
                pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage} />) : null
            }

        </div>
    )
}

export default AllCategoryPage
