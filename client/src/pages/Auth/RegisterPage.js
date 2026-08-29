import React from 'react'
import { Link } from 'react-router-dom'
import RegisterHook from '../../hooks/auth/register-hook';
import { ToastContainer } from 'react-toastify';
const RegisterPage = () => {
  const [name, email, phone, password, confirmPassword, loading, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangeConfirmPassword, OnSubmit] = RegisterHook();

  return (
    <div className="max-w-[1400px] mx-auto px-5" style={{ minHeight: "680px" }}>
      <div className="py-5 flex justify-center hieght-search">
        <div className="sm:w-full flex flex-col px-2">
          <label className="mx-auto title-login">تسجيل حساب جديد</label>
          <input
            value={name}
            onChange={onChangeName}
            placeholder="اسم المستخدم..."
            type="text"
            className="user-input mt-3 text-center mx-auto"
          />
          <input
            value={email}
            onChange={onChangeEmail}
            placeholder="الايميل..."
            type="email"
            className="user-input my-3 text-center mx-auto"
          />
          <input
            value={phone}
            onChange={onChangePhone}
            placeholder="الهاتف..."
            type="phone"
            className="user-input  text-center mx-auto"
          />
          <input
            value={password}
            onChange={onChangePassword}
            placeholder="كلمه السر..."
            type="password"
            className="user-input text-center mt-3 mx-auto"
          />
          <input
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            placeholder="تاكيد كلمه السر..."
            type="password"
            className="user-input text-center mt-3 mx-auto"
          />
          <button onClick={OnSubmit} className="btn-login mx-auto mt-4">تسجيل الحساب</button>
          <label className="mx-auto my-4">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span style={{ cursor: "pointer" }} className="text-danger">
                اضغط هنا
              </span>
            </Link>
          </label>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default RegisterPage
