import React from 'react'
import AdminAllOrdersItem from './AdminAllOrdersItem'
import UserGetAllOrderHook from '../../hooks/user/user-get-all-order-hook';
import Pagination from '../common/Pagination';

const AdminAllOrders = () => {
    const [userName, results, paginate, orderData, onPress] = UserGetAllOrderHook()

    const safeOrders = Array.isArray(orderData) ? orderData : []
    const pageCount = paginate?.numberOfPages || 0

    return (
        <div>
            <div className='admin-content-text'>ادارة جميع الطلبات</div>
            <div className='flex flex-wrap justify-start'>
                {
                    safeOrders.length >= 1 ? (safeOrders.map((orderItem, index) => {
                        return <AdminAllOrdersItem key={orderItem._id || index} orderItem={orderItem} />
                    })) : <h6>لا يوجد طلبات حتى الان</h6>
                }
                {
                    pageCount >= 2 ? (<Pagination onPress={onPress} pageCount={pageCount} />) : null
                }
            </div>
        </div>
    )
}

export default AdminAllOrders
