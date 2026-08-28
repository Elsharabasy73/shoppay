import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import ProductCard from './../Products/ProductCard';
import Pagination from '../common/Pagination'
import CardProductsContainer from './../Products/CardProductsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWishList } from '../../store/actions/wishListAction';
const UserFavoriteProduct = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    useEffect(() => {
        const canUse = () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return false
                const u = JSON.parse(localStorage.getItem("user") || "null")
                return u && u.role === "user"
            } catch { return false }
        }
        if (!canUse()) {
            setLoading(false)
            return
        }
        const get = async () => {
            setLoading(true)
            await dispatch(getProductWishList())
            setLoading(false)
        }
        get()
    }, [])

    const res = useSelector(state => state.addToWishListReducer.allWishList)
    useEffect(() => {
        if (loading === false) {
            if (res)
                setItems(res.data)
        }
    }, [loading])

    return (
        <div>
            <div className="admin-content-text pb-4">قائمة المفضلة</div>
            <Row className='justify-content-start'>
                {
                    items.length <= 0 ? (<h6>لا يوجد منتدات مفضله حاليا</h6>) : <CardProductsContainer products={items} title="" btntitle="" />
                }

            </Row>
        </div>
    )
}

export default UserFavoriteProduct
