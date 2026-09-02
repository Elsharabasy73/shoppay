import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import EditAddressHook from '../../hooks/user/edit-address-hook';
import { ToastContainer } from 'react-toastify';

const UserEditAddress = () => {
    const { id } = useParams()
    const [handelEdit, alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone] = EditAddressHook(id)
    const [btnLoading, setBtnLoading] = useState(false);
    const handleBtnWithLoading = async (e) => { setBtnLoading(true); try { await handelEdit(e); } finally { setTimeout(() => setBtnLoading(false), 900); } };
    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-2">تعديل العنوان </div>
                <div className="sm:w-2/3 px-2">
                    <input
                        value={alias}
                        onChange={onChangeAlias}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تسمية العنوان مثلا(المنزل - العمل)"
                    />
                    <textarea
                        value={detalis}
                        onChange={onChangeDetalis}
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="العنوان بالتفصيل"
                    />
                    <input
                        value={phone}
                        onChange={onChangePhone}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="01026025804"
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="sm:w-2/3 flex justify-end px-2">
                    <button onClick={handleBtnWithLoading} disabled={btnLoading} className={`btn-save d-inline mt-2 ${btnLoading ? 'is-loading' : ''}`}>{btnLoading ? 'جاري الحفظ...' : 'حفظ تعديل العنوان'}</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserEditAddress
