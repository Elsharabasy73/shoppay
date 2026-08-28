import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editCoupon, getOneCoupon } from '../../store/actions/couponAction';
import notify from '../../utils/notify';
import { validateCoupon, getErrorMessage } from '../../utils/validation';

const EditCouponHook = (id) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [coupnName, setCoupnName] = useState('')
    const [couponDate, setCouponDate] = useState('')
    const [couponValue, setCouponValue] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingData, setLoadingData] = useState(true)

    const oneCoupon = useSelector(state => state.couponReducer.oneCoupon)

    useEffect(() => {
        const get = async () => {
            setLoadingData(true)
            await dispatch(getOneCoupon(id))
            setLoadingData(false)
        }
        get();
    }, [])

    const formatDate = (dateString) => {
        const d = new Date(dateString)
        const year = d.getFullYear()
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }


    useEffect(() => {
        if (loadingData === false) {
            if (oneCoupon.data) {
                setCoupnName(oneCoupon.data.name)
                setCouponDate(formatDate(oneCoupon.data.expire))
                setCouponValue(oneCoupon.data.discount)
            }
        }
    }, [loadingData])



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
        const errMsg = validateCoupon({ name: coupnName, expire: couponDate, discount: couponValue }, true);
        if (errMsg) {
            notify(errMsg, "warn")
            return
        }
        setLoading(true)
        await dispatch(editCoupon(id, {
            name: coupnName,
            expire: couponDate,
            discount: couponValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.couponReducer.editCoupon)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت عملية التعديل بنجاح", "success")
                setTimeout(() => {
                    navigate('/admin/addcoupon')
                }, 1000);
            } else if (res) {
                if (res.data?.errors && Array.isArray(res.data.errors)) {
                    res.data.errors.forEach(e => notify(e.msg, "error"))
                } else {
                    const msg = getErrorMessage(res)
                    notify(msg || "فشل فى عملية التعديل", "error")
                }
                // keep inputs on error
            }

        }

    }, [loading])



    return [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit]
}


export default EditCouponHook
