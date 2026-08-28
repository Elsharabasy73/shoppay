import React, { useState, useEffect } from 'react'
import notify from '../../utils/notify';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '../../store/actions/authAction';
import { useNavigate } from 'react-router-dom'
const RegisterHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)

    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const validationValues = () => {
        if (name === "") {
            notify("من فضلك ادخل اسم المستخدم", "error")
            return false;
        }
        if (name.length < 3) {
            notify("اسم المستخدم قصير جدا", "error")
            return false;
        }
        if (email === "") {
            notify("من فضلك ادخل الايميل", "error")
            return false;
        }
        // basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            notify("من فضلك ادخل ايميل صحيح", "error")
            return false;
        }
        if (!phone || phone.length <= 10) {
            notify("من فضلك ادخل رقم هاتف صحيح", "error")
            return false;
        }
        if (!password) {
            notify("من فضلك ادخل كلمة السر", "error")
            return false;
        }
        if (password.length < 6) {
            notify("يجب ان لا تقل كلمه السر عن 6 احرف او ارقام", "error")
            return false;
        }
        if (!confirmPassword) {
            notify("من فضلك اكد كلمة السر", "error")
            return false;
        }
        if (password !== confirmPassword) {
            notify("من فضلك تاكيد من كلمه السر", "error")
            return false;
        }
        return true;
    }

    const res = useSelector(state => state.authReducer.createUser)

    //save data
    const OnSubmit = async () => {
        if (validationValues() === false) {
            return;
        }
        setLoading(true)
        await dispatch(createNewUser({
            name,
            email,
            password,
            passwordConfirm: confirmPassword,
            phone
        }))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            if (res) {
                console.log(res)
                // success: axios response has data.token
                if (res.data && res.data.token) {
                    localStorage.setItem("token", res.data.token)
                    notify("تم تسجيل الحساب بنجاح", "success")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000);
                    return;
                }

                // handle validation errors from server (express-validator)
                if (res.data && res.data.errors) {
                    const errors = res.data.errors;
                    errors.forEach(err => {
                        const msg = err.msg || "";
                        // map server messages to Arabic to keep UX consistent
                        // server sends "Password must be at least 6 characters"
                        if (msg.includes("Email already in use") || msg.includes("E-mail already in use")) {
                            notify("هذا الايميل مسجل من قبل", "error")
                        } else if (msg.toLowerCase().includes("at least 6") || msg.includes("must be at least 6")) {
                            notify("يجب ان لا تقل كلمه السر عن 6 احرف او ارقام", "error")
                        } else if (msg.includes("accept only egypt phone numbers")) {
                            notify("يجب ان يكون الرقم مصري مكون من 11 رقم", "error")
                        } else if (msg.includes("Passwords do not match")) {
                            notify("كلمة السر وتأكيدها غير متطابقين", "error")
                        } else {
                            notify(msg, "error")
                        }
                    })
                    return;
                }

                // fallback: handle non-validation error shapes
                if (res.data && res.data.message) {
                    notify(res.data.message, "error")
                } else if (res.status === 400 && res.data) {
                    // generic 400 without errors array
                    notify("بيانات غير صحيحة، راجع المدخلات", "error")
                }
            }
        }
    }, [loading])

    return [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit]
}

export default RegisterHook