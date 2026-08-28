import React from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import AddCategoryHook from '../../hooks/category/add-category-hook'
import { ToastContainer } from 'react-toastify';
import AdminCategoryCard from './AdminCategoryCard';
const AdminAddCategory = () => {

    const [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName, categories] = AddCategoryHook();

    

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضافه تصنيف جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره التصنيف</div>
                    <div>
                        <label for="upload-photo">
                            <img
                                src={img}
                                alt="fzx"
                                height="100px"
                                width="120px"
                                style={{ cursor: "pointer" }}
                            />
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={onImageChange}
                            id="upload-photo"
                        />
                    </div>

                    <input
                        onChange={onChangeName}
                        value={name}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={handelSubmit} className="btn-save d-inline mt-2 ">حفظ</button>
                </Col>
            </Row>

            {
                isPress ? loading ? <Spinner animation="border" variant="primary" /> : <h4>تم الانتهاء</h4> : null
            }

            <Row>
                <Col sm="8" className="">
                    {
                        Array.isArray(categories) && categories.length > 0 ? (categories.map((item) => {
                            return <AdminCategoryCard key={item._id} category={item} />
                        })) : <h6>لا يوجد تصنيفات حتى الان</h6>
                    }
                </Col>
            </Row>

            <ToastContainer />
        </div>
    )
}

export default AdminAddCategory
