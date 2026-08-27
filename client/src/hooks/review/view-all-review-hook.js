import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, forgetPassword, loginUser } from '../../store/actions/authAction';
import { useNavigate } from 'react-router-dom'
import notify from '../../utils/notify';
import { allReviewProduct, createReview } from './../../store/actions/reviewAction';

const ViewAllReviewHook = (id) => {
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(true)

    const allReview = useSelector((state) => state.reviewReducer.allReviewProduct)

    useEffect(() => {
        setLoading(true)
        dispatch(allReviewProduct(id, 1, 5))
        setLoading(false)
    }, [])

    const onPress = async (page) => {
        await dispatch(allReviewProduct(id, page, 5))
    }

    return [allReview, onPress]
}

export default ViewAllReviewHook