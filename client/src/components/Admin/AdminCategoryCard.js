import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryCardHook from "../../hooks/category/category-card-hook";
import deleteicon from "../../assets/images/delete.png";
import editicon from "../../assets/images/edit.png";

const AdminCategoryCard = ({ category }) => {
  const [show, handleClose, handleShow, handelDelete] =
    CategoryCardHook(category);

  return (
    <div className="user-address-card admin-card my-3 px-2">
      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="font">تاكيد الحذف</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="font">هل انت متاكد من عملية الحذف للتصنيف</div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="font" variant="success" onClick={handleClose}>
            تراجع
          </Button>

          <Button className="font" variant="dark" onClick={handelDelete}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Category Card */}
      <Row className="d-flex justify-content-between align-items-center">
        {/* Category image + name */}
        <Col
          xs="6"
          className="d-flex align-items-center"
          style={{ height: "100%" }}
        >
          <div
            style={{
              height: "80px",
              width: "80px",
              flexShrink: 0,
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <img
              alt={category?.name || "category"}
              src={category?.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="px-3 d-flex align-items-center">
            {category?.name || ""}
          </div>
        </Col>

        {/* Edit / Delete */}
        <Col xs="6" className="d-flex justify-content-end align-items-center">
          <div
            className="d-flex align-items-center p-2"
            style={{
              flexShrink: 0,
              height: "auto",
            }}
          >
            {/* Edit */}
            <Link
              to={`/admin/editcategory/${category._id}`}
              className="d-flex align-items-center me-3 text-decoration-none"
              style={{
                flexShrink: 0,
              }}
            >
              <img
                src={editicon}
                alt="edit"
                style={{
                  width: "15px",
                  height: "17px",
                  objectFit: "contain",
                  flexShrink: 0,
                  display: "block",
                }}
                className="ms-1"
              />

              <p className="item-delete-edit mb-0">تعديل</p>
            </Link>

            {/* Delete */}
            <div
              onClick={handleShow}
              className="d-flex align-items-center"
              style={{
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <img
                src={deleteicon}
                alt="delete"
                style={{
                  width: "15px",
                  height: "17px",
                  objectFit: "contain",
                  flexShrink: 0,
                  display: "block",
                }}
                className="ms-1"
              />

              <p className="item-delete-edit mb-0">ازاله</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCategoryCard;
