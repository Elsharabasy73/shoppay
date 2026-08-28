import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, forgetPassword, loginUser } from '../../store/actions/authAction';
import { useNavigate } from 'react-router-dom'
import notify from '../../utils/notify';
import { createReview, deleteReviewOnProduct, updateReviewOnProduct } from './../../store/actions/reviewAction';
const EditRateHook = (review) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    const [newRateText, setNewRateText] = useState(review.comment || review.review);
    const [newRateValue, setNewRateValue] = useState(review.rating);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const onChangeRateText = (e) => {
        setNewRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setNewRateValue(val)
    }

    const handelEdit = async () => {
        setLoading(true)
        // backend updateReviewValidator requires product/user as MongoId, send them to pass validation
        const productId = review.product?._id || review.product || review.productId
        const userId = review.user?._id || review.user
        await dispatch(updateReviewOnProduct(review._id, {
            comment: newRateText,
            rating: newRateValue,
            product: productId,
            user: userId,
        }))
        setLoading(false)
        handleCloseEdit();
    }
    const res = useSelector(state => state.reviewReducer.updateReview)

    useEffect(() => {
        if (loading === false) {
            console.log(res)
            if (res.status && res.status === 200) {
                notify("تم تعديل التقييم بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            }
            else
                notify("هناك مشكله فى عملية التعديل", "error")
        }
    }, [loading])

    return [showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeRateText, newRateText, OnChangeRateValue, newRateValue]

}


export default EditRateHook