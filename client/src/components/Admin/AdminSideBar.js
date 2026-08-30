import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminSideBar = () => {
    const [user, setUser] = useState(null)
    const location = useLocation()

    useEffect(() => {
        try {
            const stored = localStorage.getItem("user")
            if (stored) setUser(JSON.parse(stored))
        } catch (e) {
            setUser(null)
        }
    }, [])

    const navItems = [
        { path: "/admin/allorders", label: "إدارة الطلبات" },
        { path: "/admin/allproducts", label: "إدارة المنتجات" },
        { path: "/admin/addbrand", label: "أضف ماركة" },
        { path: "/admin/addcategory", label: "أضف تصنيف" },
        { path: "/admin/addsubcategory", label: "أضف تصنيف فرعي" },
        { path: "/admin/addproduct", label: "أضف منتج" },
        { path: "/admin/addcoupon", label: "أضف كوبون" },
    ]

    const adminOnlyItems = [
        { path: "/admin/allusers", label: "إدارة المستخدمين" },
        { path: "/admin/adduser", label: "أضف مستخدم" },
    ]

    const allItems = user && user.role === "admin" 
        ? [...navItems, ...adminOnlyItems] 
        : navItems

    return (
        <div className="bg-white rounded-2xl border border-[#DAEBF7] p-3 shadow-sm">
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">
                {allItems.map((item, idx) => {
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

export default AdminSideBar

