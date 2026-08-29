import React from 'react'
import UserSideBar from '../../components/User/UserSideBar'
import UserAddAddress from '../../components/User/UserAddAddress';
const UserAddAddressPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 w-1/6 md:w-1/6 px-2">
                    <UserSideBar />
                </div>

                <div className="sm:w-3/4 w-5/6 md:w-5/6 px-2">
                  <UserAddAddress />
                </div>
            </div>
        </div>
    )
}
export default UserAddAddressPage
