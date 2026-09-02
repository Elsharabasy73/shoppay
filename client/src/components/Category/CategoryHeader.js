import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AllCategoryHook from '../../hooks/category/all-category-page-hook';

const CategoryHeader = () => {
  const [category, loading, pageCount, getPage] = AllCategoryHook()

  const [items, setItems] = useState([])
  useEffect(() => {
    if (category)
      setItems(category.data)

  }, [category])
  return (
    <div className="cat-header bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="flex items-center gap-2.5 py-3 overflow-x-auto scrollbar-hide scroll-smooth flex-nowrap">
          {items && items.length > 0 ? (
            items.map((item) => (
              <Link
                key={item._id}
                to={`/products/category/${item._id}`}
                className="cat-text-header shrink-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#F2F8FD] border border-[#DAEBF7] text-[#1A3F60] text-[13px] sm:text-sm font-bold no-underline whitespace-nowrap hover:bg-[#3F96D2] hover:text-white hover:border-[#3F96D2] hover:shadow-md hover:-translate-y-px transition-all duration-200"
              >
                {item.name}
              </Link>
            ))
          ) : loading ? (
            <>
              <div className="h-8 w-24 rounded-full bg-slate-100 animate-pulse shrink-0" />
              <div className="h-8 w-28 rounded-full bg-slate-100 animate-pulse shrink-0" />
              <div className="h-8 w-20 rounded-full bg-slate-100 animate-pulse shrink-0" />
            </>
          ) : null}
          <Link
            to="/allcategory"
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A3F60] text-white text-[13px] sm:text-sm font-bold no-underline whitespace-nowrap hover:bg-[#206EA9] hover:shadow-md hover:-translate-y-px transition-all duration-200"
          >
            المزيد
            <span aria-hidden="true" className="text-[11px]">›</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CategoryHeader
