import React from 'react'
import AdminUserCard from './AdminUserCard'

const AdminAllUsers = ({ users }) => {
    return (
        <div>
            <div className='admin-content-text'>ادارة جميع المستخدمين</div>
            <div className='flex flex-wrap justify-start'>
                <div className="w-full px-2">
                    {
                        users && users.length > 0 ? (
                            users.map((item, index) => <AdminUserCard key={item._id || index} user={item} />)
                        ) : <h4>لا يوجد مستخدمين حتي الان</h4>
                    }
                </div>
            </div>
        </div >
    )
}

export default AdminAllUsers
