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
    <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow mb-4">
      <TwModal show={show} onClose={handleClose} title="تأكيد الحذف"
        footer={<>
          <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-300 font-bold font-[Almarai] border-none cursor-pointer text-xs sm:text-sm" onClick={handleClose}>تراجع</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 font-bold font-[Almarai] border-none cursor-pointer text-xs sm:text-sm" onClick={handelDelete}>حذف</button>
        </>}>
        <p className="font-[Almarai] text-slate-600 text-sm sm:text-base">هل أنت متأكد من عملية حذف تصنيف "{category?.name}"؟</p>
      </TwModal>

      {/* Category Card Content */}
      <div className="flex flex-row justify-between items-center gap-4">
        {/* Category image + name */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
            <img
              alt={category?.name || "category"}
              src={category?.image}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="font-bold text-slate-700 text-sm sm:text-base truncate">
            {category?.name || ""}
          </div>
        </div>

        {/* Edit / Delete */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Edit */}
          <Link
            to={`/admin/editcategory/${category._id}`}
            className="flex items-center gap-1.5 no-underline text-sky-600 hover:text-sky-700 transition-colors font-bold text-xs sm:text-sm"
          >
            <img
              src={editicon}
              alt="edit"
              className="w-3.5 h-3.5 object-contain"
            />
            <span>تعديل</span>
          </Link>

          {/* Delete */}
          <button
            onClick={handleShow}
            className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors font-bold text-xs sm:text-sm bg-transparent border-none cursor-pointer p-0"
          >
            <img
              src={deleteicon}
              alt="delete"
              className="w-3.5 h-3.5 object-contain"
            />
            <span>إزالة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryCard;

