import React, { useState } from 'react'
import ProfileHook from '../../hooks/user/profile-hook'
import deleteicon from '../../assets/images/delete.png'
import { ToastContainer } from 'react-toastify';
import TwModal from '../common/TwModal';

const UserProfile = () => {
    const [user, show, handleClose, handleShow, handelSubmit, name, email, phone, onChangeName, onChangeEmail, onChangePhone, changePassword, oldPassword, newPassword, confirmNewPassword, onChangeOldPass, onChangeNewPass, onChangeConfirmPass] = ProfileHook()


    return (
        <div>
            <div className="admin-content-text">الصفحه الشخصية</div>

            <TwModal show={show} onClose={handleClose} title="تعديل البيانات الشخصية"
                footer={<>
                    <button className='font bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]' onClick={handleClose}>
                        تراجع
                    </button>
                    <button className='font bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]' onClick={handelSubmit}>
                        حفظ التعديل
                    </button>
                </>}>
                <input
                    value={name}
                    onChange={onChangeName}
                    type="text"
                    className="input-form font d-block mt-3 px-3"
                    placeholder="اسم المستخدم"
                />
                <input
                    value={email}
                    onChange={onChangeEmail}
                    type="email"
                    className="input-form font d-block mt-3 px-3"
                    placeholder="الايميل"
                />
                <input
                    value={phone}
                    onChange={onChangePhone}
                    type="phone"
                    className="input-form font d-block mt-3 px-3"
                    placeholder="الهاتف"
                />
            </TwModal>

            <div className="user-address-card my-3 px-2">
                <div className="flex flex-wrap justify-between pt-2">
                    <div className="w-1/2 flex px-2">
                        <div className="p-2">الاسم:</div>
                        <div className="p-1 item-delete-edit">{user.name}</div>
                    </div>
                    <div className="w-1/2 flex justify-end px-2">
                        <div onClick={handleShow} className="flex mx-2">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> تعديل</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap ">
                    <div className="w-full flex px-2">
                        <div className="p-2">رقم الهاتف:</div>
                        <div className="p-1 item-delete-edit">{user.phone}</div>
                    </div>
                </div>
                <div className="flex flex-wrap ">
                    <div className="w-full flex px-2">
                        <div className="p-2">الايميل:</div>
                        <div className="p-1 item-delete-edit">{user.email}</div>
                    </div>
                </div>
                <div className="flex flex-wrap mt-5">
                    <div className="w-5/6 sm:w-2/3 md:w-1/2 px-2">
                        <div className="admin-content-text">تغير كملة المرور</div>
                        <input
                            value={oldPassword}
                            onChange={onChangeOldPass}
                            type="password"
                            className="input-form d-block mt-1 px-3"
                            placeholder="ادخل كلمة المرور القديمة"
                        />
                        <input
                            value={newPassword}
                            onChange={onChangeNewPass}
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="ادخل كلمة المرور الجديده"
                        />
                        <input
                            value={confirmNewPassword}
                            onChange={onChangeConfirmPass}
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="تاكيد كلمة المرور الجديدة"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <div className="w-5/6 sm:w-2/3 md:w-1/2 flex justify-end px-2">
                        <button onClick={changePassword} className="btn-save d-inline mt-2 ">حفظ كلمة السر</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserProfile
