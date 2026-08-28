import React, { useEffect, useState } from 'react';
import { createSubCategory, getAllSubCategory } from '../../store/actions/subcategoryAction'
import { useSelector, useDispatch } from 'react-redux'
import notify from '../../utils/notify'
import { getAllCategory } from '../../store/actions/categoryAction'

const useAddSubcategory = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            notify("هناك مشكله فى الاتصال بالانترنت", "warn")
            return;
        }
        dispatch(getAllCategory(100));
        dispatch(getAllSubCategory(100));
    }, [])
    const [id, setID] = useState('0')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    //get last catgeory state from redux
    const category = useSelector(state => state.allCategory.category)


    //get last sub catgeory state from redux
    const subcategory = useSelector(state => state.subCategory.subcategory)

    //on change dropdown menu
    const handelChange = (e) => {
        console.log(e.target.value)
        setID(e.target.value)
    }

    //to save name
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    //on save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
            notify("هناك مشكله فى الاتصال بالانترنت", "warn")
            return;
        }
        if (id === "0") {
            notify("من فضلك اختر تصنيف رئيسي", "warn")
            return;
        }
        if (name === "") {
            notify("من فضلك ادخل اسم التصنيف", "warn")
            return;
        }

        setLoading(true)
        await dispatch(createSubCategory({
            name,
            category: id
        }))
        setLoading(false)

    }
    useEffect(() => {
        if (loading === false) {
            const isSuccess = subcategory?.status === 201 || subcategory?.status === 200
            const isDuplicate = typeof subcategory === 'string' && subcategory.includes("400") || subcategory?.status === 400 || subcategory?.data?.message?.includes("duplicate") || subcategory?.data?.errors?.[0]?.msg?.includes("duplicate")
            const msg = subcategory?.data?.message || subcategory?.message || ""
            if (isSuccess) {
                notify("تمت الاضافة بنجاح", "success")
                setTimeout(() => window.location.reload(false), 800)
            } else if (isDuplicate || msg.toLowerCase().includes("duplicate") || msg.includes("مكرر")) {
                notify("هذا الاسم مكرر من فضلك اختر اسم اخر", "warn")
            } else if (subcategory && (subcategory.status >= 400 || msg)) {
                notify(msg || "هناك مشكله فى عملية الاضافة", "warn")
            }
            setName("")
            setID("0")
            setLoading(true)
        }
    }, [loading])

    const allSubcategoryState = useSelector(state => state.subCategory.allSubcategory)
    let subcategories = []
    try {
        const data = allSubcategoryState?.data?.data || allSubcategoryState?.data || allSubcategoryState
        if (Array.isArray(data) && data.length >= 1) subcategories = data
        else if (Array.isArray(allSubcategoryState?.data)) subcategories = allSubcategoryState.data
        else if (Array.isArray(allSubcategoryState)) subcategories = allSubcategoryState
    } catch (e) { subcategories = [] }

    return [id, name, loading, category, subcategory, handelChange, handelSubmit, onChangeName, subcategories]
};

export default useAddSubcategory;
