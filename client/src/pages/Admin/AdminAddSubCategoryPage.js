import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAddSubCategory from '../../components/Admin/AdminAddSubCategory'
const AdminAddSubCategoryPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 md:w-1/6 px-2">
                    <AdminSideBar />
                </div>

                <div className="sm:w-3/4 md:w-5/6 px-2">
                     <AdminAddSubCategory />
                </div>
            </div>
        </div>
    )
}

export default AdminAddSubCategoryPage
