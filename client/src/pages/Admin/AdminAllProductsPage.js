import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAllProducts from '../../components/Admin/AdminAllProducts'
import Pagination from '../../components/common/Pagination'
import ViewProductAdminHook from '../../hooks/admin/view-product-admin-hook';
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsPage } from './../../store/actions/productsAction';

const AdminAllProductsPage = () => {
    const dispatch = useDispatch();
    const [items, pagination,onPress] = ViewProductAdminHook();
    if (pagination)
        var pageCount = pagination;
    else
        pageCount = 0;

   

    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 md:w-1/6 px-2">
                    <AdminSideBar />
                </div>

                <div className="sm:w-3/4 md:w-5/6 px-2">
                    <AdminAllProducts products={items} />
                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminAllProductsPage
