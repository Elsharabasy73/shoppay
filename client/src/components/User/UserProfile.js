import React, { useState } from 'react'
import ProfileHook from '../../hooks/user/profile-hook'
import deleteicon from '../../assets/images/delete.png'
import { ToastContainer } from 'react-toastify';
import TwModal from '../common/TwModal';

const UserProfile = () => {
    const [user, show, handleClose, handleShow, handelSubmit, name, email, phone, onChangeName, onChangeEmail, onChangePhone, changePassword, oldPassword, newPassword, confirmNewPassword, onChangeOldPass, onChangeNewPass, onChangeConfirmPass] = ProfileHook()


    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm">
            <h2 className="text-[#1A3F60] font-extrabold text-lg sm:text-xl mb-6 text-right pb-3 border-b border-slate-50">الصفحة الشخصية</h2>

            <TwModal show={show} onClose={handleClose} title="تعديل البيانات الشخصية"
                footer={
                    <div className="flex justify-end gap-2 w-full">
                        <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-300 font-bold font-[Almarai] border-none cursor-pointer text-sm" onClick={handleClose}>
                            تراجع
                        </button>
                        <button className="bg-[#3F96D2] text-white px-4 py-2 rounded-xl hover:bg-[#206EA9] font-bold font-[Almarai] border-none cursor-pointer text-sm" onClick={handelSubmit}>
                            حفظ التعديل
                        </button>
                    </div>
                }
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold text-xs text-right">اسم المستخدم</label>
                        <input
                            value={name}
                            onChange={onChangeName}
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                            placeholder="اسم المستخدم"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold text-xs text-right">الايميل</label>
                        <input
                            value={email}
                            onChange={onChangeEmail}
                            type="email"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                            placeholder="الايميل"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold text-xs text-right">الهاتف</label>
                        <input
                            value={phone}
                            onChange={onChangePhone}
                            type="phone"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                            placeholder="01026025804"
                        />
                    </div>
                </div>
            </TwModal>

            {/* Profile Info Card */}
            <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-5 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[#1A3F60] font-bold text-base m-0">بيانات الحساب</h3>
                    <button 
                        onClick={handleShow} 
                        className="flex items-center gap-1.5 text-[#3F96D2] hover:text-[#206EA9] font-bold text-sm bg-transparent border-none cursor-pointer p-0 transition-colors"
                    >
                        <img
                            alt="edit"
                            src={deleteicon} /* using deleteicon name but represents the edit button icon here */
                            className="w-3.5 h-3.5 object-contain"
                        />
                        <span>تعديل</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                        <div className="text-slate-400 text-xs font-bold mb-1">الاسم</div>
                        <div className="text-slate-700 font-bold text-sm">{user.name}</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-100">
                        <div className="text-slate-400 text-xs font-bold mb-1">رقم الهاتف</div>
                        <div className="text-slate-700 font-bold text-sm">{user.phone || "—"}</div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-slate-100 sm:col-span-2">
                        <div className="text-slate-400 text-xs font-bold mb-1">الايميل</div>
                        <div className="text-slate-700 font-bold text-sm">{user.email}</div>
                    </div>
                </div>
            </div>

            {/* Password Form */}
            <div className="pt-6 border-t border-slate-100">
                <h3 className="text-[#1A3F60] font-bold text-base mb-4 text-right">تغيير كلمة المرور</h3>
                
                <div className="flex flex-col gap-4 w-full sm:w-2/3">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold text-xs text-right">كلمة المرور القديمة</label>
                        <input
                            value={oldPassword}
                            onChange={onChangeOldPass}
                            type="password"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                            placeholder="أدخل كلمة المرور القديمة"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold text-xs text-right">كلمة المرور الجديدة</label>
                        <input
                            value={newPassword}
                            onChange={onChangeNewPass}
                            type="password"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                            placeholder="أدخل كلمة المرور الجديدة"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold text-xs text-right">تأكيد كلمة المرور الجديدة</label>
                        <input
                            value={confirmNewPassword}
                            onChange={onChangeConfirmPass}
                            type="password"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                            placeholder="تأكيد كلمة المرور الجديدة"
                        />
                    </div>
                    
                    <div className="flex justify-start pt-2">
                        <button 
                            onClick={changePassword} 
                            className="px-6 py-2.5 bg-[#3F96D2] hover:bg-[#206EA9] text-white font-bold rounded-xl transition duration-150 ease-in-out shadow-sm text-sm border-none cursor-pointer"
                        >
                            حفظ كلمة السر
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserProfile
