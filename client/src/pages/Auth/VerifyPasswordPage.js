import React from 'react'
import { ToastContainer } from 'react-toastify';
import VerifyPasswordHook from '../../hooks/auth/verify-password-hook';
const VerifyPasswordPage = () => {

    const  [code, OnChangeCode, onSubmit] = VerifyPasswordHook()

    return (
        <div className="max-w-[1400px] mx-auto px-5" style={{ minHeight: "690px" }}>
            <div className="py-5 flex justify-center ">
                <div className="sm:w-full flex flex-col px-2">
                    <label className="mx-auto title-login">ادخل الكود المرسل فى الايميل</label>
                    <input
                        value={code}
                        onChange={OnChangeCode}
                        placeholder="ادخل الكود..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">تاكيد</button>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}
export default VerifyPasswordPage
