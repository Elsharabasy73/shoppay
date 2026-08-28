import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand, getAllBrand } from '../../store/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../utils/notify'
import avatar from '../../assets/images/avatar.png'

const AddBrandHook = () => {
 
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
            setImg(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }
    const res = useSelector(state => state.allBrand.brand)

    //save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();
        if (name === "" || selectedFile === null) {
            console.log('من فضلك اكمل البيانات')
            notify('من فضلك اكمل البيانات', "warn");
            return;
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", selectedFile)
        setLoading(true)
        setIsPress(true)
        await dispatch(createBrand(formData))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            setImg(avatar)
            setName("")
            setSelectedFile(null)
            console.log('تم الانتهاء')
            setLoading(true)
            setTimeout(() => setIsPress(false), 1000)

            if (res.status === 201) {
                notify('تمت عملية الاضافة بنجاح', "success");
                setTimeout(() => window.location.reload(false), 800)
            }
            else {
                notify('هناك مشكله فى عملية الاضافة', "error");
            }
        }
    }, [loading])

    useEffect(() => {
        const get = async () => {
            await dispatch(getAllBrand(100))
        }
        get();
    }, [])

    const allBrandState = useSelector(state => state.allBrand.brand)
    let brands = []
    try {
        const data = allBrandState?.data?.data || allBrandState?.data || allBrandState
        if (Array.isArray(data) && data.length >= 1) brands = data
        else if (Array.isArray(allBrandState?.data)) brands = allBrandState.data
        else if (Array.isArray(allBrandState)) brands = allBrandState
    } catch (e) { brands = [] }

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName, brands]
};

export default AddBrandHook
