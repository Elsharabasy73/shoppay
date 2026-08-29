import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminUserCardHook from '../../hooks/user/admin-user-card-hook'
import deleteicon from '../../assets/images/delete.png'
import editicon from '../../assets/images/edit.png'

const AdminUserCard = ({ user }) => {
    const [show, handleClose, handleShow, handelDelete] = AdminUserCardHook(user)

    return (
        <div className="user-address-card my-3 px-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font'>هل انت متاكد من عملية الحذف للمستخدم</div></Modal.Body>
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
                <Col xs="7" className="d-flex align-items-center">
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
                </Col>
                <Col xs="5" className="d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <Link to={`/admin/edituser/${user._id}`} className="d-flex me-3 text-decoration-none ">
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

export default AdminUserCard
