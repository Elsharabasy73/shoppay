import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import deleteicon from '../../assets/images/delete.png'
import { useDispatch } from 'react-redux';
import { deleteUserAddress } from './../../store/actions/userAddressesAction';
import DeleteAddressHook from '../../hooks/user/delete-address-hook';
import TwModal from '../common/TwModal';

const UserAddressCard = ({ item }) => {

    const [show, handleClose, handleShow, handelDelete] = DeleteAddressHook(item._id)

    return (
        <div className="user-address-card my-3 px-2">

            <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
                footer={<>
                    <button className='font bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]' onClick={handleClose}>
                        تراجع
                    </button>
                    <button className='font bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]' onClick={handelDelete}>
                        حذف
                    </button>
                </>}>
                <p className='font'>هل انتا متاكد من عملية الحذف العنوان</p>
            </TwModal>

            <div className="flex flex-wrap justify-between ">
                <div className="w-1/2 px-2">
                    <div className="p-2">{item.alias}</div>
                </div>
                <div className="w-1/2 flex justify-end px-2">
                    <div className="flex p-2">
                        <Link to={`/user/edit-address/${item._id}`} style={{ textDecoration: 'none' }}>
                            <div className="flex mx-2">
                                <img
                                    alt=""
                                    className="ms-1 mt-2"
                                    src={deleteicon}
                                    height="17px"
                                    width="15px"
                                />
                                <p className="item-delete-edit"> تعديل</p>

                            </div>
                        </Link>
                        <div onClick={handleShow} className="flex ">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> حذف</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap">
                <div className="w-full px-2">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "14px",
                        }}>
                        {item.details}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap mt-3">
                <div className="w-full flex px-2">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        رقم الهاتف:
                    </div>

                    <div
                        style={{
                            color: "#979797",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}
                        className="mx-2">
                        {item.phone}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAddressCard
