import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

import AddToCartHook from '../../hooks/cart/add-to-cart-hook';

const ProductText = () => {
  const { id } = useParams();
  const [item, images, cat, brand] = ViewProductsDetalisHook(id);
  const [colorClick, indexColor, addToCartHandel] = AddToCartHook(id, item)

  const hasDiscount = item.priceAfterDiscount && item.priceAfterDiscount >= 1 && item.priceAfterDiscount < item.price
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="bg-[#F2F8FD] border border-[#DAEBF7] text-[#1A3F60] text-xs font-bold px-3 py-1 rounded-full">{cat.name || 'غير مصنف'}</span>
        <span className="bg-[#3F96D2] text-white text-xs font-bold px-3 py-1 rounded-full">{brand.name || 'ShopPay'}</span>
        <span className="ms-auto flex items-center gap-1 bg-[#FFF7CC] border border-[#FFD23F]/30 text-[#7A5A00] text-xs font-bold px-2.5 py-1 rounded-full">★ {item.ratingsAverage || 0} <span className="font-normal">({item.ratingsQuantity || 0})</span></span>
      </div>

      <h1 className="text-[#1A3F60] font-extrabold text-xl lg:text-2xl leading-tight tracking-tighter">{item.title}</h1>

      <div className="flex flex-wrap items-center gap-3">
        {(item.colors || item.availableColors) ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-bold">اللون:</span>
            {(item.colors || item.availableColors).map((color, index) => (
              <button
                key={index}
                onClick={() => colorClick(index, color)}
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{ backgroundColor: color, borderColor: indexColor === index ? '#1A3F60' : 'rgba(0,0,0,0.08)', boxShadow: indexColor === index ? '0 0 0 2px #DAEBF7' : 'none' }}
                aria-label={color}
              />
            ))}
          </div>
        ) : null}
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${item.quantity > 0 ? 'bg-[#E6F7EA] border-[#34C759]/20 text-[#0B7A2E]' : 'bg-[#FFEAEA] border-red-200 text-red-600'}`}>
          {item.quantity > 0 ? `متوفر: ${item.quantity} قطعة` : 'غير متوفر'}
        </span>
      </div>

      <div className="bg-[#F2F8FD] rounded-2xl border border-[#DAEBF7] p-4">
        <div className="text-xs font-bold text-[#1A3F60] mb-2">المواصفات</div>
        <p className="text-sm text-gray-700 leading-6 m-0">{item.description || 'لا يوجد وصف'}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
        <div className="flex flex-wrap items-baseline gap-2 bg-white border border-[#DAEBF7] rounded-2xl px-4 py-3 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
          {hasDiscount ? (
            <>
              <span className="text-gray-400 line-through text-sm">{item.price} جنيه</span>
              <span className="text-[#1A3F60] font-extrabold text-lg sm:text-xl">{item.priceAfterDiscount} <span className="text-sm">جنيه</span></span>
              <span className="bg-[#34C759] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">خصم {Math.round(((item.price - item.priceAfterDiscount)/item.price)*100)}%</span>
            </>
          ) : (
            <span className="text-[#1A3F60] font-extrabold text-lg sm:text-xl">{item.price} <span className="text-sm">جنيه</span></span>
          )}
        </div>
        <button onClick={addToCartHandel} className="w-full sm:flex-1 sm:min-w-[160px] bg-[#3F96D2] hover:bg-[#1A3F60] text-white font-bold rounded-full px-6 py-3.5 sm:py-3 transition shadow-md flex items-center justify-center gap-2 text-sm sm:text-base">
          <span>🛒</span> اضف للعربة
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProductText
