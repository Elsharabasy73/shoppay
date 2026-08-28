import { useState, useEffect } from 'react'
import notify from '../../utils/notify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/authAction';
import { useNavigate } from 'react-router-dom'

const LoginHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const validation = () => {
        if (!email) { notify("من فضلك ادخل الايميل", "error"); return false }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { notify("من فضلك ادخل ايميل صحيح", "error"); return false }
        if (!password) { notify("من فضلك ادخل كلمة السر", "error"); return false }
        if (password.length < 6) { notify("كلمة السر قصيرة جدا", "error"); return false }
        return true
    }

    const onSubmit = async () => {
        if (!validation()) return;
        setIsPress(true)
        setLoading(true)
        await dispatch(loginUser({
            email,
            password
        }))
        setLoading(false)
    }
    const res = useSelector(state => state.authReducer.loginUser)
    useEffect(() => {
        if (loading === false && res) {
            // success: res.data.token
            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.data))
                notify("تم تسجيل الدخول بنجاح", "success")
                setTimeout(() => {
                    navigate("/", { replace: true })
                    window.location.reload()
                }, 1200);
                return;
            }
            // validation errors from express-validator
            if (res.data && res.data.errors) {
                res.data.errors.forEach(err => notify(err.msg, "error"))
                return;
            }
            // invalid credentials – server sends 401 { message: "Invalid email or password" }
            const msg = res.data?.message || res.message || ""
            if (msg.toLowerCase().includes("invalid") || msg.includes("Incorrect") || res.status === 401) {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                notify("كلمة السر او الايميل خطا", "error")
                return;
            }
            if (msg) notify(msg, "error")
        }
    }, [loading])

    return [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress]
}

export default LoginHook