import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAddUser from '../../components/Admin/AdminAddUser'
const AdminAddUserPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 md:w-1/6 px-2">
                    <AdminSideBar />
                </div>

                <div className="sm:w-3/4 md:w-5/6 px-2">
                    <AdminAddUser />
                </div>
            </div>
        </div>
    )
}

export default AdminAddUserPage
