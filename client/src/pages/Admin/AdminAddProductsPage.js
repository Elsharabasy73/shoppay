import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAddProducts from '../../components/Admin/AdminAddProducts'
const AdminAddProductsPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 md:w-1/6 px-2">
                    <AdminSideBar />
                </div>

                <div className="sm:w-3/4 md:w-5/6 px-2">
                     <AdminAddProducts />
                </div>
            </div>
        </div>
    )
}

export default AdminAddProductsPage
