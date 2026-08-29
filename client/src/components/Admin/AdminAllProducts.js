import React from 'react'
import AdminAllProductsCard from './AdminAllProductsCard'

const AdminAllProducts = ({ products }) => {

    return (
        <div>
            <div className='admin-content-text'>ادارة جميع المنتجات</div>
            <div className='flex flex-wrap justify-start'>
                {
                    products ? (
                        products.map((item, index) => <AdminAllProductsCard key={index} item={item} />)
                    ) : <h4>لا يوجد منتجات حتي الان</h4>
                }

            </div>

        </div >
    )
}

export default AdminAllProducts
