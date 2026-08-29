import React from 'react'
import { ToastContainer } from 'react-toastify';
import ForgetPasswordHook from '../../hooks/auth/forget-password-hook';
const ForgetPasswordPage = () => {
    const [OnChangeEmail, email, onSubmit] = ForgetPasswordHook()
    return (
        <div className="max-w-[1400px] mx-auto px-5" style={{ minHeight: "690px" }}>
            <div className="py-5 flex justify-center ">
                <div className="sm:w-full flex flex-col px-2">
                    <label className="mx-auto title-login">نسيت كلمة السر</label>
                    <input
                        value={email}
                        onChange={OnChangeEmail}
                        placeholder="ادخل الايميل..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} className="btn-login mx-auto mt-2">ارسال الكود</button>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgetPasswordPage
