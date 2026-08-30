import React from 'react'
import { Link } from 'react-router-dom'
import ViewAddressesHook from '../../hooks/user/view-addresses-hook'
import UserAddressCard from './UserAddressCard'

const UserAllAddress = () => {
    const [res] = ViewAddressesHook()
    if (res.data)
    return (
        <div>
            <div className="admin-content-text pb-4">دفتر العنوانين</div>
            {
                res.data ? (res.data.map((item, index) => {
                    return <UserAddressCard key={index} item={item} />
                })) : <h6>لا يوجد عنوانين حتى الان</h6>
            }

            <div className="flex flex-wrap justify-center">
                <div className="sm:w-5/12 flex justify-center px-2">
                    <Link to="/user/add-address" style={{ textDecoration: "none" }}>
                        <button className="btn-add-address">اضافه عنوان جديد</button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default UserAllAddress
