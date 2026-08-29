import React from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import AdminAddUserHook from '../../hooks/user/add-user-hook'

const AdminAddUser = () => {
    const [img, name, email, phone, password, passwordConfirm, role, loading, isPress, handelSubmit, onImageChange, onChangeName, onChangeEmail, onChangePhone, onChangePassword, onChangePasswordConfirm, onChangeRole] = AdminAddUserHook();

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضافه مستخدم جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره المستخدم</div>
                    <div>
                        <label htmlFor="upload-photo">
                            <img
                                src={img}
                                alt="user"
                                height="100px"
                                width="120px"
                                style={{ cursor: "pointer", objectFit: "cover", borderRadius: "50%" }}
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
                        placeholder="اسم المستخدم"
                    />
                    <input
                        onChange={onChangeEmail}
                        value={email}
                        type="email"
                        className="input-form d-block mt-3 px-3"
                        placeholder="البريد الالكتروني"
                    />
                    <input
                        onChange={onChangePhone}
                        value={phone}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="رقم الهاتف (اختياري)"
                    />
                    <input
                        onChange={onChangePassword}
                        value={password}
                        type="password"
                        className="input-form d-block mt-3 px-3"
                        placeholder="كلمة المرور"
                    />
                    <input
                        onChange={onChangePasswordConfirm}
                        value={passwordConfirm}
                        type="password"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تاكيد كلمة المرور"
                    />
                    <select
                        value={role}
                        onChange={onChangeRole}
                        className="select input-form-area mt-3 px-2">
                        <option value="user">مستخدم</option>
                        <option value="manager">مدير</option>
                    </select>
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

            <ToastContainer />
        </div>
    )
}

export default AdminAddUser
