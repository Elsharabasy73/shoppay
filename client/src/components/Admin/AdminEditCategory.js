import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import EditCategoryHook from '../../hooks/category/edit-category-hook'

const AdminEditCategory = () => {
  const { id } = useParams()
  const [img, name, onChangeName, onImageChange, handelSubmit] = EditCategoryHook(id)

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">تعديل التصنيف</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره التصنيف</div>
          <div>
            <label htmlFor="upload-photo">
              <img src={img} alt="category" height="100px" width="120px" style={{ cursor: 'pointer' }} />
            </label>
            <input type="file" onChange={onImageChange} id="upload-photo" />
          </div>
          <input onChange={onChangeName} value={name} type="text" className="input-form d-block mt-3 px-3" placeholder="اسم التصنيف" />
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default AdminEditCategory
