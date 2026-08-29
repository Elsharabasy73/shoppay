import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AdminUserCard from './AdminUserCard'

const AdminAllUsers = ({ users }) => {
    return (
        <div>
            <div className='admin-content-text'>ادارة جميع المستخدمين</div>
            <Row className='justify-content-start'>
                <Col sm="12">
                    {
                        users && users.length > 0 ? (
                            users.map((item, index) => <AdminUserCard key={item._id || index} user={item} />)
                        ) : <h4>لا يوجد مستخدمين حتي الان</h4>
                    }
                </Col>
            </Row>
        </div >
    )
}

export default AdminAllUsers
