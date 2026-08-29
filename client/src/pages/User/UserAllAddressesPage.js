import React from 'react'
import UserAllAddress from '../../components/User/UserAllAddress'
import UserSideBar from '../../components/User/UserSideBar'
const UserAllAddressesPage = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-5">
            <div className='flex flex-wrap py-3'>
                <div className="sm:w-1/4 w-1/6 md:w-1/6 px-2">
                    <UserSideBar />
                </div>

                <div className="sm:w-3/4 w-5/6 md:w-5/6 px-2">
                  <UserAllAddress />
                </div>
            </div>
        </div>
    )
}

export default UserAllAddressesPage
