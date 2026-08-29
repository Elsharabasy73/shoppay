import React from 'react'
import CartCheckout from '../../components/Cart/CartCheckout'
import CartItem from '../../components/Cart/CartItem'
import GetAllUserCartHook from '../../hooks/cart/get-all-user-cart-hook';

const CartPage = () => {
    const [itemsNum, cartItems, totalCartPrice, couponNameRes, totalCartPriceAfterDiscount] = GetAllUserCartHook()

    return (
        <div className="max-w-[1400px] mx-auto px-5" style={{ minHeight: '670px' }}>
            <div>
                <div className='cart-title mt-4'>عربة التسوق</div>
            </div>
            <div className='flex flex-wrap justify-center'>
                <div className="w-full md:w-9/12 px-2">
                    {
                        cartItems.length >= 1 ? (cartItems.map((item, index) => {
                            return (<CartItem key={index} item={item} />)
                        })) : <h6>لا يوجد منتجات فى العربة</h6>
                    }

                </div>

                <div className="w-1/2 md:w-3/12 px-2">
                    <CartCheckout cartItems={cartItems} couponNameRes={couponNameRes} totalCartPriceAfterDiscount={totalCartPriceAfterDiscount} totalCartPrice={totalCartPrice} />
                </div>
            </div>
        </div >
    )
}

export default CartPage
