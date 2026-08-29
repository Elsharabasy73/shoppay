import React, { useState } from 'react'
import rate from '../../assets/images/rate.png'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'
import { ToastContainer } from 'react-toastify';

import DeleteRateHook from '../../hooks/review/delete-rate-hook'
import EditRateHook from '../../hooks/review/edit-rate-hook'
import ReactStars from 'react-rating-stars-component'
import TwModal from '../common/TwModal'
const RateItem = ({ review }) => {



    const [isUser, handelDelete, handleShow, handleClose, showDelete] = DeleteRateHook(review);
    const [showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeRateText, newRateText, OnChangeRateValue, newRateValue] = EditRateHook(review)

    const setting = {
        size: 30,
        count: 5,
        color: "#979797",
        activeColor: "#ffc107",
        value: newRateValue,
        a11y: true,
        isHalf: false,
        char: "★",
        emptyIcon: <span>☆</span>,
        halfIcon: <span>★</span>,
        filledIcon: <span>★</span>,
        onChange: newValue => {
            OnChangeRateValue(newValue);
        }
    };

    return (
        <div>


            <TwModal show={showDelete} onClose={handleClose} title="تاكيد الحذف"
                footer={
                    <>
                        <button className="font-[Almarai] bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleClose}>
                            تراجع
                        </button>
                        <button className="font-[Almarai] bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900" onClick={handelDelete}>
                            حذف
                        </button>
                    </>
                }>
                <div className='font'>هل انتا متاكد من حذف التقييم</div>
            </TwModal>


            <TwModal show={showEdit} onClose={handleCloseEdit} title="تعديل التقييم"
                footer={
                    <>
                        <button className="font-[Almarai] bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleCloseEdit}>
                            تراجع
                        </button>
                        <button className="font-[Almarai] bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900" onClick={handelEdit}>
                            تعديل
                        </button>
                    </>
                }>
                <ReactStars {...setting} />
                <input
                    onChange={onChangeRateText}
                    value={newRateText}
                    type="text"
                    className='font w-100'
                    style={{ border: 'none' }}
                />
            </TwModal>

            <div className="mt-3">
                <div className="d-felx me-5">
                    <div className="rate-name  d-inline ms-2">{review.user.name}</div>
                    <img className="" src={rate} alt="" height="16px" width="16px" />
                    <div className="cat-rate  d-inline  p-1 pt-2">{review.rating}</div>
                </div>
            </div>
            <div className="border-bottom mx-2">
                <div className="d-felx me-4 pb-2">
                    <div className="rate-description  d-inline ms-2">
                        {review.comment || review.review}
                    </div>
                    {
                        isUser === true ? (<div className='d-inline flex justify-end'>
                            <img src={deleteicon} onClick={handleShow} width="20px" height="20px" style={{ cursor: "pointer" }} alt="delete" />

                            <img src={editicon} onClick={handleShowEdit} width="20px" height="20px" style={{ cursor: "pointer" }} alt="delete" />

                        </div>) : null
                    }

                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default RateItem
