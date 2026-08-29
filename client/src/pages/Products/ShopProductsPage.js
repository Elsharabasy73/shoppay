import React, { useState } from 'react'
import CategoryHeader from '../../components/Category/CategoryHeader'
import CardProductsContainer from '../../components/Products/CardProductsContainer'
import Pagination from '../../components/common/Pagination'
import SearchCountResult from '../../components/common/SearchCountResult'
import SideFilter from '../../components/common/SideFilter'
import ViewSearchProductsHook from '../../hooks/products/view-search-products-hook';

const ShopProductsPage = () => {
    const [items, pagination, onPress, getProduct, results] = ViewSearchProductsHook();
    const [filterOpen, setFilterOpen] = useState(false);
    const pageCount = pagination || 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <CategoryHeader />
            <div className="max-w-[1400px] mx-auto px-3 sm:px-5">
                {/* Top bar: results + mobile filter button + sort */}
                <div className="flex items-center justify-between py-3 gap-3">
                    <div className="text-sm font-bold text-gray-700">
                        {results} نتيجة بحث
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setFilterOpen(true)}
                            className="lg:hidden flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold px-3 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            تصفية
                        </button>
                        <SearchCountResult onClick={getProduct} title="" />
                    </div>
                </div>

                {/* Content area */}
                <div className="flex flex-row gap-4">
                    {/* Desktop sidebar */}
                    <div className="hidden lg:block w-[220px] shrink-0">
                        <SideFilter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
                    </div>

                    {/* Mobile filter drawer */}
                    <div className="lg:hidden">
                        <SideFilter isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
                    </div>

                    {/* Products grid */}
                    <div className="flex-1 min-w-0">
                        <CardProductsContainer products={items} title="" btntitle="" />
                    </div>
                </div>

                <div className="py-4">
                    <Pagination pageCount={pageCount} onPress={onPress} />
                </div>
            </div>
        </div>
    )
}

export default ShopProductsPage
