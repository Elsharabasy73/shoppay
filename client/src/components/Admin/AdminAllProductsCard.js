import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts } from '../../store/actions/productsAction';
import TwModal from '../common/TwModal';

const AdminAllProductsCard = ({ item }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handelDelete = async () => {

        await dispatch(deleteProducts(item._id))
        setShow(false);
        window.location.reload();
    }

    return (
        <div className="w-full sm:w-1/2 md:w-5/12 lg:w-1/3 flex px-2">

            <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
                footer={<>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]" onClick={handleClose}>تراجع</button>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" onClick={handelDelete}>حذف</button>
                </>}>
                <p className="font-[Almarai]">هل انتا متاكد من عملية الحذف للمنتج</p>
            </TwModal>

            <div
                className="my-2 w-full"
                style={{
                    height: "350px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                }}>
                <div className="flex justify-center px-2 pt-2">
                    <div className="flex justify-between w-full gap-2">
                        <div onClick={handleShow} className="item-delete-edit !bg-red-50 !text-red-600 !border-red-200 hover:!bg-red-600 hover:!text-white hover:!border-red-600">ازاله</div>
                        <Link to={`/admin/editproduct/${item._id}`} style={{ textDecoration: "none" }}>
                            <div className="item-delete-edit !bg-[#3F96D2] !text-white !border-[#3F96D2] hover:!bg-[#1A3F60] hover:!border-[#1A3F60]">تعديل</div>
                        </Link>
                    </div>
                </div>
                <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
                    <img style={{ height: "228px", width: "100%", objectFit: "cover" }} src={item.imageCover} alt={item.title} />
                    <div className="p-3">
                        <div className="card-title">
                            {item.title}
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <div className="card-rate">{item.ratingsQuantity}</div>
                                <div className="d-flex">

                                    <div className="card-price">{item.priceAfterDiscount >= 1 ?
                                        (<div><span style={{ textDecorationLine: 'line-through' }}>{item.price}</span> {item.priceAfterDiscount}</div>)
                                        : item.price}</div>
                                    <div className="card-currency mx-1">جنيه</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminAllProductsCard
