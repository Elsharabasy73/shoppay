import React, { useRef, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import AddCouponHook from '../../hooks/coupon/add-coupon-hook';
import AdminCouponCard from './AdminCouponCard';

const AdminAddCoupon = () => {
    const dateRef = useRef();
    const [coupnName, couponDate, couponValue, onChangeName, onChangeDate, onChangeValue, onSubmit, coupons] = AddCouponHook()
    const [btnLoading, setBtnLoading] = useState(false);
    const handleBtnWithLoading = async (e) => { setBtnLoading(true); try { await onSubmit(e); } finally { setTimeout(() => setBtnLoading(false), 900); } };
    return (
        <div>
            <div className="flex flex-wrap justify-start ">
                <div className="admin-content-text pb-4">اضف كوبون جديد</div>
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
                        onBlur={() => { if (dateRef.current) dateRef.current.type = "text" }}
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
                    <button onClick={handleBtnWithLoading} disabled={btnLoading} className={`btn-save d-inline mt-2 ${btnLoading ? 'is-loading' : ''}`}>{btnLoading ? 'جاري الحفظ...' : 'حفظ'}</button>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full sm:w-2/3 px-2">
                    {
                        Array.isArray(coupons) && coupons.length > 0 ? (coupons.map((item) => {
                            return <AdminCouponCard key={item._id} coupon={item} />
                        })) : <h6>لا يوجد كوبونات حتى الان</h6>
                    }
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AdminAddCoupon
