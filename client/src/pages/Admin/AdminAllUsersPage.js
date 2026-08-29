import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAllUsers from '../../components/Admin/AdminAllUsers'
import Pagination from '../../components/common/Pagination'
import ViewUsersAdminHook from '../../hooks/admin/view-users-admin-hook';

const AdminAllUsersPage = () => {
    const [items, pagination, onPress] = ViewUsersAdminHook();
    let pageCount = pagination ? pagination : 0;

    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 md:w-1/6 px-2">
                    <AdminSideBar />
                </div>

                <div className="sm:w-3/4 md:w-5/6 px-2">
                    <AdminAllUsers users={items} />
                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminAllUsersPage
