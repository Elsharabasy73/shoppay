import React from 'react'
import { Link } from 'react-router-dom'
import LoginHook from '../../hooks/auth/login-hook';
import { ToastContainer } from 'react-toastify';
import TwSpinner from '../../components/common/TwSpinner';

const LoginPage = () => {
    const [email, password, loading, onChangeEmail, onChangePassword, onSubmit, isPress] = LoginHook();
    return (
        <div className="max-w-[1400px] mx-auto px-5" style={{ minHeight: "690px" }}>
            <div className="py-5 flex justify-center ">
                <div className="sm:w-full flex flex-col px-2">
                    <label className="mx-auto title-login">تسجيل الدخول</label>
                    <input
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="الايميل..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />
                    <input
                        value={password}
                        onChange={onChangePassword}
                        placeholder="كلمه السر..."
                        type="password"
                        className="user-input text-center mx-auto"
                    />
                    <button onClick={onSubmit} className="btn-login mx-auto mt-4">تسجيل الدخول</button>
                    <label className="mx-auto my-4">
                        ليس لديك حساب ؟{" "}
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <span style={{ cursor: "pointer" }} className="text-danger">
                                اضغط هنا
                            </span>
                        </Link>
                    </label>


                    <label className="mx-auto my-4">

                        <Link to="/user/forget-password" style={{ textDecoration: 'none', color: 'red' }}>
                            هل نسيت كلمه السر
                        </Link>
                    </label>

                    {isPress === true ? (loading === true ? (<TwSpinner />) : null) : null}


                </div>



            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginPage
