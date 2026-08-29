import React from 'react'
import { ToastContainer } from 'react-toastify';
import ResetPasswordHook from '../../hooks/auth/reset-password-hook';
const ResetPasswordPage = () => {

    const [password, confirmPassword, , OnChangePassword, OnChangeConfirmPassword, onSubmit] = ResetPasswordHook()

    return (
        <div className="max-w-[1400px] mx-auto px-5" style={{ minHeight: "690px" }}>
            <div className="py-5 flex justify-center ">
                <div className="sm:w-full flex flex-col px-2">
                    <label className="mx-auto title-login">ادخل كلمه السر الجديده</label>
                    <input
                        value={password}
                        onChange={OnChangePassword}
                        placeholder="ادخل كلمه السر الجديدة"
                        type="password"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={confirmPassword}
                        onChange={OnChangeConfirmPassword}
                        placeholder="تاكيد كلمه السر الجديدة"
                        type="password"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">حفظ</button>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}


export default ResetPasswordPage
