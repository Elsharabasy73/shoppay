import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import notify from '../../utils/notify'
import { applayCoupnCart } from '../../store/actions/cartAction';
import { useNavigate } from 'react-router-dom'

const ApplayCouponHook = (cartItems) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [couponName, setCouponName] = useState('')
    const [loading, setLoading] = useState(true)

    const onChangeCoupon = (val) => {
        // supports both event and direct string from CartCheckout
        if (typeof val === 'string') setCouponName(val)
        else setCouponName(val.target ? val.target.value : val)
    }

    const handelSubmitCoupon = async () => {
        if (!couponName || couponName.trim() === "") {
            notify("من فضلك ادخل الكوبون", "warn")
            return
        }
        setLoading(true)
        await dispatch(applayCoupnCart({
            coupon: couponName.trim()
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.cartReducer.applayCoupon)

    useEffect(() => {
        if (loading === false && res) {
            // useInsUpdateData returns axios response; success has data.message
            const isSuccess = res.status === 200 || res.data?.message?.toLowerCase().includes("coupon applied") || res.message?.includes("Coupon")
            if (isSuccess || (res.data && res.data.data && res.data.data.totalAfterDiscount !== undefined)) {
                notify("تم تطبيق الكوبون بنجاح", "success")
                setTimeout(() => window.location.reload(), 900);
            } else {
                const msg = res.data?.message || res.data?.errors?.[0]?.msg || "هذا الكوبون غير صحيح او منتهى الصلاحيه"
                notify(msg, "warn")
            }
        }
    }, [loading])

    const handelCheckout = () => {
        if (cartItems && cartItems.length >= 1) {
            navigate('/order/paymethoud')
        }
        else {
            notify("من فضلك اضف منتجات للعربة اولا", "warn")
        }
    }

    return [couponName, onChangeCoupon, handelSubmitCoupon, handelCheckout]

}

export default ApplayCouponHook