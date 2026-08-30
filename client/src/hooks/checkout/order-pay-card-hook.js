import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { createOrderCARD, createOrderCash } from '../../store/actions/checkoutAction';
import { getOneUserAddress } from '../../store/actions/userAddressesAction';
import notify from '../../utils/notify';
import GetAllUserCartHook from './../cart/get-all-user-cart-hook';


const OrderPayCardHook = (addressDetalis) => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, , , , , cartID] = GetAllUserCartHook()

    //when user click
    const handelCreateOrderCARD = async () => {
        if (cartID === '0') {
            notify("من فضلك اضف منتجات الى العربه اولا", "warn")
            return
        }
        if (addressDetalis.length <= 0) {
            notify("من فضلك اختر عنوان اولا", "warn")
            return
        }
        setLoading(true)
        await dispatch(createOrderCARD(cartID))
        setLoading(false)
    }



    //get response for create order card
    const resOrderCard = useSelector(state => state.checkoutReducer.createOrderCard)
    useEffect(() => {
        if (loading === false) {
            // server returns 200 { message: "Checkout session created successfully", data: session } via useGetDataToken -> payload = { message, data: session }
            // handle all shapes: payload.data.url or payload.session.url
            const session = resOrderCard?.data || resOrderCard?.session || resOrderCard?.data?.session
            const url = session?.url || resOrderCard?.data?.url || resOrderCard?.session?.url
            const isSuccess = !!(url || resOrderCard?.status === 200 || resOrderCard?.status === "success" || resOrderCard?.message?.includes("Checkout"))
            if (isSuccess && url) {
                window.open(url, "_blank")
            } else if (isSuccess && !url) {
                // session created but url missing (edge)
                notify("تم انشاء جلسة الدفع بنجاح", "success")
            } else {
                // keep error details if available
                const msg = resOrderCard?.data?.message || resOrderCard?.message
                if (resOrderCard?.status === 404 || msg?.includes("Cart not found")) {
                    notify("العربة غير موجودة", "error")
                } else {
                    notify("فشل فى اكمال الطلب من فضلك حاول مره اخرى", "warn")
                }
            }
        }
    }, [loading])


    return [handelCreateOrderCARD]


}

export default OrderPayCardHook