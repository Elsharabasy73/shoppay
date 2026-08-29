import React from 'react'
import { Link } from 'react-router-dom'
import BrandCardHook from '../../hooks/brand/brand-card-hook'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'
import TwModal from '../common/TwModal'

const AdminBrandCard = ({ brand }) => {
    const [show, handleClose, handleShow, handelDelete] = BrandCardHook(brand)

    return (
        <div className="user-address-card admin-card my-3 px-2">
            <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
                footer={<>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]" onClick={handleClose}>تراجع</button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" onClick={handelDelete}>حذف</button>
                </>}>
                <p className="font-[Almarai]">هل انت متاكد من عملية الحذف للماركة</p>
            </TwModal>

            <div className="flex flex-wrap justify-between items-stretch">
                <div className="w-1/2 flex items-stretch px-2">
                    <img
                        alt={brand?.name || "brand"}
                        src={brand?.image}
                        style={{ height: "100%", width: "50px", objectFit: "cover", borderRadius: "10px 0 0 10px" }}
                    />
                    <div className="px-3 flex items-center"> {brand?.name || ''}</div>
                </div>
                <div className="w-1/2 flex justify-end px-2">
                    <div className="flex p-2">
                        <Link to={`/admin/editbrand/${brand._id}`} className="flex me-3 text-decoration-none ">
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

export default AdminBrandCard
