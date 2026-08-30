import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import rate from "../../assets/images/rate.png";
import ProductCardHook from '../../hooks/products/product-card-hook';

const ProductCard = ({ item, favProd }) => {
    const navigate = useNavigate()
    const [removeToWishListData, addToWishListData, handelFav, favImg] = ProductCardHook(item, favProd)

    const hasDiscount = item.priceAfterDiscount && item.priceAfterDiscount >= 1 && item.priceAfterDiscount < item.price;
    const handleCardClick = (e) => {
        // don't navigate when clicking fav button
        if (e.target.closest('[data-fav-btn]')) return
        navigate(`/products/${item._id || item.id}`)
        window.scrollTo(0,0)
    }

    return (
        <div className="flex flex-col h-full">
            <div
                onClick={handleCardClick}
                className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full cursor-pointer overflow-hidden"
            >
                {/* Image wrapper with fav button overlay */}
                <div className="relative h-48 sm:h-52 bg-slate-50/50 overflow-hidden shrink-0 flex items-center justify-center">
                    <Link to={`/products/${item._id || item.id}`} className="block w-full h-full p-4">
                        <img
                            src={item.imageCover}
                            alt={item.title}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>
                    
                    {/* fav button - absolute top-right */}
                    <button
                        data-fav-btn
                        onClick={(e) => { e.stopPropagation(); handelFav() }}
                        title={favImg && favImg.includes ? "" : "المفضلة"}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center border-none shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 z-10 cursor-pointer"
                    >
                        <img
                            src={favImg}
                            alt="fav"
                            className="h-5 w-5 object-contain"
                        />
                    </button>

                    {/* discount badge */}
                    {hasDiscount ? (
                        <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-full z-10 shadow-sm">
                            خصم {Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100)}%
                        </div>
                    ) : null}
                </div>

                <div className="flex flex-col justify-between p-4 flex-1 bg-white">
                    <div>
                        <Link to={`/products/${item._id || item.id}`} className="no-underline">
                            <div className="text-slate-700 font-bold text-xs sm:text-sm text-right line-clamp-2 h-10 leading-relaxed group-hover:text-[#206EA9] transition-colors">
                                {item.title}
                            </div>
                        </Link>
                        {item.category?.name ? (
                            <div className="text-[10px] sm:text-xs text-slate-400 text-right mt-1 truncate">
                                {item.category.name}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                            <img
                                src={rate}
                                alt="rate"
                                className="h-3.5 w-3.5 object-contain"
                            />
                            <div className="text-xs text-amber-500 font-bold leading-none">{item.ratingsAverage || 0}</div>
                            <span className="text-[10px] text-slate-400 leading-none">({item.ratingsQuantity || 0})</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            {hasDiscount ? (
                                <>
                                    <span className="line-through text-slate-400 text-[11px] sm:text-xs">{item.price}</span>
                                    <span className="text-sm sm:text-base font-extrabold text-[#1A3F60]">{item.priceAfterDiscount}</span>
                                </>
                            ) : (
                                <span className="text-sm sm:text-base font-extrabold text-[#1A3F60]">{item.price}</span>
                            )}
                            <span className="text-[10px] text-slate-500">جنيه</span>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProductCard
