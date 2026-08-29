import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createUser } from '../../store/actions/adminUserAction'
import notify from '../../utils/notify'
import avatar from '../../assets/images/avatar.png'
import { validateUserCreate, getErrorMessage } from '../../utils/validation'

const AdminAddUserHook = () => {
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar)
    const [selectedFile, setSelectedFile] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [role, setRole] = useState('user')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    const onChangeName = (e) => setName(e.target.value)
    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePhone = (e) => setPhone(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)
    const onChangePasswordConfirm = (e) => setPasswordConfirm(e.target.value)
    const onChangeRole = (e) => setRole(e.target.value)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        const errMsg = validateUserCreate({ name, email, password, passwordConfirm, phone, role });
        if (errMsg) {
            notify(errMsg, "warn");
            return;
        }
        const formData = new FormData();
        formData.append("name", name.trim())
        formData.append("email", email.trim())
        formData.append("password", password)
        formData.append("passwordConfirm", passwordConfirm)
        if (phone) formData.append("phone", phone)
        if (role) formData.append("role", role)
        if (selectedFile) formData.append("profileImg", selectedFile)

        setLoading(true)
        setIsPress(true)
        await dispatch(createUser(formData))
        setLoading(false)
    }

    const res = useSelector(state => state.adminUsers.createUser)

    useEffect(() => {
        if (loading === false) {
            if (res && (res.status === 201 || res.status === 200)) {
                notify('تمت عملية الاضافة بنجاح', "success");
                setImg(avatar)
                setName("")
                setEmail("")
                setPhone("")
                setPassword("")
                setPasswordConfirm("")
                setRole("user")
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
            setTimeout(() => setIsPress(false), 1000)
            setLoading(true)
        }
    }, [loading])

    return [img, name, email, phone, password, passwordConfirm, role, loading, isPress, handelSubmit, onImageChange, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangePasswordConfirm, onChangeRole]
};

export default AdminAddUserHook
