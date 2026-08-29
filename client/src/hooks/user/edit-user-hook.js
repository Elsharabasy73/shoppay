import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOneUser, updateUser } from '../../store/actions/adminUserAction'
import notify from '../../utils/notify'
import avatar from '../../assets/images/avatar.png'
import { validateUserUpdate, getErrorMessage } from '../../utils/validation'

const AdminEditUserHook = (id) => {
  const dispatch = useDispatch()
  const [img, setImg] = useState(avatar)
  const [selectedFile, setSelectedFile] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('user')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const get = async () => {
      setLoadingData(true)
      await dispatch(getOneUser(id))
      setLoadingData(false)
    }
    if (id) get()
  }, [id])

  const oneUser = useSelector(state => state.adminUsers.oneUser)

  useEffect(() => {
    if (loadingData === false && oneUser?.data) {
      const data = oneUser.data
      setName(data.name || '')
      setEmail(data.email || '')
      setPhone(data.phone || '')
      setRole(data.role || 'user')
      if (data.profileImg) setImg(data.profileImg)
    }
  }, [loadingData])

  const onChangeName = (e) => setName(e.target.value)
  const onChangeEmail = (e) => setEmail(e.target.value)
  const onChangePhone = (e) => setPhone(e.target.value)
  const onChangeRole = (e) => setRole(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)
  const onChangePasswordConfirm = (e) => setPasswordConfirm(e.target.value)
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]))
      setSelectedFile(e.target.files[0])
    }
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    const errMsg = validateUserUpdate({ name, email, phone, role, password, passwordConfirm });
    if (errMsg) {
      notify(errMsg, 'warn')
      return
    }
    const formData = new FormData()
    if (name) formData.append('name', name.trim())
    if (email) formData.append('email', email.trim())
    if (phone) formData.append('phone', phone)
    if (role) formData.append('role', role)
    // only send password if admin intends to change it
    // backend updateUserValidator currently requires password, but we make it optional
    // if password is empty we do not send it, otherwise need passwordConfirm
    if (password) {
      formData.append('password', password)
      if (passwordConfirm) formData.append('passwordConfirm', passwordConfirm)
    }
    if (selectedFile) formData.append('profileImg', selectedFile)
    setLoading(true)
    await dispatch(updateUser(id, formData))
    setLoading(false)
  }

  const res = useSelector(state => state.adminUsers.updateUser)
  useEffect(() => {
    if (loading === false && res) {
      if (res.status === 200 || res.status === 201) {
        notify('تم التعديل بنجاح', 'success')
      } else if (res.data?.errors && Array.isArray(res.data.errors)) {
        res.data.errors.forEach(e => notify(e.msg, 'error'))
      } else {
        const msg = getErrorMessage(res)
        notify(msg || 'هناك مشكله فى عملية التعديل', 'error')
      }
    }
  }, [loading])

  return [img, name, email, phone, role, password, passwordConfirm, onChangeName, onChangeEmail, onChangePhone, onChangeRole, onChangePassword, onChangePasswordConfirm, onImageChange, handelSubmit]
}

export default AdminEditUserHook
