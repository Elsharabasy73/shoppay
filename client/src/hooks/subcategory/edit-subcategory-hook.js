import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../store/actions/categoryAction'
import { updateSubCategory, getOneSubCategory } from '../../store/actions/subcategoryAction'
import notify from '../../utils/notify'
import { validateSubCategory, getErrorMessage } from '../../utils/validation'

const EditSubCategoryHook = (id) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('0')
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    dispatch(getAllCategory(100))
    const get = async () => {
      setLoadingData(true)
      await dispatch(getOneSubCategory(id))
      setLoadingData(false)
    }
    if (id) get()
  }, [id])

  const category = useSelector(state => state.allCategory.category)
  const oneSub = useSelector(state => state.subCategory.subcategory)

  useEffect(() => {
    if (loadingData === false && oneSub?.data) {
      const data = oneSub.data
      setName(data.name || '')
      const cat = data.category?._id || data.category || '0'
      setCategoryId(cat)
    }
  }, [loadingData])

  const onChangeName = (e) => setName(e.target.value)
  const onChangeCategory = (e) => setCategoryId(e.target.value)

  const handelSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      notify('من فضلك ادخل اسم التصنيف', 'warn')
      return
    }
    if (categoryId === '0' || !categoryId) {
      notify('من فضلك اختر تصنيف رئيسي', 'warn')
      return
    }
    const errMsg = validateSubCategory({ name: name.trim(), category: categoryId }, true);
    if (errMsg) {
      notify(errMsg, 'warn')
      return
    }
    setLoading(true)
    await dispatch(updateSubCategory(id, { name: name.trim(), category: categoryId }))
    setLoading(false)
  }

  const res = useSelector(state => state.subCategory.updateSubcategory)
  useEffect(() => {
    if (loading === false && res) {
      if (res.status === 200 || res.status === 201) {
        notify('تم التعديل بنجاح', 'success')
      } else if (res.data?.errors && Array.isArray(res.data.errors)) {
        res.data.errors.forEach(err => notify(err.msg, 'error'))
      } else {
        const msg = getErrorMessage(res)
        notify(msg || 'هناك مشكله فى عملية التعديل', 'error')
      }
    }
  }, [loading])

  return [name, categoryId, category, onChangeName, onChangeCategory, handelSubmit]
}

export default EditSubCategoryHook
