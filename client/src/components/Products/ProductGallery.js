import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';

const ProductGallery = () => {
    const { id } = useParams();
    const [item, images] = ViewProductsDetalisHook(id);
    const [selected, setSelected] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    useEffect(() => { setSelected(0); }, [id, images.length]);

    if (!images || !images.length) return null;
    const current = images[selected] || images[0];

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-3 w-full">
            {/* Thumbnails sidebar */}
            <div className="flex lg:flex-col gap-2 lg:w-[72px] shrink-0 overflow-x-auto lg:overflow-y-auto lg:max-h-[580px] scrollbar-hide pb-1 lg:pb-0">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        className={`relative w-[56px] h-[56px] lg:w-[68px] lg:h-[68px] shrink-0 rounded-xl overflow-hidden border-2 bg-white flex items-center justify-center p-1.5 transition-all duration-200 ${
                            selected === idx
                                ? 'border-sigma-blue-dark shadow-md ring-2 ring-sigma-blue/20'
                                : 'border-gray-200 hover:border-sigma-blue-lighter'
                        }`}
                    >
                        <img
                            src={img.thumbnail || img.original}
                            alt={`thumb ${idx}`}
                            className="w-full h-full object-contain"
                        />
                    </button>
                ))}
            </div>

            {/* Main image - double size */}
            <div
                className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center min-h-[340px] sm:min-h-[480px] lg:min-h-[580px] relative cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
            >
                <img
                    src={current.original}
                    alt={item.title || 'product'}
                    className="w-full h-full max-h-[420px] sm:max-h-[560px] lg:max-h-[680px] object-contain p-3 sm:p-5 transition-transform duration-300 ease-out"
                    style={isZoomed ? {
                        transform: 'scale(2)',
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    } : {}}
                />
                {!isZoomed && (
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        مرر للتكبير
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductGallery
