import React from 'react'
import ReactStars from "react-rating-stars-component";
import AddRateHook from '../../hooks/review/add-rate-hook';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

const RatePost = () => {
  const {id} =useParams() ;
  const [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit] = AddRateHook(id)

 

  var name = ""
  if (user)
    name = user.name

  const canRate = (() => {
    try {
      if (!user) return false
      return user.role === "user"
    } catch { return false }
  })()

  const setting = {
    size: 30,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: rateValue,
    a11y: true,
    isHalf: false,
    edit: !!user,
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
      <div className="mt-3 flex flex-wrap sm:w-full me-5 items-center">
          <div className="rate-name d-inline ms-3 mt-1">{name}</div>
          <div className="flex items-center">
            <ReactStars {...setting} />
            <span className="ms-2" style={{ fontSize: "12px", color: "#979797" }}>
              {rateValue ? `${rateValue}/5` : "اختر التقييم"}
            </span>
          </div>
      </div>
      {!canRate && user && user.role !== "user" ? (
        <div><div className="me-5 mt-2" style={{ color: "#979797", fontSize: "12px" }}>التقييم متاح للمستخدمين فقط</div></div>
      ) : !user ? (
        <div><div className="me-5 mt-2" style={{ color: "#979797", fontSize: "12px" }}>سجل دخول لتتمكن من التقييم</div></div>
      ) : null}
      <div className="border-bottom mx-2">
        <div className="d-felx me-4 pb-2">
          <textarea
            value={rateText}
            onChange={OnChangeRateText}
            className="input-form-area p-2 mt-3"
            rows="2"
            cols="20"
            placeholder="اكتب تعليقك...."
          />
          <div className=" flex justify-end al">
            <div onClick={onSubmit} className="product-cart-add px-3  py-2 text-center d-inline">اضف تعليق</div>
          </div>
        </div>
      </div>
      <ToastContainer />

    </div>
  )
}

export default RatePost
