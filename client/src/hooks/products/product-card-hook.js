import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToWishList, removeProductToWishList } from './../../store/actions/wishListAction';
import notify from '../../utils/notify';
import prod1 from "../../assets/images/prod1.png";
import favoff from "../../assets/images/fav-off.png";
import favon from "../../assets/images/fav-on.png";
const ProductCardHook = (item, favProd) => {
    const dispatch = useDispatch();
    const [favImg, setFavImg] = useState(favoff)
    const safeFavProd = Array.isArray(favProd) ? favProd : [];
    let Fav = safeFavProd.some(fitem => fitem === item._id);
    const [loadingAdd, setLoadingAdd] = useState(true)
    const [loadingRemove, setLoadingRemove] = useState(true)
    const [isFav, setIsFav] = useState(Fav)


    useEffect(() => {
        const list = Array.isArray(favProd) ? favProd : [];
        setIsFav(list.some(fitem => fitem === item._id))
    }, [favProd])

    const handelFav = () => {
        if (isFav) {
            removeToWishListData();
        } else {
            addToWishListData()
        }
    }

    useEffect(() => {

        if (isFav === true) {
            setFavImg(favon)
        }
        else {
            setFavImg(favoff)
        }

    }, [isFav])

    const resAdd = useSelector(state => state.addToWishListReducer.addWishList)
    const resRemove = useSelector(state => state.addToWishListReducer.removeWishList)

    const addToWishListData = async () => {
        setLoadingAdd(true)
        await dispatch(addProductToWishList({
            productId: item._id,
        }))
        setLoadingAdd(false)
    }

    const removeToWishListData = async () => {
        setLoadingRemove(true)
        await dispatch(removeProductToWishList(item._id))
        setLoadingRemove(false)
    }


    useEffect(() => {
        if (loadingAdd === false && resAdd) {
            const isSuccess = resAdd.status === 200 || resAdd.data?.message?.toLowerCase().includes("added") || resAdd.message?.includes("added")
            const isAuthError = resAdd.status === 401 || resAdd.status === 403 || resAdd.data?.message?.toLowerCase().includes("not") 
            if (isSuccess) {
                setIsFav(true); setFavImg(favon)
                notify("تمت اضافة المنتج للمفضلة بنجاح", "success")
            } else if (isAuthError || resAdd.data?.message) {
                notify("انتا غير مسجل", "error")
            } else if (resAdd.data?.errors) {
                notify(resAdd.data.errors[0].msg, "error")
            }
        }
    }, [loadingAdd])

    useEffect(() => {
        if (loadingRemove === false && resRemove) {
            const isSuccess = resRemove.status === 200 || resRemove.data?.message?.toLowerCase().includes("removed") || resRemove.message?.includes("removed") || resRemove.data?.data
            const isAuthError = resRemove.status === 401 || resRemove.status === 403
            if (isSuccess) {
                setIsFav(false); setFavImg(favoff)
                notify("تمت حذف المنتج من المفضلة بنجاح", "warn")
            } else if (isAuthError) {
                notify("انتا غير مسجل", "error")
            } else if (resRemove.data?.message) {
                notify(resRemove.data.message, "error")
            }
        }
    }, [loadingRemove])


    return [removeToWishListData, addToWishListData, handelFav, favImg]
}

export default ProductCardHook