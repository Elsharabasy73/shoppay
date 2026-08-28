import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import SubcategoryCardHook from '../../hooks/subcategory/subcategory-card-hook'
import deleteicon from '../../assets/images/delete.png'

const AdminSubCategoryCard = ({ subcategory }) => {
    const [show, handleClose, handleShow, handelDelete] = SubcategoryCardHook(subcategory)

    return (
        <div className="user-address-card my-3 px-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font'>هل انت متاكد من عملية الحذف للتصنيف الفرعي</div></Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleClose}>
                        تراجع
                    </Button>
                    <Button className='font' variant="dark" onClick={handelDelete}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className="d-flex justify-content-between align-items-center">
                <Col xs="6">
                    <div className="p-2">{subcategory?.name || ''}</div>
                    {subcategory?.category?.name ? (
                        <small className="text-muted d-block px-2">{subcategory.category.name}</small>
                    ) : null}
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div className="d-flex p-2">
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

export default AdminSubCategoryCard
