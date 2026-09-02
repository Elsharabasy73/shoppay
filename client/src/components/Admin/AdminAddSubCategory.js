import React, { useState } from 'react'

import { ToastContainer } from 'react-toastify';
import useAddSubcategory from '../../hooks/subcategory/add-subcategory-hook';
import AdminSubCategoryCard from './AdminSubCategoryCard';

const AdminAddSubCategory = () => {
    const [id, name, loading, category, subcategory, handelChange, handelSubmit, onChangeName, subcategories] = useAddSubcategory();
    const [btnLoading, setBtnLoading] = useState(false);
    const handleBtnWithLoading = async (e) => { setBtnLoading(true); try { await handelSubmit(e); } finally { setTimeout(() => setBtnLoading(false), 900); } };

    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
                <div className="w-full sm:w-2/3 px-2">
                    <input
                        value={name}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف الفرعي"
                    />
                    <select name="category" id="cat" className="select mt-3 px-2 " value={id} onChange={handelChange}>
                        <option value="0">اختر تصنيف رئيسي</option>
                        {
                            category?.data && Array.isArray(category.data) ? (category.data.map(item => {
                                return (<option key={item._id} value={item._id}>{item.name}</option>)
                            })) : null
                        }
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 flex justify-end px-2">
                    <button onClick={handleBtnWithLoading} disabled={btnLoading} className={`btn-save d-inline mt-2 ${btnLoading ? 'is-loading' : ''}`}>{btnLoading ? 'جاري الحفظ...' : 'حفظ'}</button>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 px-2">
                    {
                        Array.isArray(subcategories) && subcategories.length > 0 ? (subcategories.map((item) => {
                            return <AdminSubCategoryCard key={item._id} subcategory={item} />
                        })) : <h6>لا يوجد تصنيفات فرعية حتى الان</h6>
                    }
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AdminAddSubCategory
