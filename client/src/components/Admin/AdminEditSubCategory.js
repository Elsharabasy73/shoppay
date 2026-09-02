import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import EditSubCategoryHook from '../../hooks/subcategory/edit-subcategory-hook'

const AdminEditSubCategory = () => {
  const { id } = useParams()
  const [name, categoryId, category, onChangeName, onChangeCategory, handelSubmit] = EditSubCategoryHook(id)
  const [btnLoading, setBtnLoading] = useState(false);
  const handleBtnWithLoading = async (e) => { setBtnLoading(true); try { await handelSubmit(e); } finally { setTimeout(() => setBtnLoading(false), 900); } };

  return (
    <div>
      <div className="flex flex-wrap justify-start ">
        <div className="admin-content-text pb-4">تعديل التصنيف الفرعي</div>
        <div className="w-full sm:w-2/3 px-2">
          <input onChange={onChangeName} value={name} type="text" className="input-form d-block mt-3 px-3" placeholder="اسم التصنيف الفرعي" />
          <select value={categoryId} onChange={onChangeCategory} className="select input-form-area mt-3 px-2">
            <option value="0">التصنيف الرئيسي</option>
            {category && category.data ? category.data.map(item => <option key={item._id} value={item._id}>{item.name}</option>) : null}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-2/3 flex justify-end px-2">
          <button onClick={handleBtnWithLoading} disabled={btnLoading} className={`btn-save d-inline mt-2 ${btnLoading ? 'is-loading' : ''}`}>{btnLoading ? 'جاري الحفظ...' : 'حفظ التعديلات'}</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminEditSubCategory
