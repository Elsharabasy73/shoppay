import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserAddress } from '../../store/actions/userAddressesAction';
import notify from '../../utils/notify';
import { useNavigate } from 'react-router-dom';
import { validateAddress, getErrorMessage } from '../../utils/validation';

const AddAddressHook = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [alias, setAlias] = useState('')
    const [detalis, setDetalis] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(true)


    const onChangeAlias = (event) => {
        event.persist();
        setAlias(event.target.value)
    }

    const onChangeDetalis = (event) => {
        event.persist();
        setDetalis(event.target.value)

    }

    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value)

    }
    const onSubmit = async () => {
        if (alias === "" || detalis === "" || phone === "") {
            notify("من فضلك اكمل البيانات", "warn")
            return
        }
        const errMsg = validateAddress({ alias, details: detalis, phone });
        if (errMsg) {
            notify(errMsg, "warn")
            return
        }
        setLoading(true)
        await dispatch(addUserAddress({
            alias: alias,
            details: detalis,
            phone: phone,
        }))
        setLoading(false)
    }
    const res = useSelector(state => state.userAddressesReducer.addUserAddress)

    useEffect(() => {

        if (loading === false) {
            if (res && (res.status === 200 || res.status === 201)) {
                notify("تمت اضافة العنوان بنجاح", "success")
                setTimeout(() => {
                    navigate('/user/addresses')
                }, 1000);
            } else if (res) {
                if (res.data?.errors && Array.isArray(res.data.errors)) {
                    res.data.errors.forEach(e => notify(e.msg, "error"))
                } else {
                    const msg = getErrorMessage(res)
                    notify(msg || "هناك مشكله فى عملية الاضافة ", "error")
                }
                // keep inputs on error
            }

        }

    }, [loading])



    return [alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone, onSubmit]
}

export default AddAddressHook