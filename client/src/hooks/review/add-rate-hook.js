import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import notify from '../../utils/notify';
import { createReview } from './../../store/actions/reviewAction';
import { validateReview, getErrorMessage } from '../../utils/validation';

const AddRateHook = (id) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rateText, setRateText] = useState('')
    const [rateValue, setRateValue] = useState(0)

    const [loading, setLoading] = useState(true)


    const OnChangeRateText = (e) => {
        setRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setRateValue(val)
    }
    var user = ""
    if (localStorage.getItem("user") != null)
        user = JSON.parse(localStorage.getItem("user"))


    ///when save rate 
    const onSubmit = async () => {
        if (rateText === "") {
            notify("من فضلك اكتب تعليق", "error")
            return
        }
        const errMsg = validateReview({ comment: rateText, rating: rateValue });
        if (errMsg) {
            notify(errMsg, "warn")
            return
        }
        setLoading(true)
        await dispatch(createReview(id, {
            review: rateText,
            rating: rateValue
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.reviewReducer.createView)

    useEffect(() => {
        if (loading === false) {
            if (res) {
                console.log(res)
                if (res.status && res.status === 403) {
                    notify("غير مسموح للادمن بالتقييم", "error")
                } else if (res.data?.errors && res.data.errors[0]?.msg === "You already added review on this product") {
                    notify("لقد قمت باضافة تقييم لهذا المنتج مسبقا", "error")
                } else if (res.status && res.status === 201) {
                    notify("تمت اضافة التقييم بنجاح", "success")
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1000);
                } else if (res.data?.errors && Array.isArray(res.data.errors)) {
                    res.data.errors.forEach(e => notify(e.msg, "error"))
                } else {
                    const msg = getErrorMessage(res)
                    if (msg) notify(msg, "error")
                }
                // keep inputs on error
            }
        }
    }, [loading])

    return [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit]
}

export default AddRateHook