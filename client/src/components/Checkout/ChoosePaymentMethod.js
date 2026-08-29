import React, { useState } from 'react'
import ViewAddressesHook from '../../hooks/user/view-addresses-hook';
import OrderPayCashHook from '../../hooks/checkout/order-pay-cash-hook';
import { ToastContainer } from 'react-toastify';
import notify from '../../utils/notify';
import OrderPayCardHook from '../../hooks/checkout/order-pay-card-hook';
import GetAllUserCartHook from '../../hooks/cart/get-all-user-cart-hook';

const ChoosePaymentMethod = () => {

    const [res] = ViewAddressesHook()
    const [handelChooseAddress, addressDetalis, handelCreateOrderCash] = OrderPayCashHook()
    const [handelCreateOrderCARD] = OrderPayCardHook(addressDetalis)
    const [, , totalCartPrice, , totalCartPriceAfterDiscount,] = GetAllUserCartHook()

    const [type, setType] = useState('')
    const changeMathoud = (e) => {
        setType(e.target.value)
    }

    const handelPay = () => {
        if (type === "CARD") {
            console.log('order card')
            handelCreateOrderCARD()
        } else if (type === "CASH") {
            console.log('order cash')
            handelCreateOrderCash();
        } else {
            notify("من فضلك اختر طريقة دفع", "warn")
        }
    }

    return (
        <div>
            <div className="admin-content-text pt-5">اختر طريقة الدفع</div>
            <div className="user-address-card my-3 px-3">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full my-2">
                        <input
                            onChange={changeMathoud}
                            style={{ cursor: 'pointer' }}
                            name="group"
                            id="group1"
                            type="radio"
                            value="CARD"
                            className="mt-2"
                        />
                        <label style={{ cursor: 'pointer' }} className="mx-2" htmlFor="group1">
                            الدفع عن طريق البطاقه الائتمانية
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap mt-2">
                    <div className="w-full flex">
                        <input style={{ cursor: 'pointer' }}
                            onChange={changeMathoud}
                            name="group"
                            id="group2"
                            type="radio"
                            value="CASH"
                            className="mt-2"
                        />
                        <label style={{ cursor: 'pointer' }} className="mx-2" htmlFor="group2">
                            الدفع عند الاستلام
                        </label>
                    </div>
                </div>


                <div className="flex flex-wrap mt-2">
                    <div className="w-1/3 flex">
                        <select name="address" id="address" className="select mt-1 px-2 " onChange={handelChooseAddress} >
                            <option value="0">اختر عنوان للشحن</option>
                            {
                                res.data ? (res.data.map((item, index) => {
                                    return <option key={item._id} value={item._id}>{item.alias}</option>
                                })) : <option key={0} value={0}>لا يوجد عنوانين مسجلة</option>
                            }

                        </select>
                    </div>
                </div>



            </div>

            <div className="flex flex-wrap">
                <div className="w-full flex justify-end">
                    <div className="product-price d-inline   border">

                        {
                            totalCartPriceAfterDiscount >= 1 ?
                                `${totalCartPrice} جنيه ... بعد الخصم ${totalCartPriceAfterDiscount} ` :
                                `${totalCartPrice} جنيه`
                        }

                    </div>
                    <div onClick={handelPay} className="product-cart-add px-3 pt-2 d-inline me-2"> اتمام الشراء</div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ChoosePaymentMethod
