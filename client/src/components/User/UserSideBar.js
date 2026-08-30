import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const UserSideBar = () => {
    const location = useLocation()

    const navItems = [
        { path: "/user/allorders", label: "إدارة الطلبات" },
        { path: "/user/favoriteproducts", label: "المنتجات المفضلة" },
        { path: "/user/addresses", label: "العناوين الشخصية" },
        { path: "/user/profile", label: "الملف الشخصي" },
    ]

    return (
        <div className="bg-white rounded-2xl border border-[#DAEBF7] p-3 shadow-sm">
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
                {navItems.map((item, idx) => {
                    const isActive = location.pathname === item.path
                    return (
                        <Link 
                            key={idx} 
                            to={item.path} 
                            className="no-underline shrink-0"
                        >
                            <div className={`px-4 py-2.5 rounded-xl text-xs lg:text-sm font-bold text-center transition-all duration-200 ${
                                isActive 
                                    ? "bg-[#3F96D2] text-white shadow-sm" 
                                    : "text-[#1A3F60] hover:bg-[#F2F8FD] hover:text-[#206EA9]"
                            }`}>
                                {item.label}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default UserSideBar

