import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOneCategory, updateCategory } from '../../store/actions/categoryAction'
import notify from '../../utils/notify'
import avatar from '../../assets/images/avatar.png'
import { validateCategoryName, getErrorMessage } from '../../utils/validation'

const EditCategoryHook = (id) => {
  const dispatch = useDispatch()
  const [img, setImg] = useState(avatar)
  const [name, setName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const get = async () => {
      setLoadingData(true)
      await dispatch(getOneCategory(id))
      setLoadingData(false)
    }
    if (id) get()
  }, [id])

  const oneCategory = useSelector(state => state.allCategory.oneCategory)

  useEffect(() => {
    if (loadingData === false && oneCategory?.data) {
      const data = oneCategory.data
      setName(data.name || '')
      if (data.image) setImg(data.image)
    }
  }, [loadingData])

  const onChangeName = (e) => setName(e.target.value)
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]))
      setSelectedFile(e.target.files[0])
    }
  }

  const handelSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      notify('من فضلك اكمل البيانات', 'warn')
      return
    }
    const errMsg = validateCategoryName(name.trim(), true);
    if (errMsg) {
      notify(errMsg, 'warn')
      return
    }
    const formData = new FormData()
    formData.append('name', name.trim())
    if (selectedFile) formData.append('image', selectedFile)
    setLoading(true)
    await dispatch(updateCategory(id, formData))
    setLoading(false)
  }

  const res = useSelector(state => state.allCategory.updateCategory)
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

  return [img, name, onChangeName, onImageChange, handelSubmit]
}

export default EditCategoryHook
