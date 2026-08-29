import React from 'react'
import { Link } from 'react-router-dom'
import SubcategoryCardHook from '../../hooks/subcategory/subcategory-card-hook'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'
import TwModal from '../common/TwModal'

const AdminSubCategoryCard = ({ subcategory }) => {
    const [show, handleClose, handleShow, handelDelete] = SubcategoryCardHook(subcategory)

    return (
        <div className="user-address-card admin-card my-3 px-2">
            <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
                footer={<>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]" onClick={handleClose}>تراجع</button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" onClick={handelDelete}>حذف</button>
                </>}>
                <p className="font-[Almarai]">هل انت متاكد من عملية الحذف للتصنيف الفرعي</p>
            </TwModal>

            <div className="flex flex-wrap justify-between items-center">
                <div className="w-1/2 px-2">
                    <div className="p-2">{subcategory?.name || ''}</div>
                    {subcategory?.category?.name ? (
                        <small className="text-muted d-block px-2">{subcategory.category.name}</small>
                    ) : null}
                </div>
                <div className="w-1/2 flex justify-end px-2">
                    <div className="flex p-2">
                        <Link to={`/admin/editsubcategory/${subcategory._id}`} className="flex me-3 text-decoration-none ">
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

export default AdminSubCategoryCard
