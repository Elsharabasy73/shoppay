import React, { useState, useRef, useEffect } from 'react'
import sort from '../../assets/images/sort.png'

const SearchCountResult = ({ title, onClick }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const clickMe = (key) => {
        localStorage.setItem("sortType", key);
        onClick();
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sortOptions = [
        { key: "", label: "بدون ترتيب" },
        { key: "الاكثر مبيعا", label: "الأكثر مبيعاً" },
        { key: "الاعلي تقييما", label: "الأعلى تقييماً" },
        { key: "السعر من الاقل للاعلي", label: "السعر: من الأقل للأعلى" },
        { key: "السعر من الاعلي للاقل", label: "السعر: من الأعلى للأقل" },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold px-3 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition"
            >
                <img width="16" height="16" src={sort} alt="" className="opacity-60" />
                ترتيب حسب
                <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                    {sortOptions.map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => clickMe(opt.key)}
                            className="w-full text-right px-4 py-2.5 text-sm text-gray-700 hover:bg-sigma-blue-light hover:text-sigma-blue-dark transition text-bold"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchCountResult
