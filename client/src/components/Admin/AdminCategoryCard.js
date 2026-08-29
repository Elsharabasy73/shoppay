import React from "react";
import { Link } from "react-router-dom";
import CategoryCardHook from "../../hooks/category/category-card-hook";
import deleteicon from "../../assets/images/delete.png";
import editicon from "../../assets/images/edit.png";
import TwModal from "../common/TwModal";

const AdminCategoryCard = ({ category }) => {
  const [show, handleClose, handleShow, handelDelete] =
    CategoryCardHook(category);

  return (
    <div className="user-address-card admin-card my-3 px-2">
      <TwModal show={show} onClose={handleClose} title="تاكيد الحذف"
        footer={<>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-[Almarai]" onClick={handleClose}>تراجع</button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-[Almarai]" onClick={handelDelete}>حذف</button>
        </>}>
        <p className="font-[Almarai]">هل انت متاكد من عملية الحذف للتصنيف</p>
      </TwModal>

      {/* Category Card */}
      <div className="flex flex-wrap justify-between items-center">
        {/* Category image + name */}
        <div
          className="w-1/2 flex items-center px-2"
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

          <div className="px-3 flex items-center">
            {category?.name || ""}
          </div>
        </div>

        {/* Edit / Delete */}
        <div className="w-1/2 flex justify-end items-center px-2">
          <div
            className="flex items-center p-2"
            style={{
              flexShrink: 0,
              height: "auto",
            }}
          >
            {/* Edit */}
            <Link
              to={`/admin/editcategory/${category._id}`}
              className="flex items-center me-3 text-decoration-none"
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
              className="flex items-center"
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
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
