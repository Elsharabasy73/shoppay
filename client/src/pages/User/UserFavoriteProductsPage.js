import React from 'react'
import UserSideBar from '../../components/User/UserSideBar'
import UserFavoriteProduct from '../../components/User/UserFavoriteProduct'
import { useNavigate } from 'react-router-dom';
const UserFavoriteProductsPage = () => {
   
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 w-1/6 md:w-1/6 px-2">
                    <UserSideBar />
                </div>

                <div className="sm:w-3/4 w-5/6 md:w-5/6 px-2">
                    <UserFavoriteProduct />
                </div>
            </div>
        </div>
    )
}

export default UserFavoriteProductsPage
