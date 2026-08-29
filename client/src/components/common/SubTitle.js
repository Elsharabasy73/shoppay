import React from 'react'
import { Link } from 'react-router-dom'

const SubTitle = ({ title, btntitle, pathText }) => {
    return (
        <div className="flex justify-between items-center pt-6 pb-2">
            <div className="text-[#1A3F60] font-extrabold text-xl tracking-tighter">{title}</div>
            {btntitle ? (
                <Link to={`${pathText}`} style={{ textDecoration: 'none' }}>
                    <div className="border border-[#1A3F60] text-[#1A3F60] px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#1A3F60] hover:text-white transition">{btntitle}</div>
                </Link>
            ) : null}
        </div>
    )
}

export default SubTitle
