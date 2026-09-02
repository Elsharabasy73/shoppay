import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import avatar from '../../assets/images/avatar.png'
import add from '../../assets/images/add.png'
import MultiImageInput from 'react-multiple-image-input';

import { CompactPicker } from 'react-color'
import { ToastContainer } from 'react-toastify';
import AdminAddProductsHook from '../../hooks/products/add-products-hook';

const AdminAddProducts = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    const [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, onChangeImageCover, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName, CatID, BrandID, seletedSubID, imageCover] =
        AdminAddProductsHook();

    const handleAdd = async (e) => {
        setBtnLoading(true);
        try { await handelSubmit(e); } finally { setTimeout(() => setBtnLoading(false), 900); }
    };

    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
                <div className="w-full sm:w-2/3 px-2">
                    <div className="text-form pb-2"> صورة الغلاف</div>
                    <div>
                        <label htmlFor="upload-cover" style={{ cursor: "pointer" }}>
                            <img
                                src={imageCover ? URL.createObjectURL(imageCover) : avatar}
                                alt="cover"
                                height="100px"
                                width="120px"
                                style={{ objectFit: "cover", borderRadius: "8px" }}
                            />
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onChangeImageCover}
                            id="upload-cover"
                            style={{ display: "none" }}
                        />
                    </div>

                    <div className="text-form pb-2 mt-3"> صور للمنتج</div>

                    <MultiImageInput
                        images={images}
                        setImages={setImages}
                        theme={"light"}
                        allowCrop={false}
                        max={4}
                    />

                    <input
                        value={prodName}
                        onChange={onChangeProdName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم المنتج"
                    />
                    <textarea
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="وصف المنتج"
                        value={prodDescription}
                        onChange={onChangeDesName}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="السعر قبل الخصم"
                        value={priceBefore}
                        onChange={onChangePriceBefor}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="السعر بعد الخصم"
                        value={priceAftr}
                        onChange={onChangePriceAfter}
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="الكمية المتاحة"
                        value={qty}
                        onChange={onChangeQty}
                    />
                    <select
                        name="cat"
                        value={CatID || "0"}
                        onChange={onSeletCategory}
                        className="select input-form-area mt-3 px-2 ">
                        <option value="0">التصنيف الرئيسي</option>
                        {
                            category.data ? (category.data.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })) : null

                        }
                    </select>

                    <Multiselect
                        className="mt-2 text-end"
                        placeholder="التصنيف الفرعي"
                        options={options}
                        selectedValues={seletedSubID}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                        style={{ color: "red" }}
                    />
                    <select
                        name="brand"
                        value={BrandID || "0"}
                        onChange={onSeletBrand}
                        className="select input-form-area mt-3 px-2 ">
                        <option value="0">اختر ماركة</option>
                        {
                            brand.data ? (brand.data.map((item, index) => {
                                return (
                                    <option key={index} value={item._id}>{item.name}</option>
                                )
                            })) : null

                        }
                    </select>
                    <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 relative min-h-[36px]">
                        {
                            colors.length >= 1 ? (
                                colors.map((color, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => removeColor(color)}
                                            title="اضغط لإزالة اللون"
                                            className="color ms-1 mt-1"
                                            style={{ backgroundColor: color }}></div>
                                    )
                                })

                            ) : null
                        }

                        <div className="relative">
                            <img onClick={onChangeColor} src={add} alt="" width="32px" height="32px" className="rounded-full border border-slate-200 p-1 bg-white hover:bg-slate-50 transition" style={{ cursor: 'pointer' }} />
                            {
                                showColor === true ? <div className="color-picker-wrapper"><CompactPicker onChangeComplete={handelChangeComplete} /></div> : null
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 flex justify-end px-2">
                    <button onClick={handleAdd} disabled={btnLoading} className={`btn-save d-inline mt-2 ${btnLoading ? 'is-loading' : ''}`}>{btnLoading ? 'جاري الحفظ...' : 'حفظ'}</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminAddProducts
