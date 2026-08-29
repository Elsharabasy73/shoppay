import React from 'react'
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';
import AddToCartHook from '../../hooks/cart/add-to-cart-hook';
import { ToastContainer } from 'react-toastify';

const ProductText = () => {
  const { id } = useParams();
  const [item, , cat, brand] = ViewProductsDetalisHook(id);
  const [colorClick, indexColor, addToCartHandel] = AddToCartHook(id, item);

  const hasDiscount = item.priceAfterDiscount && item.priceAfterDiscount >= 1 && item.priceAfterDiscount < item.price;
  const discountPercent = hasDiscount ? Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Category / Brand / Rating row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-sigma-blue-light border border-sigma-blue-lighter text-sigma-blue-dark text-xs font-bold px-3 py-1 rounded-full">
          {cat.name || 'غير مصنف'}
        </span>
        <span className="bg-sigma-blue text-white text-xs font-bold px-3 py-1 rounded-full">
          {brand.name || 'ShopPay'}
        </span>
        <span className="ms-auto flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
          ★ {item.ratingsAverage || 0}
          <span className="font-normal text-amber-500">({item.ratingsQuantity || 0})</span>
        </span>
      </div>

      {/* Title */}
      <h1 className="text-gray-900 font-extrabold text-xl sm:text-2xl leading-tight">
        {item.title}
      </h1>

      {/* Separator */}
      <div className="h-px bg-gray-200" />

      {/* Price section - Amazon style */}
      <div className="flex flex-col gap-2">
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              خصم {discountPercent}%
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-3 flex-wrap">
          {hasDiscount ? (
            <>
              <span className="text-gray-400 line-through text-sm">{item.price} جنيه</span>
              <span className="text-gray-900 font-extrabold text-2xl sm:text-3xl">{item.priceAfterDiscount} <span className="text-sm font-bold text-gray-500">جنيه</span></span>
            </>
          ) : (
            <span className="text-gray-900 font-extrabold text-2xl sm:text-3xl">{item.price} <span className="text-sm font-bold text-gray-500">جنيه</span></span>
          )}
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-gray-200" />

      {/* Colors */}
      {(item.colors && item.colors.length > 0) || (item.availableColors && item.availableColors.length > 0) ? (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-gray-700">اللون: <span className="font-normal text-gray-500">{indexColor !== undefined ? (item.colors || item.availableColors)[indexColor] : ''}</span></span>
          <div className="flex items-center gap-2 flex-wrap">
            {(item.colors || item.availableColors).map((color, index) => (
              <button
                key={index}
                onClick={() => colorClick(index, color)}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                  indexColor === index
                    ? 'border-sigma-blue-dark ring-2 ring-sigma-blue/30 scale-110'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
                aria-label={color}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Stock */}
      <div className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg text-sm font-bold ${
        item.quantity > 0
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-red-50 text-red-600 border border-red-200'
      }`}>
        <div className={`w-2 h-2 rounded-full ${item.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
        {item.quantity > 0 ? `متوفر: ${item.quantity} قطعة` : 'غير متوفر حالياً'}
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="text-sm font-bold text-gray-700 mb-2">المواصفات</div>
        <p className="text-sm text-gray-600 leading-7 m-0 whitespace-pre-wrap break-words">
          {item.description || 'لا يوجد وصف'}
        </p>
      </div>

      {/* Add to cart - full width on mobile */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-2">
        <div className="flex flex-wrap items-baseline gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
          {hasDiscount ? (
            <>
              <span className="text-gray-400 line-through text-sm">{item.price} جنيه</span>
              <span className="text-gray-900 font-extrabold text-xl sm:text-2xl">{item.priceAfterDiscount} <span className="text-sm text-gray-500">جنيه</span></span>
              <span className="bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">خصم {discountPercent}%</span>
            </>
          ) : (
            <span className="text-gray-900 font-extrabold text-xl sm:text-2xl">{item.price} <span className="text-sm text-gray-500">جنيه</span></span>
          )}
        </div>
        <button
          onClick={addToCartHandel}
          className="w-full sm:flex-1 sm:min-w-[180px] bg-sigma-blue hover:bg-sigma-blue-dark text-white font-bold rounded-full px-6 py-3.5 sm:py-3 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base active:scale-[0.98]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          اضف للعربة
        </button>
      </div>

      <ToastContainer />
    </div>
  )
}

export default ProductText
