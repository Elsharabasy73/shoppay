import React from 'react'
const Footer = () => {
    return (
        <div className="mt-10 px-5 lg:px-10 pb-6">
            <div className="w-[95%] mx-auto bg-[#393F55] rounded-3xl overflow-hidden relative p-6 md:p-10 text-white">
                <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 w-full md:w-3/4 mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="flex flex-col gap-2 items-center lg:items-start">
                            <div className="font-extrabold text-xl tracking-tighter">MAX TECH</div>
                            <a href="https://maps.app.goo.gl/LKn1is733eKxzMfSA" target="_blank" rel="noreferrer" className="text-white/70 text-sm hover:text-white no-underline">25 Esraa Al Moalmeen st, Lebnan Sq Giza, Egypt</a>
                            <a href="tel:01553029842" className="text-white/70 text-sm hover:text-white no-underline">01553029842</a>
                            <a href="mailto:maxtech@gmail.com" className="text-white/70 text-sm hover:text-white no-underline">maxtech@gmail.com</a>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 justify-center">
                            <div className="min-w-[150px] text-center lg:text-left">
                                <div className="font-bold mb-3">Help & Support</div>
                                <div className="flex flex-col gap-2 text-sm text-white/70">
                                    <span className="hover:text-white cursor-pointer">Contact Us</span>
                                    <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                                    <span className="hover:text-white cursor-pointer">Return Policy</span>
                                    <span className="hover:text-white cursor-pointer">Warranty Policy</span>
                                </div>
                            </div>
                            <div className="min-w-[150px] text-center lg:text-left">
                                <div className="font-bold mb-3">My Account</div>
                                <div className="flex flex-col gap-2 text-sm text-white/70">
                                    <span className="hover:text-white cursor-pointer">My Profile</span>
                                    <span className="hover:text-white cursor-pointer">Addresses</span>
                                    <span className="hover:text-white cursor-pointer">Orders History</span>
                                    <span className="hover:text-white cursor-pointer">Voucher Store</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-white/10 gap-4">
                        <div className="flex items-center gap-3">
                            <span aria-label="Facebook disabled" title="Facebook link disabled" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-40 cursor-not-allowed pointer-events-none select-none text-white/60">f</span>
                            <a href="https://wa.me/201553029842" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="Chat on WhatsApp 01553029842" className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#128C7E] transition no-underline text-white">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" aria-hidden="true"><path d="M19.05 4.91A9.816 9.816 0 0012.04 2C6.58 2 2.14 6.44 2.14 10.9c0 1.57.41 3.1 1.19 4.44L2 22l6.84-1.79a9.78 9.78 0 004.2 1.02h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7.42zm-7.01 13.63h-.01a8.03 8.03 0 01-4.08-1.12l-.29-.17-4.06 1.06 1.08-3.96-.19-.31a8.18 8.18 0 01-1.26-4.34c0-4.48 3.64-8.12 8.12-8.12 2.17 0 4.21.85 5.74 2.38a8.06 8.06 0 012.38 5.74c0 4.48-3.64 8.12-8.12 8.12zm4.45-5.97c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.11-.22-.18-.46-.3z"/></svg>
                            </a>
                            <span aria-label="YouTube disabled" title="YouTube link disabled" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-40 cursor-not-allowed pointer-events-none select-none text-white/60">▶</span>
                            <a href="tel:01553029842" className="text-white/60 text-sm ml-2 hover:text-white no-underline">01553029842</a>
                        </div>
                        <div className="text-white/60 text-xs text-center">© 2025 MAX TECH. All rights reserved.</div>
                        <a href="#header" className="text-white/80 text-xs flex flex-col items-center hover:text-white no-underline">
                            <span>↑</span> Scroll to top
                        </a>
                    </div>
                    {/* Created by - programmer advertising */}
                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                        <p className="text-white/80 text-xs md:text-sm">
                            Crafted with <span className="text-[#3F96D2]">♥</span> by <a href="https://github.com/Elsharabasy73" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#3F96D2] underline decoration-[#3F96D2]/50 underline-offset-4">Elsharabasy73</a> — Full-Stack Developer | <a href="https://wa.me/201553029842" target="_blank" rel="noreferrer" className="text-[#34C759] hover:text-white no-underline">WhatsApp 01553029842 →</a> | <a href="mailto:abdo.elsharabasy73@gmail.com" className="text-white/70 hover:text-white no-underline">abdo.elsharabasy73@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
