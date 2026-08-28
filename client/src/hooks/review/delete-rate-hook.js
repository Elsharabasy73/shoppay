import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, forgetPassword, loginUser } from '../../store/actions/authAction';
import { useNavigate } from 'react-router-dom'
import notify from '../../utils/notify';
import { createReview, deleteReviewOnProduct } from './../../store/actions/reviewAction';
const DeleteRateHook = (review) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isUser, setIsUser] = useState(false)
    const [loading, setLoading] = useState(true)

    const [showDelete, setShowDelete] = useState(false);
    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);

    let user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        try {
            if (review.user._id === user._id) {
                setIsUser(true);
            }
        } catch (e) { }
    }, [])


    const handelDelete = async () => {
        setLoading(true)
        await dispatch(deleteReviewOnProduct(review._id))
        setLoading(false)
        handleClose();
    }
    const res = useSelector(state => state.reviewReducer.deleteReview)

    useEffect(() => {
        if (loading === false) {
            const isSuccess = res === "" || res?.status === 204 || res?.status === 200 || res?.status === 201
            if (isSuccess) {
                notify("تم حذف التقييم بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            }
            else if (res?.data?.message) notify(res.data.message, "error")
            else if (res !== undefined) notify("هناك مشكله فى عملية المسح", "error")
        }
    }, [loading])

    return [isUser, handelDelete, handleShow, handleClose, showDelete]

}

export default DeleteRateHook