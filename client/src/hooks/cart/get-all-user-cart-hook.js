import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../store/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../utils/notify'
import { getAllUserCartItems } from '../../store/actions/cartAction';

const GetAllUserCartHook = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemsNum, setItemsNum] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [couponNameRes, setCouponName] = useState('')
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartID, setCartID] = useState('0')
    const [totalCartPriceAfterDiscount, setTotalCartPriceAfterDiscount] = useState(0)

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(getAllUserCartItems())
            setLoading(false)
        }
        get()
    }, [])
    const res = useSelector(state => state.cartReducer.getAllUserCart)
    useEffect(() => {
        if (loading === false) {
            // server returns { results, data: cart } or e.response with error
            const cart = res?.data // useGetDataToken returns res.data -> { results, data }
            if (cart && (cart.cartItems || cart.products)) {
                const items = cart.cartItems || cart.products || []
                setItemsNum(items.length)
                setCartItems(items)
                setTotalCartPrice(cart.totalPrice || cart.totalCartPrice || 0)
                setCartID(cart._id || '0')
                setCouponName(cart.coupon || '')
                setTotalCartPriceAfterDiscount(cart.totalAfterDiscount || cart.totalPriceAfterDiscount || '')
            } else if (res && res.data && res.data.cartItems) {
                // fallback direct shape
                setItemsNum(res.data.cartItems.length)
                setCartItems(res.data.cartItems)
                setTotalCartPrice(res.data.totalPrice || 0)
                setCartID(res.data._id || '0')
                setCouponName(res.data.coupon || '')
                setTotalCartPriceAfterDiscount(res.data.totalAfterDiscount || '')
            } else {
                setCartID('0')
                setCouponName('')
                setTotalCartPriceAfterDiscount('')
                setItemsNum(0)
                setCartItems([])
                setTotalCartPrice(0)
            }

        }
    }, [loading])

    return [itemsNum, cartItems, totalCartPrice, couponNameRes, totalCartPriceAfterDiscount, cartID]
}

export default GetAllUserCartHook