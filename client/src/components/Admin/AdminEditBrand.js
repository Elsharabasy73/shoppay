import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import EditBrandHook from '../../hooks/brand/edit-brand-hook'

const AdminEditBrand = () => {
  const { id } = useParams()
  const [img, name, onChangeName, onImageChange, handelSubmit] = EditBrandHook(id)

  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4">تعديل الماركة</div>
        <Col sm="8">
          <div className="text-form pb-2">صوره الماركة</div>
          <div>
            <label htmlFor="upload-photo">
              <img src={img} alt="brand" height="100px" width="120px" style={{ cursor: 'pointer' }} />
            </label>
            <input type="file" onChange={onImageChange} id="upload-photo" />
          </div>
          <input onChange={onChangeName} value={name} type="text" className="input-form d-block mt-3 px-3" placeholder="اسم الماركة" />
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

export default AdminEditBrand
