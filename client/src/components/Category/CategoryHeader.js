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
    <div className="cat-header">
      <div className="max-w-[1400px] mx-auto px-5">
        <div className="flex flex-wrap">
          <div className="flex justify-start py-2 flex-wrap">

            {
              items ? (items.map((item, index) => {
                return (<Link to={`/products/category/${item._id}`} style={{ textDecoration: 'none' }}>
                  <div key={index} className="cat-text-header ">{item.name}</div>
                </Link>
                )
              })) : null
            }
            <Link to="/allcategory" style={{ textDecoration: 'none' }}>
              <div className="cat-text-header">المزيد</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryHeader
