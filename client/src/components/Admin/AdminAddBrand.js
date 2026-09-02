import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import AddBrandHook from '../../hooks/brand/add-brand-hook';
import AdminBrandCard from './AdminBrandCard';
import TwSpinner from '../common/TwSpinner';
const AdminAddBrand = () => {

    const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName, brands] = AddBrandHook();
    const [btnLoading, setBtnLoading] = useState(false);
    const handleBtnWithLoading = async (e) => { setBtnLoading(true); try { await handelSubmit(e); } finally { setTimeout(() => setBtnLoading(false), 900); } };
    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-4">اضف ماركه جديده</div>
                <div className="w-full sm:w-2/3 px-2">
                    <div className="text-form pb-2">صوره الماركه</div>
                    <div>
                        <label for="upload-photo">
                            <img
                                src={img}
                                alt="fzx"
                                height="100px"
                                width="120px"
                                style={{ cursor: "pointer" }}
                            />
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={onImageChange}
                            id="upload-photo"
                        />
                    </div>
                    <input
                        type="text"
                        value={name}
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الماركه"
                        onChange={onChangeName}
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 flex justify-end px-2">
                    <button onClick={handleBtnWithLoading} disabled={btnLoading} className={`btn-save d-inline mt-2 ${btnLoading ? 'is-loading' : ''}`}>{btnLoading ? 'جاري الحفظ...' : 'حفظ'}</button>
                </div>
            </div>

            {
                isPress ? loading ? <TwSpinner /> : <h4>تم الانتهاء</h4> : null
            }

            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 px-2">
                    {
                        Array.isArray(brands) && brands.length > 0 ? (brands.map((item) => {
                            return <AdminBrandCard key={item._id} brand={item} />
                        })) : <h6>لا يوجد ماركات حتى الان</h6>
                    }
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AdminAddBrand
