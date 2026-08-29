import React from 'react'
import { Link } from 'react-router-dom'
import AdminUserCardHook from '../../hooks/user/admin-user-card-hook'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'
import TwModal from '../common/TwModal'

const AdminUserCard = ({ user }) => {
    const [show, handleClose, handleShow, handelDelete] = AdminUserCardHook(user)

    return (
        <div className="user-address-card my-3 px-2">
            <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
                footer={<>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]" onClick={handleClose}>تراجع</button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" onClick={handelDelete}>حذف</button>
                </>}>
                <p className="font-[Almarai]">هل انت متاكد من عملية الحذف للمستخدم</p>
            </TwModal>

            <div className="flex flex-wrap justify-between items-center">
                <div className="w-7/12 flex items-center px-2">
                    <img
                        alt={user?.name || "user"}
                        src={user?.profileImg}
                        height="45px"
                        width="45px"
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div className="p-2">
                        <div style={{ fontWeight: "600" }}>{user?.name || ''}</div>
                        <div style={{ fontSize: "13px", color: "#666" }}>{user?.email || ''}</div>
                        <div style={{ fontSize: "12px" }}>
                            <span className="badge bg-light text-dark me-1">{user?.role || 'user'}</span>
                            {user?.phone ? <span className="ms-1">{user.phone}</span> : null}
                        </div>
                    </div>
                </div>
                <div className="w-5/12 flex justify-end px-2">
                    <div className="flex p-2">
                        <Link to={`/admin/edituser/${user._id}`} className="flex me-3 text-decoration-none ">
                            <img alt="" className="ms-1 mt-2" src={editicon} height="17px" width="15px" />
                            <p className="item-delete-edit"> تعديل</p>
                        </Link>
                        <div onClick={handleShow} className="flex ">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={deleteicon}
                                height="17px"
                                width="15px"
                            />
                            <p className="item-delete-edit"> ازاله</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminUserCard
