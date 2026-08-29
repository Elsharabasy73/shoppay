import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteCartHook from '../../hooks/cart/delete-cart-hook';
import { ToastContainer, toast } from 'react-toastify';
import ApplayCouponHook from '../../hooks/cart/apply-coupon-hook';
import notify from '../../utils/notify';

const CartCheckout = ({ totalCartPrice, cartItems, totalCartPriceAfterDiscount, couponNameRes }) => {

    const [handelDeleteCart] = DeleteCartHook()

    const [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout] = ApplayCouponHook(cartItems);

    useEffect(() => {
        if (couponNameRes) {
            onChangeCoupon(couponNameRes)
        }
    }, [couponNameRes])



    return (
        <div className="my-1 flex flex-wrap justify-center cart-checkout pt-3">
            <div className="w-full flex flex-col">
                <div className="flex">
                    <input
                        value={couponName}
                        onChange={(e) => onChangeCoupon(e.target.value)}
                        className="copon-input d-inline text-center "
                        placeholder="كود الخصم"
                    />
                    <button onClick={handelSubmitCoupon} className="copon-btn d-inline ">تطبيق</button>
                </div>
                <div className="product-price d-inline w-100 my-3  border">
                    {
                        totalCartPriceAfterDiscount >= 1 ?
                            `${totalCartPrice} جنيه ... بعد الخصم ${totalCartPriceAfterDiscount} ` :
                            `${totalCartPrice} جنيه`
                    }
                </div>

                <button className="product-cart-add  d-inline " onClick={handelCheckout}> اتمام الشراء</button>

                <button onClick={handelDeleteCart} className="product-cart-add w-100 px-2 my-1"> مسح العربة</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CartCheckout
