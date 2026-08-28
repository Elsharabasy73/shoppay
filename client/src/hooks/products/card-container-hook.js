import React, { useState, useEffect } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { getProductWishList } from './../../store/actions/wishListAction';


const CardContainerHook = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [favProd, setFavProd] = useState([])
    const res = useSelector(state => state.addToWishListReducer.allWishList)

    const canUseUserResources = () => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return false
            const u = JSON.parse(localStorage.getItem("user") || "null")
            return u && u.role === "user"
        } catch { return false }
    }

    useEffect(() => {
        if (!canUseUserResources()) {
            setLoading(false)
            setFavProd([])
            return
        }
        const get = async () => {
            setLoading(true)
            await dispatch(getProductWishList())
            setLoading(false)
        }

        get();
    }, [])


    useEffect(() => {

        if (loading === false) {
            if (res && res.data && Array.isArray(res.data) && res.data.length >= 1) {
                setFavProd(res.data.map(item => item._id))
            } else if (res && res.data && res.data.data && Array.isArray(res.data.data)) {
                // handle wrapped response shape {data: [...]}
                setFavProd(res.data.data.map(item => item._id))
            } else setFavProd([])
        }

    }, [loading])

    return [favProd]

}

export default CardContainerHook