import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hooks/products/view-product-details-hook';
const ProductGallery = () => {
    const { id } = useParams();
    const [item, images, cat, brand] = ViewProductsDetalisHook(id );

    
    return (
        <div className="product-gallary-card d-flex justify-content-center align-items-center p-2 sm:p-3 bg-[#F2F8FD] rounded-3xl border border-[#DAEBF7] overflow-hidden w-full max-w-full sm:aspect-square">
            <ImageGallery items={images}
                showFullscreenButton={false}
                isRTL={true}
                showPlayButton={false}
                showThumbnails={false}
                renderRightNav={RightButton}
                renderLeftNav={LeftButton}
            />
        </div>
    )
}

export default ProductGallery
