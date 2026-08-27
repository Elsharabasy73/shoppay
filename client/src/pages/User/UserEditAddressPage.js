import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../components/common/Pagination'
import UserSideBar from '../../components/User/UserSideBar'
import UserAddAddress from '../../components/User/UserAddAddress';
import UserEditAddress from '../../components/User/UserEditAddress';
const UserEditAddressPage = () => {
    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                  <UserEditAddress />
                </Col>
            </Row>
        </Container>
    )
}
export default UserEditAddressPage
