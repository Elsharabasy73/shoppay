import React from 'react'
import { Link } from 'react-router-dom'
import mobile from '../../assets/images/mobile.png'
const AdminAllOrdersItem = ({ orderItem }) => {

    console.log(orderItem)
    return (
        <div className="w-full px-2">
            <Link to={`/admin/orders/${orderItem._id}`}
                className="cart-item-body-admin my-2 px-1 flex px-2"
                style={{ textDecoration: "none" }}>
                <div className="w-100">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full flex flex-row justify-between px-2">
                            <div className="d-inline pt-2 cat-text">طلب رقم #{orderItem._id?.slice(-6) || orderItem.id || ''}</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center mt-2">
                        <div className="w-full flex flex-row justify-start px-2">
                            <div className="d-inline pt-2 cat-title">
                                طلب من..   {orderItem.user?.name || 'مستخدم'}
                            </div>
                            <div style={{ color: 'black' }} className="d-inline pt-2 cat-rate me-2">  {orderItem.user?.email || ''}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between">
                        <div className="w-1/2 flex px-2">
                            <div>
                                <div style={{ color: 'black' }} className="d-inline"> التوصيل</div>
                                <div className="d-inline mx-2 stat">{orderItem.isDelivered ? 'تم التوصيل' : 'لم يتم '}</div>
                            </div>
                            <div>
                                <div style={{ color: 'black' }} className="d-inline"> الدفع</div>
                                <div className="d-inline mx-2 stat">{orderItem.isPaid ? 'تم الدفع' : 'لم يتم '}</div>
                            </div>

                            <div>
                                <div style={{ color: 'black' }} className="d-inline">طريقة الدفع</div>
                                <div className="d-inline mx-2 stat">{orderItem.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة ائتمانية'}</div>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-end px-2">
                            <div>
                                <div className="barnd-text">{orderItem.totalOrderPrice ?? orderItem.totalPrice ?? 0} جنية</div>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </div >
    )
}

export default AdminAllOrdersItem
