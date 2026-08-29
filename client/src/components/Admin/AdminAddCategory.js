import React from 'react'
import AddCategoryHook from '../../hooks/category/add-category-hook'
import { ToastContainer } from 'react-toastify';
import AdminCategoryCard from './AdminCategoryCard';
import TwSpinner from '../common/TwSpinner';
const AdminAddCategory = () => {

    const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName, categories] = AddCategoryHook();



    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
                <div className="w-full sm:w-2/3 px-2">
                    <div className="text-form pb-2">صوره التصنيف</div>
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
                        onChange={onChangeName}
                        value={name}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف"
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 flex justify-end px-2">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ</button>
                </div>
            </div>

            {
                isPress ? loading ? <TwSpinner /> : <h4>تم الانتهاء</h4> : null
            }

            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 px-2">
                    {
                        Array.isArray(categories) && categories.length > 0 ? (categories.map((item) => {
                            return <AdminCategoryCard key={item._id} category={item} />
                        })) : <h6>لا يوجد تصنيفات حتى الان</h6>
                    }
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AdminAddCategory
