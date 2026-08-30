import React from 'react'
import AddCategoryHook from '../../hooks/category/add-category-hook'
import { ToastContainer } from 'react-toastify';
import AdminCategoryCard from './AdminCategoryCard';
import TwSpinner from '../common/TwSpinner';
const AdminAddCategory = () => {

    const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName, categories] = AddCategoryHook();



    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-sm">
            <h2 className="text-[#1A3F60] font-extrabold text-lg sm:text-xl mb-6 text-right pb-3 border-b border-slate-50">إضافة تصنيف جديد</h2>
            
            <div className="flex flex-col gap-6">
                {/* Image upload section */}
                <div className="flex flex-col items-start gap-2">
                    <span className="text-slate-500 font-bold text-sm">صورة التصنيف</span>
                    <div className="relative group">
                        <label htmlFor="upload-photo" className="cursor-pointer block">
                            <div className="w-32 h-28 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#3F96D2] transition-colors flex items-center justify-center bg-slate-50 overflow-hidden">
                                <img
                                    src={img}
                                    alt="upload-placeholder"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={onImageChange}
                            id="upload-photo"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-slate-500 font-bold text-sm text-right">اسم التصنيف</label>
                    <input
                        onChange={onChangeName}
                        value={name}
                        type="text"
                        className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#3F96D2] focus:ring-2 focus:ring-[#3F96D2]/10 outline-none transition duration-200 text-sm text-slate-800"
                        placeholder="اسم التصنيف"
                    />
                </div>

                {/* Save button */}
                <div className="flex justify-start pt-2">
                    <button
                        onClick={handelSubmit}
                        className="px-6 py-2.5 bg-[#3F96D2] hover:bg-[#206EA9] text-white font-bold rounded-xl transition duration-150 ease-in-out shadow-sm text-sm border-none cursor-pointer"
                    >
                        حفظ
                    </button>
                </div>
            </div>

            {isPress ? (
                loading ? (
                    <div className="mt-4 flex justify-center"><TwSpinner /></div>
                ) : (
                    <div className="mt-4 text-emerald-600 font-bold text-sm text-right">✓ تم الانتهاء بنجاح</div>
                )
            ) : null}

            {/* List of existing categories */}
            <div className="mt-10 pt-6 border-t border-slate-100">
                <h3 className="text-[#1A3F60] font-bold text-base mb-4 text-right">التصنيفات الحالية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((item) => (
                            <AdminCategoryCard key={item._id} category={item} />
                        ))
                    ) : (
                        <h6 className="text-slate-400 text-right">لا يوجد تصنيفات حتى الآن</h6>
                    )}
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AdminAddCategory
