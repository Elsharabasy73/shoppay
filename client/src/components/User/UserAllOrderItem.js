import React from 'react'
import mobile from '../../assets/images/mobile.png'
import UserAllOrderCard from './UserAllOrderCard'
const UserAllOrderItem = ({ orderItem }) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    return (
        <div className="user-order mt-2">
            <div className="flex flex-wrap">
                <div className="py-2 order-title">طلب رقم #{orderItem.id || 0} ...تم بتاريخ {formatDate(orderItem.createdAt)}</div>
            </div>
            {
                orderItem.cartItems ? (orderItem.cartItems.map((item, index) => {
                    return <UserAllOrderCard key={index} item={item} />
                })) : null
            }

            <div className="flex flex-wrap justify-between">
                <div className="w-1/2 flex px-2">
                    <div>
                        <div className="inline"> التوصيل</div>
                        <div className="inline mx-2 stat">{orderItem.isDelivered === true ? 'تم التوصيل' : 'لم يتم '}</div>
                    </div>
                    <div>
                        <div className="inline"> الدفع</div>
                        <div className="inline mx-2 stat">{orderItem.isPaid === true ? 'تم الدفع' : 'لم يتم '}</div>
                    </div>

                    <div>
                        <div className="inline">طرقة الدفع</div>
                        <div className="inline mx-2 stat">{orderItem.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة ائتمانية'}</div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end px-2">
                    <div>
                        <div className="barnd-text">{orderItem.totalOrderPrice || 0} جنية</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAllOrderItem
