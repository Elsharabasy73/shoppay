import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../store/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../utils/notify'
import { addProductToCart } from './../../store/actions/cartAction';

const AddToCartHook = (prdID, item) => {

    const dispatch = useDispatch();

    const [indexColor, setIndexColor] = useState('')
    const [colorText, setColorText] = useState('')
    const [loading, setLoading] = useState(true)
    const colorClick = (index, color) => {
        setIndexColor(index)
        setColorText(color)
    }


    //add product to cart
    const addToCartHandel = async () => {
        const availableColors = item.colors || item.availableColors || []
        console.log(availableColors)
        if (availableColors.length >= 1) {
            if (colorText === "") {
                notify("من فضلك اختر لون اولا للمنتج", "warn")
                return
            }
        } else {
            setColorText('')
        }
        setLoading(true)
        await dispatch(addProductToCart({
            productId: prdID,
            color: colorText
        }))
        setLoading(false)
    }

    const res = useSelector(state => state.cartReducer.addToCart)

    useEffect(() => {

        if (loading === false) {
            if (res && res.status === 200) {
                notify("تمت اضافة المنتج للعربه بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                notify("قم بتسجيل الدخول اولا", "warn")
            }
        }
    }, [loading])

    return [colorClick, indexColor, addToCartHandel]

}

export default AddToCartHook