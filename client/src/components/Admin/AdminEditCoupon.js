import React, { useRef } from 'react'
import { ToastContainer } from 'react-toastify';
import EditCouponHook from '../../hooks/coupon/edit-coupon-hook';
import { useParams } from 'react-router-dom';

const AdminEditCoupon = () => {

    const { id } = useParams();
    const dateRef = useRef();
    const [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit] = EditCouponHook(id)

    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-4">تعديل بيانات الكوبون</div>
                <div className="w-full sm:w-2/3 px-2">
                    <input
                        value={coupnName}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الكوبون"

                    />
                    <input
                        ref={dateRef}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تاريخ الانتهاء"
                        onChange={onChangeDate}
                        value={couponDate}
                        onFocus={() => { if (dateRef.current) dateRef.current.type = "date" }}
                        onBlur={() => { if (dateRef.current && !couponDate) dateRef.current.type = "text" }}
                    />
                    <input
                        value={couponValue}
                        onChange={onChangeValue}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="نسبة خصم الكوبون"

                    />
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 flex justify-end px-2">
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
                </div>
            </div>


            <ToastContainer />
        </div>
    )
}

export default AdminEditCoupon
