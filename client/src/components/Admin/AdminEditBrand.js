import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import EditBrandHook from '../../hooks/brand/edit-brand-hook'

const AdminEditBrand = () => {
  const { id } = useParams()
  const [img, name, onChangeName, onImageChange, handelSubmit] = EditBrandHook(id)
  const [btnLoading, setBtnLoading] = useState(false);
  const handleBtnWithLoading = async (e) => { setBtnLoading(true); try { await handelSubmit(e); } finally { setTimeout(() => setBtnLoading(false), 900); } };

  return (
    <div>
      <div className="flex flex-wrap justify-start ">
        <div className="admin-content-text pb-4">تعديل الماركة</div>
        <div className="w-full sm:w-2/3 px-2">
          <div className="text-form pb-2">صوره الماركة</div>
          <div>
            <label htmlFor="upload-photo">
              <img src={img} alt="brand" height="100px" width="120px" style={{ cursor: 'pointer' }} />
            </label>
            <input type="file" onChange={onImageChange} id="upload-photo" />
          </div>
          <input onChange={onChangeName} value={name} type="text" className="input-form d-block mt-3 px-3" placeholder="اسم الماركة" />
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

export default AdminEditBrand
