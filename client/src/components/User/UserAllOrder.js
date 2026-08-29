import React from 'react'
import UserAllOrderItem from './UserAllOrderItem'
import UserGetAllOrderHook from '../../hooks/user/user-get-all-order-hook';
import Pagination from './../common/Pagination';

const UserAllOrder = () => {
    const [userName, results, paginate, orderData, onPress] = UserGetAllOrderHook()

    return (
        <div>
            <div className="admin-content-text pb-4">عدد الطلبات  #{results}</div>
            <div className='flex flex-wrap justify-between'>
                {
                    orderData.length >= 1 ? (orderData.map((orderItem, index) => {
                        return <UserAllOrderItem key={index} orderItem={orderItem} />
                    })) : <h6>لا يوجد طلبات حتى </h6>
                }

                {
                    paginate.numberOfPages >= 2 ? (<Pagination onPress={onPress} pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0} />) : null
                }


            </div>
        </div >
    )
}

export default UserAllOrder
