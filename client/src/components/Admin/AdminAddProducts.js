import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown';
import avatar from '../../assets/images/avatar.png'
import add from '../../assets/images/add.png'
import MultiImageInput from 'react-multiple-image-input';

import { CompactPicker } from 'react-color'
import { ToastContainer } from 'react-toastify';
import AdminAddProductsHook from '../../hooks/products/add-products-hook';

const AdminAddProducts = () => {

    const [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, onChangeImageCover, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName, CatID, BrandID, seletedSubID, imageCover] =
        AdminAddProductsHook();
        
    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2"> صورة الغلاف</div>
                    <div>
                        <label for="upload-cover" style={{ cursor: "pointer" }}>
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
                    <div className="mt-1 d-flex">
                        {
                            colors.length >= 1 ? (
                                colors.map((color, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => removeColor(color)}
                                            className="color ms-2 border  mt-1"
                                            style={{ backgroundColor: color }}></div>
                                    )
                                })

                            ) : null
                        }

                        <img onClick={onChangeColor} src={add} alt="" width="30px" height="35px" style={{ cursor: 'pointer' }} />
                        {
                            showColor === true ? <CompactPicker onChangeComplete={handelChangeComplete} /> : null
                        }

                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ</button>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default AdminAddProducts
