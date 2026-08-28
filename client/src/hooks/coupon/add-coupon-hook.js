import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, getAllCoupon } from '../../store/actions/couponAction';
import notify from '../../utils/notify';
import { validateCoupon, getErrorMessage } from '../../utils/validation';

const AddCouponHook = () => {
    const dispatch = useDispatch()
    const [coupnName, setCoupnName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)


    const onChangeName = (event) => {
        event.persist();
        setCoupnName(event.target.value)
    }

    const onChangeDate = (event) => {
        event.persist();
        setCouponDate(event.target.value)

    }
    const onChangeValue = (event) => {
        event.persist();
        setCouponValue(event.target.value)
    }

    const onSubmit = async () => {
        if (coupnName === "" || couponDate === "" || couponValue === "" || couponValue <= 0) {
            notify("من فضلك اكمل البيانات", "warn")
            return
        }
        const errMsg = validateCoupon({ name: coupnName, expire: couponDate, discount: couponValue });
        if (errMsg) {
            notify(errMsg, "warn")
            return
        }

        setLoading(true)
        await dispatch(addCoupon({
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.addCoupon)

    useEffect(() => {
        if (loading === false && res) {
            const status = res.status
            const msg = getErrorMessage(res) || ""
            const isSuccess = status === 201 || status === 200 || msg.toLowerCase().includes("success") || msg.includes("created")
            const isDuplicate = status === 400 || msg.toLowerCase().includes("duplicate") || msg.includes("موجود") || res.data?.errors?.[0]?.msg?.toLowerCase().includes("duplicate")
            const isAuth = status === 403 || status === 401
            if (isSuccess) {
                notify("تمت اضافة الكوبون بنجاح", "success")
                // only clear on success
                setCoupnName('')
                setCouponDate('')
                setCouponValue('')
                setTimeout(() => window.location.reload(), 800)
            } else if (isDuplicate) {
                notify("هذا الكوبون موجود من قبل ", "error")
                // keep inputs
            } else if (isAuth) {
                notify("انت غير مسموح لك بالاضافة", "error")
            } else if (res.data?.errors && Array.isArray(res.data.errors)) {
                res.data.errors.forEach(e => notify(e.msg, "error"))
            } else if (msg) {
                notify(msg, "error")
            } else {
                notify("هناك مشكله فى عملية الاضافة", "error")
            }
        }
    }, [loading])


    useEffect(() => {
        const get = async () => {
            await dispatch(getAllCoupon())
        }
        get();
    }, [])


    const allCoupon = useSelector(state => state.couponReducer.allCoupon)

    let coupons = []
    try {
        const data = allCoupon?.data?.data || allCoupon?.data || allCoupon
        if (Array.isArray(data) && data.length >= 1) coupons = data
        else if (Array.isArray(allCoupon?.data)) coupons = allCoupon.data
        else if (Array.isArray(allCoupon)) coupons = allCoupon
    } catch (e) { coupons = [] }

    return [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, coupons]
}

export default AddCouponHook
