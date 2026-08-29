import React from 'react'
import HomeCategory from '../../components/Home/HomeCategory';
import CardProductsContainer from '../../components/Products/CardProductsContainer';
import NavBarLogin from '../../components/common/NavBarLogin';
import Slider from './../../components/Home/Slider';
import DiscountSection from './../../components/Home/DiscountSection';
import BrandFeatured from '../../components/Brand/BrandFeatured';
import Footer from '../../components/common/Footer';
import ViewHomeProductsHook from '../../hooks/products/view-home-products-hook';
import ViewHomeNewestHook from '../../hooks/products/view-home-newest-hook';
const HomePage = () => {

    const [soldItems] = ViewHomeProductsHook();
    const [newestItems] = ViewHomeNewestHook();
    return (
        <div className='font' style={{ minHeight: '670px' }}>

            <Slider />
            <HomeCategory />
            <CardProductsContainer products={soldItems} title="الاكثر مبيعا" btntitle="المزيد" pathText="/products" />
            <DiscountSection />
            <CardProductsContainer products={newestItems} title="احدث المنتجات" btntitle="المزيد" pathText="/products" />
            <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />

        </div>
    )
}

export default HomePage
