import React from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminEditUserHook from '../../hooks/user/edit-user-hook'

const AdminEditUser = () => {
  const { id } = useParams()
  const [img, name, email, phone, role, password, passwordConfirm, onChangeName, onChangeEmail, onChangePhone, onChangeRole, onChangePassword, onChangePasswordConfirm, onImageChange, handelSubmit] = AdminEditUserHook(id)

  return (
    <div>
      <div className="flex flex-wrap justify-start ">
        <div className="admin-content-text pb-4">تعديل المستخدم</div>
        <div className="w-full sm:w-2/3 px-2">
          <div className="text-form pb-2">صوره المستخدم</div>
          <div>
            <label htmlFor="upload-photo">
              <img src={img} alt="user" height="100px" width="120px" style={{ cursor: 'pointer', objectFit: "cover", borderRadius: "50%" }} />
            </label>
            <input type="file" onChange={onImageChange} id="upload-photo" />
          </div>
          <input onChange={onChangeName} value={name} type="text" className="input-form d-block mt-3 px-3" placeholder="اسم المستخدم" />
          <input onChange={onChangeEmail} value={email} type="email" className="input-form d-block mt-3 px-3" placeholder="البريد الالكتروني" />
          <input onChange={onChangePhone} value={phone} type="text" className="input-form d-block mt-3 px-3" placeholder="رقم الهاتف" />
          <select value={role} onChange={onChangeRole} className="select input-form-area mt-3 px-2">
            <option value="user">مستخدم</option>
            <option value="manager">مدير</option>
          </select>
          <div className="text-form mt-3">تغيير كلمة المرور (اختياري)</div>
          <input onChange={onChangePassword} value={password} type="password" className="input-form d-block mt-3 px-3" placeholder="كلمة المرور الجديدة" />
          <input onChange={onChangePasswordConfirm} value={passwordConfirm} type="password" className="input-form d-block mt-3 px-3" placeholder="تاكيد كلمة المرور" />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-2/3 flex justify-end px-2">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AdminEditUser
