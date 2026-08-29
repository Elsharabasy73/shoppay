import React, { useState } from 'react'
import CouponCardHook from '../../hooks/coupon/coupon-card-hook'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'
import { deleteCoupon } from '../../store/actions/couponAction'
import { Link } from 'react-router-dom';
import TwModal from '../common/TwModal';

const AdminCouponCard = ({ coupon }) => {

    const [formatDate, dateString, show, handleClose, handleShow, handelDelete] = CouponCardHook(coupon)

    return (
        <div className="user-address-card my-3 px-2">


            <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
                footer={<>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]" onClick={handleClose}>تراجع</button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" onClick={handelDelete}>حذف</button>
                </>}>
                <p className="font-[Almarai]">هل انتا متاكد من عملية الحذف للكوبون</p>
            </TwModal>



            <div className="flex flex-wrap justify-between">
                <div className="w-1/2 px-2">
                    <div className="p-2">اسم الكوبون: {coupon?.name || ''}</div>
                </div>
                <div className="w-1/2 flex justify-end px-2">
                    <div className="flex p-2">
                        <Link to={`/admin/editcoupon/${coupon._id}`} style={{ textDecoration: 'none' }}>
                            <div className="flex mx-2">
                                <img
                                    alt=""
                                    className="ms-1 mt-2"
                                    src={editicon}
                                    height="17px"
                                    width="15px"
                                />
                                <p className="item-delete-edit"> تعديل</p>

                            </div>
                        </Link>
                        <div onClick={handleShow} className="flex ">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> ازاله</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full px-2">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        تاريخ الانتهاء:  {formatDate(dateString)}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap mt-3">
                <div className="w-full flex px-2">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        : نسبه الخصم
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {coupon?.discount ?? 0} %
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminCouponCard
