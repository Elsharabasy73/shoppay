import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAllUsers from '../../components/Admin/AdminAllUsers'
import Pagination from '../../components/common/Pagination'
import ViewUsersAdminHook from '../../hooks/admin/view-users-admin-hook';

const AdminAllUsersPage = () => {
    const [items, pagination, onPress] = ViewUsersAdminHook();
    let pageCount = pagination ? pagination : 0;

    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAllUsers users={items} />
                    {
                        pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={onPress} />) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllUsersPage
