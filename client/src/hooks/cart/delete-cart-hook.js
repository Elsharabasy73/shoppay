import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import notify from '../../utils/notify'
import { clearAllCartItem, deleteCartItem, updateCartItem } from './../../store/actions/cartAction';

const DeleteCartHook = (item) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [itemCount, setItemCount] = useState(0)

    const handelDeleteCart = async () => {
        setLoading(true)
        await dispatch(clearAllCartItem())
        setLoading(false)
    }
    const onChangeCount = (e) => {
        const val = parseInt(e.target.value, 10)
        setItemCount(isNaN(val) ? 0 : val)
    }
    useEffect(() => {
        if (item) setItemCount(item.quantity || item.count || 0)
    }, [item])
    const res = useSelector(state => state.cartReducer.clearCart)
    useEffect(() => {
        if (loading === false && res !== undefined) {
            // clearCart success is 204 with empty data or status 204
            const isSuccess = res === "" || res.status === 204 || res.status === 200 || (res.data === "" )
            if (isSuccess) {
                notify("تم الحذف بنجاح", "success")
                setTimeout(() => window.location.reload(), 800);
            } else if (res?.data?.message) {
                notify(res.data.message, "error")
            }
        }
    }, [loading])


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const dispatch = useDispatch();

    const handelDeleteItem = async () => {
        await dispatch(deleteCartItem(item._id))
        setShow(false);
        window.location.reload(false);
    }

    const handeleUpdateCart = async () => {
        await dispatch(updateCartItem(item._id, {
            quantity: itemCount
        }))

        window.location.reload(false);
    }

    return [handelDeleteCart, show, handleClose, handleShow, handelDeleteItem, itemCount, onChangeCount, handeleUpdateCart]

}

export default DeleteCartHook