import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import login from '../../assets/images/login.png'
import cart from '../../assets/images/cart.png'
import NavbarSearchHook from '../../hooks/search/navbar-search-hook';
import GetAllUserCartHook from '../../hooks/cart/get-all-user-cart-hook';
const NavBarLogin = () => {
    const navigate = useNavigate()
    const [OnChangeSearch] = NavbarSearchHook()
    const word = localStorage.getItem("searchWord") || ""

    const [user, setUser] = useState(null);
    useEffect(() => {
        try {
            const stored = localStorage.getItem("user")
            if (stored) setUser(JSON.parse(stored))
        } catch (e) {
            setUser(null)
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }

    const [itemsNum] = GetAllUserCartHook()

    return (
        <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className='logo' alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <FormControl
                        value={word}
                        onChange={OnChangeSearch}
                        type="search"
                        placeholder="ابحث..."
                        className="me-2 w-100 text-center"
                        aria-label="Search"
                    />
                    <Nav className="me-auto">
                        {
                            user ? (
                                <NavDropdown title={user.name} id="basic-nav-dropdown">
                                    {
                                        user.role === "admin" ? (<NavDropdown.Item as={Link} to="/admin/allproducts">لوحة التحكم</NavDropdown.Item>) : (<NavDropdown.Item as={Link} to="/user/profile">الصفحه الشخصية</NavDropdown.Item>)
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logOut}>تسجيل خروج</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                (<Nav.Link as={Link} to='/login'
                                    className="nav-text d-flex mt-3 justify-content-center">
                                    <img src={login} className="login-img" alt="login" />
                                    <p style={{ color: "white" }}>دخول</p>
                                </Nav.Link>)
                        }

                        <Nav.Link as={Link} to='/cart'
                            className="nav-text position-relative d-flex mt-3 justify-content-center"
                            style={{ color: "white" }}>
                            <img src={cart} className="login-img" alt="cart" />
                            <p style={{ color: "white" }}>العربه</p>
                            <span className="position-absolute top-10 start-0 translate-middle badge rounded-pill bg-danger">
                                {itemsNum || 0}
                            </span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarLogin
