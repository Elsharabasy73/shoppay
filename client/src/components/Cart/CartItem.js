import React from 'react'
import mobile from '../../assets/images/mobile.png'
import deleteicon from '../../assets/images/delete.png'
import DeleteCartHook from '../../hooks/cart/delete-cart-hook'
import TwModal from '../common/TwModal'
const CartItem = ({ item }) => {
  const [handelDeleteCart, show, handleClose, handleShow, handelDeleteItem, itemCount, onChangeCount, handeleUpdateCart] = DeleteCartHook(item)

  return (
    <div className="w-full cart-item-body my-2 flex px-2">

      <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
        footer={
          <>
            <button className="font-[Almarai] bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700" onClick={handleClose}>
              تراجع
            </button>
            <button className="font-[Almarai] bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900" onClick={handelDeleteItem}>
              حذف
            </button>
          </>
        }>
        <div className='font'>هل انتا متاكد من حذف المنتج من العربة</div>
      </TwModal>

      <img width="160px" height="197px" src={item.product?.imageCover || mobile} alt={item.product?.title || "product"} style={{ objectFit: 'contain', background: '#f9f9f9', borderRadius: '8px' }} />
      <div className="w-100">
        <div className="flex flex-wrap justify-between">
          <div className="sm:w-full flex flex-row justify-between">
            <div className="d-inline pt-2 cat-text">{item.product?.category?.name || ""}</div>
            <div onClick={handleShow} className="flex pt-2 " style={{ cursor: "pointer" }}>
              <img src={deleteicon} alt="" width="20px" height="24px" />
              <div className="cat-text d-inline me-2">ازاله</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-2">
          <div className="sm:w-full flex flex-row justify-start">
            <div className="d-inline pt-2 cat-title">
              {item.product?.title || ""}

            </div>
            <div className="d-inline pt-2 cat-rate me-2">{item.product?.ratingsAverage || 0}</div>
          </div>
        </div>
        <div>
          <div className="sm:w-full mt-1">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="barnd-text d-inline mx-1">{item.product?.brand?.name || ""} </div>
          </div>
        </div>
        <div>
          <div className="sm:w-full mt-1 flex">
            {
              item.color === "" ? null : (<div
                className="color ms-2 border"
                style={{ backgroundColor: `${item.color}` }}></div>)
            }

          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="sm:w-full flex flex-row justify-between">
            <div className="d-inline pt-2 flex">
              <div className="cat-text mt-2  d-inline">الكميه</div>
              <input
                value={itemCount}
                onChange={onChangeCount}
                className="mx-2 text-center"
                type="number"
                style={{ width: "60px", height: "40px" }}
              />
              <button onClick={handeleUpdateCart} className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" >تطبيق</button>
            </div>
            <div className="d-inline pt-2 barnd-text">{item.price || 0} جنية</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
