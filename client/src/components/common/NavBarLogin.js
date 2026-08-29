import React, { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
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
        <div className="sticky top-0 z-40 shadow-sm">
            {/* Main header - Sigma light */}
            <div className="bg-[#F2F8FD] border-b border-[#DAEBF7]">
                <div className="max-w-[1400px] mx-auto px-5 lg:px-20 py-4 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
                        <img src={logo} alt="logo" className="h-14 w-auto object-contain" />
                        <span className="hidden md:block font-extrabold text-[#1A3F60] text-xl tracking-tighter">ShopPay</span>
                    </Link>

                    {/* Search - responsive */}
                    <form onSubmit={(e)=>{e.preventDefault(); navigate('/products');}} className="hidden md:flex flex-1 max-w-[60%] mx-4 lg:mx-8 min-w-0">
                        <div className="flex items-center w-full bg-[#F1F5F9] rounded-[12px] shadow-lg overflow-hidden border border-[#DAEBF7] min-w-0">
                            <span className="pl-4 pr-1 text-[#1A3F60] shrink-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
                                </svg>
                            </span>
                            <input
                                value={word}
                                onChange={OnChangeSearch}
                                type="search"
                                placeholder="Search for anything"
                                className="flex-1 min-w-0 bg-transparent px-3 py-2.5 lg:py-3 outline-none text-sm text-[#1A3F60] placeholder:text-gray-500"
                            />
                            <button type="submit" className="shrink-0 bg-[#3F96D2] hover:bg-[#206EA9] text-white px-4 lg:px-6 py-2.5 lg:py-3 font-medium transition-colors text-sm">
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Actions - ALWAYS visible sign-in / profile / control panel */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <Link to="/user/favoriteproducts" className="w-9 h-9 rounded-full bg-white border border-[#DAEBF7] hidden sm:flex items-center justify-center text-[#206EA9] hover:shadow-md no-underline">♡</Link>
                        <div className="hidden sm:block w-px h-6 bg-[#1A3F60]/20"></div>
                        {
                            user ? (
                                <>
                                    {/* Control Panel / Profile - same size pills */}
                                    {user.role === "admin" ? (
                                        <Link to="/admin/allproducts" className="hidden lg:flex items-center gap-1 bg-[#1A3F60] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-black no-underline leading-none">لوحة التحكم</Link>
                                    ) : (
                                        <Link to="/user/profile" className="hidden lg:flex items-center gap-1 bg-white border border-[#1A3F60] text-[#1A3F60] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#1A3F60] hover:text-white no-underline leading-none">حسابي</Link>
                                    )}
                                    <div className="relative flex items-center bg-[#1A3F60] rounded-full px-2.5 py-0.5 shadow-sm leading-none h-7">
                                        <NavDropdown title={user.name} id="basic-nav-dropdown" className="font-bold text-[11px] m-0 p-0 !text-white [&>a]:!text-white [&>a]:!text-[11px] [&>a]:!font-bold [&>a]:!leading-none [&>a]:!py-0 [&>a]:!my-0">
                                            {user.role === "admin" ? (<NavDropdown.Item as={Link} to="/admin/allproducts">لوحة التحكم</NavDropdown.Item>) : (<NavDropdown.Item as={Link} to="/user/profile">الصفحه الشخصية</NavDropdown.Item>)}
                                            <NavDropdown.Item as={Link} to={user.role === "admin" ? "/admin/allproducts" : "/user/profile"}>الملف الشخصي</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={logOut}>تسجيل خروج</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </>
                            ) : (
                                <Link to='/login' className="flex items-center gap-1.5 bg-white border-2 border-[#1A3F60] text-[#1A3F60] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#1A3F60] hover:text-white transition no-underline">
                                    <img src={login} className="w-5 h-5" alt="login" />
                                    تسجيل دخول
                                </Link>
                            )
                        }
                        <Link to='/cart' className="relative flex items-center gap-1.5 bg-[#3F96D2] text-white px-3 sm:px-4 py-2 rounded-full font-bold text-sm hover:bg-[#206EA9] no-underline">
                            <img src={cart} className="w-5 h-5 brightness-0 invert" alt="cart" />
                            <span className="hidden sm:inline">العربه</span>
                            <span className="absolute -top-2 -right-2 bg-[#34C759] text-white w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center border-2 border-white">
                                {itemsNum || 0}
                            </span>
                        </Link>

                    </div>
                </div>
                {/* Mobile search - shown under md */}
                <form onSubmit={(e)=>{e.preventDefault(); navigate('/products');}} className="md:hidden px-5 pb-3">
                    <div className="flex items-center w-full bg-[#F1F5F9] rounded-[12px] shadow overflow-hidden border border-[#DAEBF7] min-w-0">
                        <span className="pl-3 pr-1 text-[#1A3F60] shrink-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" />
                            </svg>
                        </span>
                        <input
                            value={word}
                            onChange={OnChangeSearch}
                            placeholder="ابحث عن أي شيء..."
                            className="flex-1 min-w-0 bg-transparent px-3 py-2.5 outline-none text-sm text-[#1A3F60]"
                        />
                        <button type="submit" className="shrink-0 bg-[#3F96D2] hover:bg-[#206EA9] text-white px-5 py-2.5 text-sm font-bold transition-colors">بحث</button>
                    </div>
                </form>
            </div>

            {/* Category strip - ShopPay categories (was Sigma PC names - fixed) */}
            <div className="bg-[#1A3F60] text-white">
                <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-2.5 flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    <Link to="/allcategory" className="shrink-0 bg-white text-[#1A3F60] px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-lg hover:scale-[1.02] transition no-underline">
                        <span>☰</span> All Categories
                    </Link>
                    <div className="flex items-center gap-4 lg:gap-5 text-sm font-bold tracking-tight whitespace-nowrap">
                        <Link to="/products" className="hover:text-white/70 text-white no-underline">All Products</Link>
                        <Link to="/allcategory" className="hover:text-white/70 text-white no-underline">Categories</Link>
                        <Link to="/allbrand" className="hover:text-white/70 text-white no-underline">Brands</Link>
                        <Link to="/cart" className="hover:text-white/70 text-white no-underline">Cart</Link>
                        <Link to="/user/favoriteproducts" className="hover:text-white/70 text-white hidden md:inline no-underline">Wishlist</Link>
                    </div>
                    <Link to="/products" className="ml-auto hidden lg:flex shrink-0 bg-[#3F96D2] hover:bg-[#206EA9] text-white px-4 py-1.5 rounded-full text-xs font-bold transition no-underline">
                        Offers 30% OFF
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBarLogin
