import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createCategory, getAllCategory } from '../../store/actions/categoryAction'
import notify from '../../utils/notify'
import avatar from '../../assets/images/avatar.png'
import { validateCategoryName, getErrorMessage } from '../../utils/validation'

const AddCategoryHook = () => {
 
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar)
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    //to change name state
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value)
    }

    //when image change save it 
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            setImg(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }
    const res = useSelector(state => state.allCategory.category)

    //save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();
        if (name === "" || selectedFile === null) {
            console.log('من فضلك اكمل البيانات')
            notify('من فضلك اكمل البيانات', "warn");
            return;
        }
        const errMsg = validateCategoryName(name);
        if (errMsg) {
            notify(errMsg, "warn");
            return;
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", selectedFile)
        setLoading(true)
        setIsPress(true)
        await dispatch(createCategory(formData))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            if (res && res.status === 201) {
                notify('تمت عملية الاضافة بنجاح', "success");
                // only clear on success
                setImg(avatar)
                setName("")
                setSelectedFile(null)
                setTimeout(() => window.location.reload(false), 800)
            } else if (res) {
                const msg = getErrorMessage(res);
                if (res.data?.errors && Array.isArray(res.data.errors)) {
                    res.data.errors.forEach(e => notify(e.msg, "error"));
                } else if (msg) {
                    notify(msg, "error");
                } else {
                    notify('هناك مشكله فى عملية الاضافة', "error");
                }
            }
            setLoading(true)
            setTimeout(() => setIsPress(false), 1000)
        }
    }, [loading])

    useEffect(() => {
        const get = async () => {
            await dispatch(getAllCategory(100))
        }
        get();
    }, [])

    const allCategoryState = useSelector(state => state.allCategory.category)
    let categories = []
    try {
        const data = allCategoryState?.data?.data || allCategoryState?.data || allCategoryState
        if (Array.isArray(data) && data.length >= 1) categories = data
        else if (Array.isArray(allCategoryState?.data)) categories = allCategoryState.data
        else if (Array.isArray(allCategoryState)) categories = allCategoryState
    } catch (e) { categories = [] }

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName, categories]
};

export default AddCategoryHook
