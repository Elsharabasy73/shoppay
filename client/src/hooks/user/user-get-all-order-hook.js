import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from '../../store/actions/ordersAction';

const UserGetAllOrderHook = () => {

    const [loading, setLoading] = useState(true);
    const [results, setResult] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [orderData, setOrderData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let user = null, userName = ''
    try { user = JSON.parse(localStorage.getItem('user')) } catch { user = null }
    if (user != null) userName = user.name || ''

    const get = async () => {
        const token = localStorage.getItem("token")
        if (!token) { setLoading(false); return; }
        setLoading(true)
        await dispatch(getAllOrders(1, 5))
        setLoading(false)
    }

    useEffect(() => {
        get()
    }, [])

    const onPress = async (page) => {
        const token = localStorage.getItem("token")
        if (!token) return;
        setLoading(true)
        await dispatch(getAllOrders(page, 5))
        setLoading(false)
    }
    const resAllOrder = useSelector(state => state.orderReducer.getAllOrders)
    useEffect(() => {
        if (loading === false) {
            // res is either {results, data, paginationResult} or {data:{results,data}} or e.response
            const payload = resAllOrder?.data ? (resAllOrder.data.results !== undefined ? resAllOrder.data : resAllOrder) : resAllOrder
            if (payload?.results !== undefined) setResult(payload.results)
            if (payload?.paginationResult) setPaginate(payload.paginationResult)
            if (Array.isArray(payload?.data)) setOrderData(payload.data)
            else if (Array.isArray(payload)) setOrderData(payload)
            else if (payload?.data && Array.isArray(payload.data)) setOrderData(payload.data)
            else setOrderData([])
        }
    }, [loading])


    return [userName, results, paginate, orderData, onPress]
}

export default UserGetAllOrderHook