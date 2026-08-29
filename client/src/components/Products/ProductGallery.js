import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';
const ProductGallery = () => {
    const { id } = useParams();
    const [item, images] = ViewProductsDetalisHook(id);
    const [selected, setSelected] = useState(0);

    useEffect(() => { setSelected(0); }, [id, images.length]);

    if (!images || !images.length) return null;
    const current = images[selected] || images[0];

    return (
        <div className="product-gallary-card bg-[#F2F8FD] rounded-3xl border border-[#DAEBF7] overflow-hidden p-2 sm:p-3 w-full">
            {/* Thumbnails before big image (left on desktop, below on mobile) */}
            <div className="flex flex-col-reverse sm:flex-row gap-3">
                {/* Thumbnails list - before big image in DOM */}
                <div className="flex sm:flex-col gap-2 sm:w-[56px] sm:shrink-0 overflow-x-auto sm:overflow-visible scrollbar-hide">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelected(idx)}
                            onMouseEnter={() => setSelected(idx)}
                            className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] shrink-0 rounded-xl overflow-hidden border-2 bg-white flex items-center justify-center p-1 transition ${selected === idx ? 'border-[#1A3F60] shadow-md' : 'border-transparent hover:border-[#DAEBF7]'}`}
                        >
                            <img src={img.thumbnail || img.original} alt={`thumb ${idx}`} className="w-full h-full object-contain" />
                        </button>
                    ))}
                </div>
                {/* Main image */}
                <div className="flex-1 bg-white rounded-2xl border border-[#DAEBF7] overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[390px] relative group">
                    <img src={current.original} alt={item.title || 'product'} className="w-full h-full max-h-[380px] sm:max-h-[440px] object-contain p-3 sm:p-4 transition" />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition">Hover to zoom</div>
                </div>
            </div>
        </div>
    )
}

export default ProductGallery
