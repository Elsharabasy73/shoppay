import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { deleteCoupon } from '../../store/actions/couponAction';

const CouponCardHook = (coupon) => {
    const dispatch = useDispatch()
    const dateString = coupon?.expire;
    const formatDate = (d) => {
        if (!d) return ""
        try {
            const options = { year: "numeric", month: "numeric", day: "numeric" }
            const dt = new Date(d)
            if (isNaN(dt.getTime())) return d
            return dt.toLocaleDateString(undefined, options)
        } catch { return d || "" }
    }


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const dispatch = useDispatch();

    const handelDelete = async () => {

        await dispatch(deleteCoupon(coupon._id))
        setShow(false);
        window.location.reload(false);
    }


    return [formatDate, dateString, show, handleClose, handleShow, handelDelete]
}

export default CouponCardHook