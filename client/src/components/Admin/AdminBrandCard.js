import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BrandCardHook from '../../hooks/brand/brand-card-hook'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'

const AdminBrandCard = ({ brand }) => {
    const [show, handleClose, handleShow, handelDelete] = BrandCardHook(brand)

    return (
        <div className="user-address-card admin-card my-3 px-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font'>هل انت متاكد من عملية الحذف للماركة</div></Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleClose}>
                        تراجع
                    </Button>
                    <Button className='font' variant="dark" onClick={handelDelete}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="d-flex justify-content-between align-items-stretch">
                <Col xs="6" className="d-flex align-items-stretch">
                    <img
                        alt={brand?.name || "brand"}
                        src={brand?.image}
                        style={{ height: "100%", width: "50px", objectFit: "cover", borderRadius: "10px 0 0 10px" }}
                    />
                    <div className="px-3 d-flex align-items-center"> {brand?.name || ''}</div>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <Link to={`/admin/editbrand/${brand._id}`} className="d-flex me-3 text-decoration-none ">
                            <img alt="" className="ms-1 mt-2" src={editicon} height="17px" width="15px" />
                            <p className="item-delete-edit"> تعديل</p>
                        </Link>
                        <div onClick={handleShow} className="d-flex ">
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
                </Col>
            </Row>
        </div >
    )
}

export default AdminBrandCard
