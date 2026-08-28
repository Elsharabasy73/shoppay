import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOneBrand, updateBrand } from '../../store/actions/brandAction'
import notify from '../../utils/notify'
import avatar from '../../assets/images/avatar.png'
import { validateBrandName, getErrorMessage } from '../../utils/validation'

const EditBrandHook = (id) => {
  const dispatch = useDispatch()
  const [img, setImg] = useState(avatar)
  const [name, setName] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const get = async () => {
      setLoadingData(true)
      await dispatch(getOneBrand(id))
      setLoadingData(false)
    }
    if (id) get()
  }, [id])

  const oneBrand = useSelector(state => state.allBrand.oneBrand)

  useEffect(() => {
    if (loadingData === false && oneBrand?.data) {
      const data = oneBrand.data
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
    const errMsg = validateBrandName(name.trim(), true);
    if (errMsg) {
      notify(errMsg, 'warn')
      return
    }
    const formData = new FormData()
    formData.append('name', name.trim())
    if (selectedFile) formData.append('image', selectedFile)
    setLoading(true)
    await dispatch(updateBrand(id, formData))
    setLoading(false)
  }

  const res = useSelector(state => state.allBrand.updateBrand)
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
      // keep inputs on error - do not reset
    }
  }, [loading])

  return [img, name, onChangeName, onImageChange, handelSubmit]
}

export default EditBrandHook
